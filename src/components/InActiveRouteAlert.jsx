import { Alert } from "@baltimorecounty/dotgov-components";
import React from "react";

export default (
  <Alert
    className="status"
    type="warning"
    icon="far fa-exclamation-triangle"
    status="Invalid Address"
  >
    <p>
      The address provided does not match our records. If the address is
      correct.
    </p>
    <p>
      Please contact Customer Service at 410-887-2000 Monday - Friday from 7:30
      a.m. - 4 p.m.
    </p>
  </Alert>
);
