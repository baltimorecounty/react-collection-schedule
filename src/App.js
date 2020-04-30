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
  const [{ suggestion, status: suggestionStatus }, setSuggestion] = useState(
    ""
  );
  const { data: addressCandidates, status } = useQuery(
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
    isFetching: isScheduleFetching,
    status: scheduleStatus,
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
    setSuggestion({
      suggestion: "",
      status: "success",
    });
  };

  const suggest = async (query, populateResults) => {
    try {
      const { suggestions = [] } = await Fetch("address", {
        endpoint: getValue("suggest"),
        queryString: `?partialAddress=${query}`,
      });
      populateResults(suggestions.map(({ text }) => text));
    } catch (ex) {
      setSuggestion({
        suggestion: null,
        status: "error",
      });
    }
  };

  const handleValueSelect = (selectedValue) => {
    setSuggestion({
      suggestion: selectedValue,
      status: "success",
    });
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const formSuggestion = document.getElementById("address-lookup").value;
    setSuggestion({
      suggestion: formSuggestion,
      status: "success",
    });
  };

  if ([status, scheduleStatus, suggestionStatus].some((x) => x === "error")) {
    return (
      <p>Something went wrong. Please try again in a couple of minutes.</p>
    );
  }

  return (
    <div className="App">
      <Router>
        {!hasAddressCandidates && (
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id="address-lookup"
              label="Find Your Collection Schedule"
              suggest={suggest}
              onConfirm={handleValueSelect}
              minLength={3}
            />
          </form>
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
