// proxy from hexlet https://github.com/Hexlet/hexlet-allorigins
const addProxyServerDisableCache = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

const prepairPath = (url) => `${addProxyServerDisableCache}${encodeURIComponent(url)}`;
// https://allorigins.hexlet.app/get?disableCache=true&url=https%3A%2F%2Florem-rss.hexlet.app%2Ffeed%3Funit%3Dsecond%26interval%3D30
export default prepairPath;
