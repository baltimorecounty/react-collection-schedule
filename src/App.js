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
import { Button } from "@baltimorecounty/dotgov-components";

const { getValue } = Config;

// Run our Startup Code
Run();

function App() {
  const [{ suggestion, status: suggestionStatus }, setSuggestion] = useState(
    ""
  );
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

  const getSuggestions = async (query) => {
    const { suggestions = [] } = await Fetch("address", {
      endpoint: getValue("suggest"),
      queryString: `?partialAddress=${query}`,
    });
    return suggestions.map(({ text }) => text);
  };

  const suggest = async (query, populateResults) => {
    setSuggestions({});
    try {
      const suggestions = await getSuggestions(query);
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

    const suggestions = await getSuggestions(addressQuery);

    if (suggestions && suggestions.length > 1) {
      setSuggestions({
        suggestions,
        status: "success",
      });
    } else {
      setSuggestions({
        suggestions,
        status: "error",
      });
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setSuggestion({
      suggestion: suggestionText,
      status: "success",
    });
    setSuggestions({});
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
        {!hasAddressCandidates && (
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
              <Button
                className="dg_button-link"
                key={magicKey}
                onClick={() =>
                  console.log("here") || handleSuggestionClick(text)
                }
                text={text}
              />
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
