import React from "react";
import { Link } from "react-router-dom";

const WrongAddressMessage = (props) => (
  <p>
    Not the right address? <Link to="/">Try another search</Link>.
  </p>
);

export default WrongAddressMessage;
