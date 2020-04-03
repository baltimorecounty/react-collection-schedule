import "whatwg-fetch";

import React, { useState } from "react";

import Autocomplete from "./components/Autocomplete";
import { Config } from "@baltimorecounty/javascript-utilities";
import Schedule from "./components/Schedule";
import { useQuery } from "react-query";

const { setConfig, getValue } = Config;

const testApiRoot =
  "https://testservices.baltimorecountymd.gov/api/hub/collectionSchedule";
const prodApiRoot =
  "https://services.baltimorecountymd.gov/api/hub/collectionSchedule";

// HACK - the Config utility does not account for beta.
// TODO: This will need to be addressed when we get closer to launch
const localApiRoot =
  window.location.hostname.indexOf("beta") > -1
    ? testApiRoot
    : "http://localhost:53001/api/Schedule";

const configValues = {
  local: {
    apiRoot: localApiRoot,
    addressLookupEndpoint: "http://localhost:54727/api/gis/addresslookup",
  },
  development: {
    apiRoot: testApiRoot,
    addressLookupEndpoint: "",
  },
  staging: {
    apiRoot: testApiRoot,
    addressLookupEndpoint: "",
  },
  production: {
    apiRoot: prodApiRoot,
    addressLookupEndpoint: "",
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
  const { status, data, error, isFetching } = useQuery(
    address && ["getSchedule", address],
    fetchSchedule
  );
  const suggest = async (query, populateResults) => {
    const addresses = await fetchAddresses(query);
    populateResults(addresses);
  };

  const handleValueSelect = (selectedValue) => {
    setAddress(selectedValue.StreetAddress);
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
