import { Link, HashRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "react-query";

import Autocomplete from "./components/Autocomplete";
import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "./common/Fetch";
import { FormatAddress } from "./common/Formatters";
import { Run } from "./Startup";
import Schedule from "./components/Schedule";

const { getValue } = Config;

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
    Fetch,
    {
      refetchAllOnWindowFocus: false,
    }
  );

  const resetForm = () => {
    setAddress({});
  };

  const suggest = async (query, populateResults) => {
    const { suggestions = [] } = await Fetch("address", {
      endpoint: getValue("suggestEndpoint"),
      queryString: `?partialAddress=${query}`,
    });
    populateResults(suggestions.map(({ text }) => text));
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
      <Router>
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
            <h3>Your Schedule</h3>
            <p>Showing collection schedule for:</p>
            <p className="font-weight-bold">{FormatAddress(address)}</p>
            <p>
              Not the right address?{" "}
              <Link to="/" onClick={resetForm}>
                Try another search
              </Link>
              .
            </p>
            <Schedule
              selectedAddress={address.StreetAddress}
              schedule={data[0]}
            />
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
