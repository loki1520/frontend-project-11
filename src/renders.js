const renderReport = (watchedState, elements, value, i18nextInstance) => {
  const text = i18nextInstance.t(watchedState.errorOrSuccessReport);
  switch (value) {
    case 'sending':
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.feedback.textContent = text;
      elements.urlInput.classList.remove('is-invalid');
      elements.submitButton.disabled = true;
      break;
    case 'sucсess':
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.feedback.textContent = text;
      elements.urlInput.classList.remove('is-invalid');
      elements.submitButton.disabled = false;
      elements.form.reset();
      elements.urlInput.focus();
      break;
    default:
      elements.feedback.classList.add('text-danger');
      elements.feedback.classList.remove('text-success');
      elements.feedback.textContent = text;
      elements.urlInput.classList.add('is-invalid');
      elements.submitButton.disabled = false;
      break;
  }
};

const renderPosts = (watchedState, elements) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card', 'border-0');

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Посты';

  cardBodyDiv.append(cardTitle);

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');
  cardDiv.append(cardBodyDiv, listGroup);

  elements.postsContainer.textContent = '';
  elements.postsContainer.append(cardDiv);

  watchedState.posts.forEach((post) => {
    const {
      postTitle, postLink, postDescription, feedId, postId,
    } = post;

    const listPost = document.createElement('li');
    listPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const anchor = document.createElement('a');
    anchor.setAttribute('href', postLink);
    if (watchedState.readedPosts.includes(postId)) {
      anchor.classList.add('fw-normal', 'link-secondary');
    } else {
      anchor.classList.add('fw-bold');
    }
    anchor.dataset.feedId = feedId;
    anchor.dataset.postId = postId;
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('rel', 'noopener noreferrer');
    anchor.textContent = postTitle;

    const buttonEn = document.createElement('button');
    buttonEn.setAttribute('type', 'button');
    buttonEn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    buttonEn.dataset.feedId = feedId;
    buttonEn.dataset.postId = postId;
    buttonEn.dataset.bsToggle = 'modal';
    buttonEn.dataset.bsTarget = '#modal';
    buttonEn.textContent = 'Просмотр';

    listPost.append(anchor, buttonEn);
    listGroup.append(listPost);

    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      watchedState.readedPosts = [...watchedState.readedPosts, postId];

      window.open(anchor.href, postLink);
    });

    buttonEn.addEventListener('click', (e) => {
      e.preventDefault();

      elements.modaiTitle.textContent = postTitle;
      elements.modalBody.textContent = postDescription;

      watchedState.readedPosts = [...watchedState.readedPosts, postId];

      elements.modalHref.href = postLink;
    });
  });
};

const renderFeeds = (watchedState, elements) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card', 'border-0');

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Фиды';

  cardBodyDiv.append(cardTitle);

  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');

  cardDiv.append(cardBodyDiv, listGroup);

  elements.feedsContainer.textContent = '';
  elements.feedsContainer.append(cardDiv);

  watchedState.feeds.forEach((feed) => {
    const { feedDescription, feedTitle, feedId } = feed;

    const listFeed = document.createElement('li');
    listFeed.classList.add('list-group-item', 'border-0', 'border-end-0');

    const listName = document.createElement('h3');
    listName.classList.add('h6', 'm-0');
    listName.setAttribute('data-id', feedId);
    listName.textContent = feedTitle;

    const listDescription = document.createElement('p');
    listDescription.classList.add('m-0', 'small', 'text-black-50');
    listDescription.textContent = feedDescription;

    listFeed.append(listName, listDescription);
    listGroup.append(listFeed);
  });
};

export { renderReport, renderPosts, renderFeeds };
