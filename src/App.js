import { Link, HashRouter as Router } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "react-query";

import Autocomplete from "./components/Autocomplete";
import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "./common/Fetch";
import { FormatAddress } from "./common/Formatters";
import { Run } from "./Startup";
import Schedule from "./components/Schedule";
import InActiveRouteAlert from "./components/InActiveRouteAlert";
import SomethingWentWrongAlert from "./components/SomethingWentWrongAlert";
import { GetSuggestions } from "./common/Suggestions";
import queryString from "query-string";

const { getValue } = Config;

// Run our Startup Code
Run();

function App() {
  const { suggestion: urlSuggestion = "" } = queryString.parse(
    window.location.search
  );
  const [{ suggestion, status: suggestionStatus }, setSuggestion] = useState({
    suggestion: urlSuggestion,
  });
  const [{ suggestions, status: suggestionsStatus }, setSuggestions] = useState(
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
      refetchOnWindowFocus: false,
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
      refetchOnWindowFocus: false,
    }
  );

  const resetForm = () => {
    setSuggestion({
      suggestion: "",
      status: "success",
    });
  };

  const suggest = async (query, populateResults) => {
    setSuggestions({});
    try {
      const suggestions = await GetSuggestions(query);
      populateResults(suggestions);
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
    setSuggestions({});
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const addressQuery = document.getElementById("address-lookup").value;

    const suggestions = await GetSuggestions(addressQuery);

    setSuggestions({
      suggestions,
      status: suggestions && suggestions.length > 0 ? "success" : "error",
    });
  };

  if ([status, scheduleStatus, suggestionStatus].some((x) => x === "error")) {
    return <SomethingWentWrongAlert />;
  }

  if (suggestionsStatus === "error") {
    return <InActiveRouteAlert />;
  }

  //TODO: We need to handle a null schedule, and what happens if no schedule is resturned at all, guessing we need inactive alert.
  // Follow up wiht nick
  // also think autcomplete disables ability to hit enter which is good
  // ie polyfill?

  return (
    <div className="App">
      <Router>
        {!hasAddressCandidates && !urlSuggestion && (
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id="address-lookup"
              label="Find Your Collection Schedule"
              suggest={suggest}
              onConfirm={handleValueSelect}
              minLength={3}
            />
            <button type="submit">Submit</button>
          </form>
        )}
        {suggestions && suggestions.length > 0 && (
          <>
            <h3>Did you mean?</h3>
            {suggestions.map((text, magicKey) => (
              <a key={magicKey} href={`?suggestion=${text}`}>
                {text}
              </a>
            ))}
          </>
        )}
        {hasAddressCandidates && isScheduleFetching && (
          <p>Loading Schedule...</p>
        )}
        {hasAddressCandidates && !isScheduleFetching && schedule && (
          <div className="results">
            <h3>Your Schedule</h3>
            <p>Showing collection schedule for:</p>
            <p className="font-weight-bold">
              {FormatAddress(candidates[0].attributes.match_Addr)}
            </p>
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
