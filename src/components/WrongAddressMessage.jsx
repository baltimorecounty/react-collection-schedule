import React from "react";
import { Link } from "react-router-dom";
import { scrollSmoothTo } from "../common/ScrollToAnchor";

const handleOnClick = (id) => {
  scrollSmoothTo(id);
};

const WrongAddressMessage = (props) => (
  <div>
    <p>
      Not the right address? <Link to="/">Try another search</Link>.
    </p>
    <p>
      The information below reflects your normal assigned collection days. For
      holiday information, view the{" "}
      <a href="javascript:;" onclick={handleOnClick("holiday-schedule")}>
        holiday collection schedule
      </a>
      .
    </p>
  </div>
);

export default WrongAddressMessage;
