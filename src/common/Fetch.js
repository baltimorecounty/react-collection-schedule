import "whatwg-fetch";

/**
 * Wrapper for https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @param {string} key unique key for the fetch request
 * @param {object} object
 * @param {object.endpoint} api endpoint
 * @param {object.path} path path for endpoint (path)
 * @param {object.queryString} queryString querystring for the url, must include ?
 */
const Fetch = (key, { endpoint, path, queryString }) =>
  fetch(
    `${endpoint}${path ? `/${path}` : ""}${queryString || ""}`
  ).then((res) => (res.status === 200 ? res.json() : { status: res.status }));

export default Fetch;
