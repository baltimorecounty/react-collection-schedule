import "./App.css";

import React from "react";
import { TextInput } from "@baltimorecounty/dotgov-components";

function App() {
  return (
    <div className="App">
      <TextInput id="address-lookup" label="Find Your Collection Schedule" />
    </div>
  );
}

export default App;
