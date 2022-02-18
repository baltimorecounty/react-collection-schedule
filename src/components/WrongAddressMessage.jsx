import React from "react";
import { Link } from "react-router-dom";
import { scrollToAnchor } from "../common/ScrollToAnchor";

const handleOnClick = (e) => {
  scrollToAnchor("holiday-schedule");
};

const WrongAddressMessage = (props) => (
  <div>
    <p>
      Not the right address? <Link to="/">Try another search</Link>.
    </p>
    <p>
      The information below reflects your normal assigned collection days. For
      holiday information, view the{" "}
      <button
        className="dg_button-link"
        style={{
          fontSize: "22px",
          fontStyle: "normal",
        }}
        aria-expanded="false"
        type="button"
        onClick={handleOnClick()}
      >
        holiday collection schedule
      </button>
      .
    </p>
  </div>
);

export default WrongAddressMessage;
