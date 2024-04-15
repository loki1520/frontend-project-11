const addProxyServerDisableCache = () => 'https://allorigins.hexlet.app/get?disableCache=true&url=';
const prepairPath = (url) => `${addProxyServerDisableCache()}${url}`;

export default prepairPath;
