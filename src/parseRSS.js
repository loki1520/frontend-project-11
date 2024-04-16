const parseRSS = (rss) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
  const parser = new DOMParser();
  const xmlString = rss.data.contents;
  const documentFromXML = parser.parseFromString(xmlString, 'application/xml');

  const errorNode = documentFromXML.querySelector('parsererror');

  if (errorNode) {
    throw new Error(errorNode);
  }

  const feedTitle = documentFromXML.querySelector('title').textContent;
  const feedDescription = documentFromXML.querySelector('description').textContent;

  const posts = Array.from(documentFromXML.querySelectorAll('item')).map((post) => ({
    postTitle: post.querySelector('title').textContent,
    postDescription: post.querySelector('description').textContent,
    postLink: post.querySelector('link').textContent,
  }));

  return { feedTitle, feedDescription, posts };
};

export default parseRSS;
