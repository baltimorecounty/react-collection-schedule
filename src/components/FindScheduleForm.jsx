import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";

import Autocomplete from "./Autocomplete";
import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "../common/Fetch";
import { GetSuggestions } from "../common/Suggestions";
import Suggestions from "./Suggestions";
import { useQuery } from "react-query";

const { getValue } = Config;

const FindScheduleForm = () => {
  const { suggestion: urlSuggestion = "" } = useParams();
  const [{ suggestion, status: suggestionStatus }, setSuggestion] = useState({
    suggestion: urlSuggestion,
  });

  const [{ suggestions, status: suggestionsStatus }, setSuggestions] = useState(
    {
      suggestions: [],
    }
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
  console.log(suggestion);
  const { candidates = [] } = addressCandidates || {};
  const hasAddressCandidates = candidates.length > 0;

  /**
   * Populate AutoComplete Results
   * @param {string} query
   * @param {function} populateResults
   */
  const handleSuggestLookup = async (query, populateResults) => {
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

  const handleAutocompleteSelection = (selectedValue) => {
    setSuggestion({
      suggestion: selectedValue,
      status: "success",
    });
    setSuggestions({});
  };

  /** Get Address Lookup Input Value */
  const getInputValue = () => document.getElementById("address-lookup").value;

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    const addressQuery = getInputValue();

    if (addressQuery) {
      const suggestions = await GetSuggestions(addressQuery);

      setSuggestions({
        suggestions,
        status: suggestions && suggestions.length > 0 ? "success" : "error",
      });
    }
  };

  /**
   * Redirect when the form encounters an error to schedule
   * This ensures a consistent experience
   * @param {number} errorCode http status code that describes the problem
   */
  const redirectOnError = (errorCode) => (
    <Redirect to={`/schedule/${getInputValue()}?error=${errorCode}`} />
  );

  if ([status, suggestionStatus].some((x) => x === "error")) {
    return redirectOnError(500);
  }

  if (suggestionsStatus === "error") {
    return redirectOnError(404);
  }

  if (hasAddressCandidates) {
    /** We are using placename here, because the api that return only accepts a partial address. */

    const address = candidates[0].attributes.placeName;
    const zipcode = candidates[0].attributes.match_Addr.split(",")[3].trim();

    console.log(address);
    console.log(zipcode);

    return <Redirect to={`/schedule/${address}, ${zipcode}`} />;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="address-lookup"
          label="Find Your Collection Schedule"
          suggest={handleSuggestLookup}
          onConfirm={handleAutocompleteSelection}
          minLength={3}
        />
      </form>
      {suggestions && suggestions.length > 0 && (
        <Suggestions suggestions={suggestions} />
      )}
    </div>
  );
};

export default FindScheduleForm;
