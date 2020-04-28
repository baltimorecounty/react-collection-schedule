import { Config } from "@baltimorecounty/javascript-utilities";

const { setConfig } = Config;

const localHosts = {
  gis: "http://localhost:54727",
  collectionSchedule: "http://localhost:53001",
};
const testHost = "https://testservices.baltimorecountymd.gov";
const prodHost = "https://services.baltimorecountymd.gov";

// HACK - the Config utility does not account for beta.
// TODO: This will need to be addressed when we get closer to launch

const buildApiUrls = (hosts = {}, endpoint) => {
  const isBeta = window.location.hostname.indexOf("beta") > -1;
  return Object.keys(hosts).reduce((prev, currentKey) => {
    prev[currentKey] = isBeta
      ? `${hosts["test"]}/${endpoint}`
      : `${hosts[currentKey]}/${endpoint}`;
    return prev;
  }, {});
};

const urls = {
  collectionSchedule: buildApiUrls(
    {
      local: localHosts.collectionSchedule,
      development: localHosts.collectionSchedule,
      staging: testHost,
      production: prodHost,
    },
    "/api/hub/collectionSchedule/schedule"
  ),
  suggest: buildApiUrls(
    {
      local: localHosts.gis,
      development: localHosts.gis,
      staging: testHost,
      production: prodHost,
    },
    "api/hub/gis/Geocoder/suggest"
  ),
  findAddressCandidates: buildApiUrls(
    {
      local: localHosts.gis,
      development: localHosts.gis,
      staging: testHost,
      production: prodHost,
    },
    "api/hub/gis/Geocoder/findAddressCandidates"
  ),
};

//TODO: We need to merge urls for shared properties
const buildConfig = (urls = {}) =>
  Object.keys(urls).reduce(
    (prev, urlSetName) => {
      const urlSet = urls[urlSetName];
      Object.keys(urlSet).forEach((env) => {
        console.log(prev[env]);
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
