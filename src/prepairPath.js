// proxy from hexlet https://github.com/Hexlet/hexlet-allorigins
const addProxyServerDisableCache = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
const prepairPath = (url) => `${addProxyServerDisableCache}${url}`;

export default prepairPath;
