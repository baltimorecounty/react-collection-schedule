import { Config } from "@baltimorecounty/javascript-utilities";

const { setConfig } = Config;

const localHost = "http://localhost:54727";
const testHost = "https://testservices.baltimorecountymd.gov";
const prodHost = "https://services.baltimorecountymd.gov";

/**
 * Build Api Urls based on hosts and a given endpoint.
 * Hosts are specified by environment
 */
const buildApiUrls = (endpoint) => {
  const hosts = {
    local: localHost,
    development: testHost,
    staging: testHost,
    production: prodHost,
  };
  const isBeta = window.location.hostname.indexOf("beta") > -1;
  return Object.keys(hosts).reduce((prev, currentKey) => {
    prev[currentKey] = isBeta
      ? `${hosts["staging"]}/${endpoint}`
      : `${hosts[currentKey]}/${endpoint}`;
    return prev;
  }, {});
};

const urls = {
  collectionSchedule: buildApiUrls("api/hub/collectionSchedule/schedule"),
  suggest: buildApiUrls("api/hub/gisProxy/Geocoder/suggest"),
  findAddressCandidates: buildApiUrls(
    "api/hub/gisProxy/Geocoder/findAddressCandidates"
  ),
};

/**
 * Convert Urls to Desired Format for Configs
 */
const buildConfig = (urls = {}) =>
  Object.keys(urls).reduce(
    (prev, urlSetName) => {
      const urlSet = urls[urlSetName];
      Object.keys(urlSet).forEach((env) => {
        prev[env][urlSetName] = urlSet[env];
      });
      return prev;
    },
    { local: {}, development: {}, staging: {}, production: {} }
  );

const configValues = buildConfig(urls);

/**
 * Runs startup code for our create react app
 */
const Run = () => {
  setConfig(configValues);
};

export { Run };
