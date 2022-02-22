import React from "react";

const HolidayButton = (props) => {
  const { handleLinkClick } = props;
  return (
    <button
      className="dg_button-link"
      style={{
        fontSize: "22px",
        fontStyle: "normal",
        cursor: "pointer",
      }}
      aria-expanded="false"
      type="button"
      onClick={handleLinkClick}
    >
      holiday collection schedule
    </button>
  );
};

export default HolidayButton;
