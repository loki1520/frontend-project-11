import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import render from './render.js';
import textResourses from './textResourses.js';

const app = () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init(textResourses);
  // M(state)
  const state = {
    errorOrSuccessReport: '',
    urls: [],
  };

  const elements = {
    form: document.querySelector('#rss-form'),
    feedback: document.querySelector('#feedback'),
    urlInput: document.querySelector('#url-input'),
  };

  // V(render on-change)
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'errorOrSuccessReport':
        render(watchedState, elements, value, i18nextInstance);
        break;
      default:
        break;
    }
  });

  // Controller (события ---> state);
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const inputValueUrl = data.get('url');

    const schema = yup.object().shape({
      inputValueUrl: yup
        .string()
        .trim()
        .required()
        .url('notValidError')
        .notOneOf(watchedState.urls, 'alreadyExistsError'),
    });

    schema
      .validate({ inputValueUrl })
      .then((value) => {
        // if here will be 'push' -> onClick will not see changes...
        watchedState.urls = [...watchedState.urls, value.inputValueUrl];
        watchedState.errorOrSuccessReport = 'sucсess';
      })
      .catch((err) => {
        watchedState.errorOrSuccessReport = err.message;
      });
  });
};

export default app;
