import React from "react";

const ScheduleButton = (props) => {
  const { yardSchedule, handleLinkClick } = props;
  return (
    <div>
      See Yard{" "}
      <button
        className="dg_button-link"
        style={{
          fontFamily: "Montserrat,sans-serif",
          fontSize: "16px",
          fontStyle: "normal",
        }}
        aria-expanded="false"
        type="button"
        onClick={handleLinkClick}
      >
        Schedule{yardSchedule}
      </button>
    </div>
  );
};

export default ScheduleButton;
