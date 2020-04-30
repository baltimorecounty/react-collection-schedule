import { Alert } from "@baltimorecounty/dotgov-components";
import React from "react";

const SomethingWentWrongAlert = () => (
  <Alert
    className="status"
    type="warning"
    icon="far fa-exclamation-triangle"
    status="Invalid Address"
  >
    <p>Something went wrong. Please try again in a couple of minutes.</p>
  </Alert>
);

export default SomethingWentWrongAlert;
