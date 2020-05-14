import { Alert } from "@baltimorecounty/dotgov-components";
import React from "react";

const CommercialAlert = () => (
  <Alert
    className="status"
    type="warning"
    icon="far fa-exclamation-triangle"
    status="Invalid Address"
  >
    <p>
      The address you entered is a commercial property or apartment building,
      and therefore is not included in the County’s standard collection
      schedule.
    </p>
    <p>
      Please contact your property manager for collection details at this
      location.
    </p>
  </Alert>
);

export default CommercialAlert;
