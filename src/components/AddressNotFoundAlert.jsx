import { Alert } from "@baltimorecounty/dotgov-components";
import React from "react";

const AddressNotFoundAlert = () => (
  <Alert
    className="status"
    type="warning"
    icon="far fa-exclamation-triangle"
    status="Invalid Address"
  >
    <p>The address provided does not match our records.</p>
    <p>
      If the address is correct, please contact Customer Service at
      410-887-2000. They can be reached Monday - Friday from 7:30 a.m. - 4 p.m.
    </p>
  </Alert>
);

export default AddressNotFoundAlert;
