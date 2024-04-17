import axios from 'axios';
import _ from 'lodash';

import prepairPath from './prepairPath.js';
import parseRSS from './parseRSS.js';

const intervalCheck = (watchedState) => {
  const promises = watchedState.feeds.map(({ url, feedId }) => axios.get(prepairPath(url))
    .then((rss) => {
      const { posts } = parseRSS(rss);

      const newArrivedPosts = posts
        .filter(({ postTitle }) => !watchedState.posts
          .some((el) => el.postTitle === postTitle));

      const prepairedNewPosts = newArrivedPosts.map((newPost) => ({
        ...newPost,
        feedId,
        postId: _.uniqueId('post_'),
      }));

      return prepairedNewPosts;
    }));

  Promise.all(promises)
    .then((allNewPosts) => {
      const flattenedNewPosts = allNewPosts.flat();

      if (flattenedNewPosts.length) {
        watchedState.posts = [...flattenedNewPosts, ...watchedState.posts];
      }
    })
    .catch((error) => {
      watchedState.errorOrSuccessReport = error.message;
    })
    .finally(() => {
      setTimeout(() => intervalCheck(watchedState), 5000);
    });
};

export default intervalCheck;
