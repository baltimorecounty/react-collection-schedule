import React, { useState } from "react";
import { ReactQueryConfigProvider, useQuery } from "react-query";

import Autocomplete from "./components/Autocomplete";
import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "./common/Fetch";
import { FormatAddress } from "./common/Formatters";
import { Run } from "./Startup";
import Schedule from "./components/Schedule";

const { getValue } = Config;

const queryConfig = {
  refetchAllOnWindowFocus: false,
  //   refetchOnMount: true,
};

// Run our Startup Code
Run();

function App() {
  const [address, setAddress] = useState({});
  const hasAddress = Object.keys(address).length > 0;
  const { data, error, isFetching } = useQuery(
    hasAddress && [
      "getSchedule",
      {
        endpoint: getValue("apiRoot"),
        path: address.StreetAddress,
      },
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
    setAddress(selectedValue ? selectedValue : {});
  };

  if (error) {
    return (
      <p>Something went wrong. Please try again in a couple of minutes.</p>
    );
  }

  return (
    <div className="App">
      <ReactQueryConfigProvider config={queryConfig}>
        {!data && (
          <Autocomplete
            id="address-lookup"
            label="Find Your Collection Schedule"
            suggest={suggest}
            onConfirm={handleValueSelect}
            minLength={3}
          />
        )}
        {hasAddress && isFetching && <p>Loading Schedule...</p>}
        {hasAddress && !isFetching && data && (
          <div className="results">
            <p>
              <span className="font-weight-bold">Schedule for</span>:{" "}
              {FormatAddress(address)}
            </p>
            <Schedule
              selectedAddress={address.StreetAddress}
              schedule={data[0]}
            />
          </div>
        )}
      </ReactQueryConfigProvider>
    </div>
  );
}

export default App;
