import React from "react";
import { Link } from "react-router-dom";

import HolidayButton from "./HolidayButton";
import { scrollToAnchor } from "../common/ScrollToAnchor";

const WrongAddressMessage = (props) => {
  const HolidayScroll = () => {
    scrollToAnchor("holiday-schedule");
  };
  return (
    <div>
      <p>
        Not the right address? <Link to="/">Try another search</Link>.
      </p>
      <p>
        The information below reflects your normal assigned collection days. For
        holiday information, view the{" "}
        <HolidayButton handleLinkClick={HolidayScroll} />.
      </p>
    </div>
  );
};

export default WrongAddressMessage;
