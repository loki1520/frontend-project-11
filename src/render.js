const render = (watchedState, elements, value, i18nextInstance) => {
  const text = i18nextInstance.t(watchedState.errorOrSuccessReport);
  switch (value) {
    case false:
      elements.feedback.classList.add('text-danger');
      elements.feedback.classList.remove('text-success');
      elements.feedback.textContent = text;
      elements.urlInput.classList.add('is-invalid');
      break;
    default:
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.feedback.textContent = text;
      elements.urlInput.classList.remove('is-invalid');
      elements.form.reset();
      elements.urlInput.focus();
      break;
  }
};

export default render;
