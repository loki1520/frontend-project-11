import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import _ from 'lodash';

import prepairPath from './prepairPath.js';
import parseRSS from './parseRSS.js';
import { renderReport, renderPosts, renderFeeds } from './renders.js';
import textResourses from './textResourses.js';

const app = () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init(textResourses);
  // M(state)
  const state = {
    errorOrSuccessReport: '',
    urls: [],
    feeds: [],
    posts: [],
    readedPosts: [],
  };

  const elements = {
    form: document.querySelector('#rss-form'),
    feedback: document.querySelector('#feedback'),
    urlInput: document.querySelector('#url-input'),
    sendButton: document.querySelector('#sendButton'),
    feedsContainer: document.querySelector('.feeds'),
    postsContainer: document.querySelector('.posts'),
  };

  // V(render on-change)
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'errorOrSuccessReport':
        renderReport(watchedState, elements, value, i18nextInstance);
        break;
      case 'feeds':
        renderFeeds(watchedState, elements);
        break;
      case 'posts':
      case 'readedPosts':
        renderPosts(watchedState, elements);
        break;
      default:
        break;
    }
  });

  // Controller (события --> state);
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const inputValueUrl = data.get('url');

    const schema = yup.object().shape({
      inputValueUrl: yup
        .string()
        .required()
        .url('notValidError')
        .notOneOf(watchedState.urls, 'alreadyExistsError'),
    });

    schema
      .validate({ inputValueUrl })
      .then((value) => {
        // if here will be 'push' -> onClick will not see changes...
        watchedState.urls = [...watchedState.urls, value.inputValueUrl];
        watchedState.errorOrSuccessReport = 'sending';
      })
      .then(() => axios.get(prepairPath(inputValueUrl)))
      .then((rss) => {
        const { feedTitle, feedDescription, posts } = parseRSS(rss);
        const feedId = _.uniqueId('feed_');

        const newFeed = {
          feedTitle,
          feedDescription,
          feedId,
        };
        watchedState.feeds = [newFeed, ...watchedState.feeds];

        const newPosts = posts.map(({ postTitle, postDescription, postLink }) => ({
          postTitle,
          postDescription,
          postLink,
          feedId,
          postId: _.uniqueId('post_'),
        }));
        watchedState.posts = [...newPosts, ...watchedState.posts];
        watchedState.errorOrSuccessReport = 'sucсess';
      })
      .catch((err) => {
        watchedState.errorOrSuccessReport = err.message;
        if (err.message === '[object HTMLUnknownElement]') {
          watchedState.errorOrSuccessReport = 'notValidRSS';
        }
        if (err.message === 'Network Error') {
          watchedState.errorOrSuccessReport = 'networkError';
        }
      });
  });
};

export default app;
