import { Alert } from "@baltimorecounty/dotgov-components";
import React from "react";

const AddressNotFoundAlert = () => (
  <Alert
    className="status"
    type="warning"
    icon="far fa-exclamation-triangle"
    status="Invalid Address"
  >
    <p>
      A collection schedule isn't available at this time for the address
      provided.
    </p>
    <p>
      If the address is correct, please contact Customer Service at
      410-887-2000. They can be reached Monday through Friday from 7:30 a.m. to
      4 p.m.
    </p>
  </Alert>
);

export default AddressNotFoundAlert;
