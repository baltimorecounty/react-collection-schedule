import { Redirect, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "react-query";

import Autocomplete from "./Autocomplete";
import Fetch from "../common/Fetch";
import InActiveRouteAlert from "./InActiveRouteAlert";
import SomethingWentWrongAlert from "./SomethingWentWrongAlert";
import { GetSuggestions } from "../common/Suggestions";
import Suggestions from "./Suggestions";
import { Config } from "@baltimorecounty/javascript-utilities";
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

  const { candidates = [] } = addressCandidates || {};
  const hasAddressCandidates = candidates.length > 0;

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

    if (addressQuery) {
      const suggestions = await GetSuggestions(addressQuery);

      setSuggestions({
        suggestions,
        status: suggestions && suggestions.length > 0 ? "success" : "error",
      });
    }
  };

  if ([status, suggestionStatus].some((x) => x === "error")) {
    return <SomethingWentWrongAlert />;
  }

  if (suggestionsStatus === "error") {
    return <InActiveRouteAlert />;
  }

  if (hasAddressCandidates) {
    return <Redirect to={`/schedule/${candidates[0].attributes.placeName}`} />;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="address-lookup"
          label="Find Your Collection Schedule"
          suggest={suggest}
          onConfirm={handleValueSelect}
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
