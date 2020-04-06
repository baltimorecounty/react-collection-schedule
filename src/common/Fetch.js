import "whatwg-fetch";

/**
 *
 * @param {string} key unique key for the fetch request
 * @param {object} object
 * @param {object.endpoint} api endpoint
 * @param {object.path} path path for endpoint (path)
 */
const Fetch = (key, { endpoint, path }) =>
  fetch(`${endpoint}/${path}`).then((res) => res.json());

export default Fetch;
