import { Route, HashRouter as Router } from "react-router-dom";
import React from "react";

import { Run } from "./Startup";

import FindScheduleForm from "./components/FindScheduleForm";
import Schedule from "./components/Schedule";

// Run our Startup Code
Run();

function App() {
  return (
    <Router>
      <Route path={"/"} exact component={FindScheduleForm} />
      <Route path={"/:address"} exact component={Schedule} />
    </Router>
  );
}

export default App;
