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
  const [suggestion, setSuggestion] = useState("");
  const { data: addressCandidates, error, isFetching } = useQuery(
    suggestion && [
      "getAddress",
      {
        endpoint: getValue("findAddressCandidates"),
        queryString: `?address=${suggestion}`,
      },
    ],
    Fetch,
    {
      refetchAllOnWindowFocus: false,
    }
  );

  const { candidates = [] } = addressCandidates || {};
  const hasAddressCandidates = candidates.length > 0;

  const {
    data: schedule,
    status: scheduleStatus,
    isFetching: isScheduleFetching,
  } = useQuery(
    suggestion &&
      hasAddressCandidates && [
        "getSchedule",
        {
          endpoint: getValue("collectionSchedule"),
          path: `${candidates[0].attributes.placeName}`,
        },
      ],
    Fetch,
    {
      refetchAllOnWindowFocus: false,
    }
  );

  const resetForm = () => {
    setSuggestion("");
  };

  const suggest = async (query, populateResults) => {
    const { suggestions = [] } = await Fetch("address", {
      endpoint: getValue("suggest"),
      queryString: `?partialAddress=${query}`,
    });
    populateResults(suggestions.map(({ text }) => text));
  };

  const handleValueSelect = (selectedValue) => {
    setSuggestion(selectedValue);
  };

  if (error) {
    return (
      <p>Something went wrong. Please try again in a couple of minutes.</p>
    );
  }

  return (
    <div className="App">
      <Router>
        {!hasAddressCandidates && (
          <Autocomplete
            id="address-lookup"
            label="Find Your Collection Schedule"
            suggest={suggest}
            onConfirm={handleValueSelect}
            minLength={3}
          />
        )}
        {hasAddressCandidates && isScheduleFetching && (
          <p>Loading Schedule...</p>
        )}
        {hasAddressCandidates && !isScheduleFetching && schedule && (
          <div className="results">
            <h3>Your Schedule</h3>
            <p>Showing collection schedule for:</p>
            <p className="font-weight-bold">{FormatAddress(suggestion)}</p>
            <p>
              Not the right address?{" "}
              <Link to="/" onClick={resetForm}>
                Try another search
              </Link>
              .
            </p>
            <Schedule selectedAddress={suggestion} schedule={schedule} />
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
