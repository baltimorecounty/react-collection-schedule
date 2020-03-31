import "whatwg-fetch";

import React, { useState } from "react";

import Autocomplete from "./components/Autocomplete";
import { Config } from "@baltimorecounty/javascript-utilities";
import Schedule from "./components/Schedule";

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
    apiRoot: localApiRoot
  },
  development: {
    apiRoot: testApiRoot
  },
  staging: {
    apiRoot: testApiRoot
  },
  production: {
    apiRoot: prodApiRoot
  }
};

setConfig(configValues);

const fetchAddresses = addressQuery =>
  fetch(`${getValue("apiRoot")}/${addressQuery}`).then(res => res.json());

function App() {
  const [schedule, setSchedule] = useState({});
  const [results, setResults] = useState([]);
  const suggest = async (query, populateResults) => {
    const addresses = await fetchAddresses(query);
    setResults(addresses);
    const filteredResults = addresses.map(result => result.address);
    populateResults(filteredResults);
  };

  const handleValueSelect = selectedValue => {
    if (selectedValue) {
      setSchedule(results.find(result => result.address === selectedValue));
    }
  };

  return (
    <div className="App">
      <Autocomplete
        id="address-lookup"
        label="Find Your Collection Schedule"
        suggest={suggest}
        onConfirm={handleValueSelect}
        minLength={3}
      />
      {Object.keys(schedule).length > 0 && (
        <div className="results">
          <p>Selected Address: {schedule.address}</p>
          <Schedule schedule={schedule} />
        </div>
      )}
    </div>
  );
}

export default App;
