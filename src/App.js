import React, { useState } from "react";

import Autocomplete from "./components/Autocomplete";
import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "./common/Fetch";
import { Run } from "./Startup";
import Schedule from "./components/Schedule";
import { useQuery } from "react-query";

const { getValue } = Config;

// Run our Startup Code
Run();

function App() {
  const [address, setAddress] = useState(null);
  const { data, error, isFetching } = useQuery(
    address && [
      "getSchedule",
      { endpoint: getValue("apiRoot"), path: address },
    ],
    Fetch
  );

  const suggest = async (query, populateResults) => {
    const addresses = await Fetch("address", {
      endpoint: getValue("addressLookupEndpoint"),
      path: query,
    });
    populateResults(addresses);
  };

  const handleValueSelect = (selectedValue) => {
    if (selectedValue) {
      setAddress(selectedValue.StreetAddress);
    }
  };

  if (error) {
    return (
      <p>Something went wrong. Please try again in a couple of minutes.</p>
    );
  }

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
