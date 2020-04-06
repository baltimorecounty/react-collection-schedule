import { Config } from "@baltimorecounty/javascript-utilities";

const { setConfig } = Config;

const addressLookupEndpoint = "api/gis/addressLookup";
const collectionScheduleEndpoint = "api/hub/collectionSchedule/schedule";

const testApiRoot = `https://testservices.baltimorecountymd.gov/${collectionScheduleEndpoint}`;
const prodApiRoot = `https://services.baltimorecountymd.gov/${collectionScheduleEndpoint}`;

// HACK - the Config utility does not account for beta.
// TODO: This will need to be addressed when we get closer to launch

const isBeta = window.location.hostname.indexOf("beta") > -1;
const localApiRoot = isBeta
  ? testApiRoot
  : "http://localhost:53001/api/Schedule";
const localAddressLookup = isBeta
  ? `https://testservices.baltimorecountymd.gov/${addressLookupEndpoint}`
  : `http://localhost:54727/${addressLookupEndpoint}`;

const configValues = {
  local: {
    apiRoot: localApiRoot,
    addressLookupEndpoint: localAddressLookup,
  },
  development: {
    apiRoot: testApiRoot,
    addressLookupEndpoint: localAddressLookup,
  },
  production: {
    apiRoot: prodApiRoot,
    addressLookupEndpoint: `https://services.baltimorecountymd.gov/${addressLookupEndpoint}`,
  },
};

/**
 * Runs startup code for our create react app
 */
const Run = () => {
  setConfig(configValues);
};

export { Run };
