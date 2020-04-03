import "whatwg-fetch";

import React, { useState } from "react";

import Autocomplete from "./components/Autocomplete";
import { Config } from "@baltimorecounty/javascript-utilities";
import Schedule from "./components/Schedule";
import { useQuery } from "react-query";

const { setConfig, getValue } = Config;

const addressLookupEndpoint = "api/gis/addressLookup";
const collectionScheduleEndpoint = "api/hub/collectionSchedule";

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

setConfig(configValues);

const fetchAddresses = (addressQuery) =>
  fetch(`${getValue("addressLookupEndpoint")}/${addressQuery}`).then((res) =>
    res.json()
  );

const fetchSchedule = (key, address) =>
  fetch(`${getValue("apiRoot")}/${address}`).then((res) => res.json());

function App() {
  const [address, setAddress] = useState(null);
  const { data, error, isFetching } = useQuery(
    address && ["getSchedule", address],
    fetchSchedule
  );
  const suggest = async (query, populateResults) => {
    const addresses = await fetchAddresses(query);
    populateResults(addresses);
  };

  const handleValueSelect = (selectedValue) => {
    if (selectedValue) {
      setAddress(selectedValue.StreetAddress);
    }
  };

  return (
    <div className="App">
      {!data && (
        <Autocomplete
          id="address-lookup"
          label="Find Your Collection Schedule"
          suggest={suggest}
          onConfirm={handleValueSelect}
          minLength={3}
        />
      )}
      {address && isFetching && <p>Loading Schedule...</p>}
      {!isFetching && data && (
        <div className="results">
          <p>Selected Address: {address}</p>
          <Schedule selectedAddress={address} schedule={data[0]} />
        </div>
      )}
    </div>
  );
}

export default App;
