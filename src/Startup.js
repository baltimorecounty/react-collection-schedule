import { Config } from "@baltimorecounty/javascript-utilities";

const { setConfig } = Config;

const suggestEndpoint = "api/hub/gis/Geocoder/suggest";
const collectionScheduleEndpoint = "api/hub/collectionSchedule/schedule";

const testApiRoot = `https://testservices.baltimorecountymd.gov/${collectionScheduleEndpoint}`;
const prodApiRoot = `https://services.baltimorecountymd.gov/${collectionScheduleEndpoint}`;

// HACK - the Config utility does not account for beta.
// TODO: This will need to be addressed when we get closer to launch

const isBeta = window.location.hostname.indexOf("beta") > -1;
const localApiRoot = isBeta
  ? testApiRoot
  : "http://localhost:53001/api/Schedule";
const testAddressLookup = `https://testservices.baltimorecountymd.gov/${suggestEndpoint}`;
const localAddressLookup = isBeta
  ? testAddressLookup
  : `http://localhost:54727/${suggestEndpoint}`;

const configValues = {
  local: {
    apiRoot: localApiRoot,
    suggestEndpoint: localAddressLookup,
  },
  development: {
    apiRoot: testApiRoot,
    suggestEndpoint: localAddressLookup,
  },
  staging: {
    apiRoot: testApiRoot,
    suggestEndpoint: testAddressLookup,
  },
  production: {
    apiRoot: prodApiRoot,
    suggestEndpoint: `https://services.baltimorecountymd.gov/${suggestEndpoint}`,
  },
};

/**
 * Runs startup code for our create react app
 */
const Run = () => {
  setConfig(configValues);
};

export { Run };
