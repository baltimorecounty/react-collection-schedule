import Autocomplete from "./components/Autocomplete";
import React from "react";

function App() {
  const suggest = (query, populateResults) => {
    const results = ["France", "Germany", "United Kingdom"];
    const filteredResults = results.filter(
      result => result.indexOf(query) !== -1
    );
    populateResults(["400 Washington Ave"]);
  };

  return (
    <div className="App">
      <Autocomplete
        id="address-lookup"
        label="Find Your Collection Schedule"
        suggest={suggest}
      />
    </div>
  );
}

export default App;
