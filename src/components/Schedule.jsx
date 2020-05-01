import CommercialAlert from "./CommercialAlert";
import InActiveRouteAlert from "./InActiveRouteAlert";
import PropTypes from "prop-types";
import React from "react";
import ScheduleTable from "./ScheduleTable";

const Schedule = ({ schedule = {} }) => {
  const {
    collectionSchedules = [],
    isSingleFamilyHome,
    isActiveRoute,
    pdfLink,
  } = schedule;

  if (!isActiveRoute) {
    return <InActiveRouteAlert />;
  }

  if (!isSingleFamilyHome) {
    return <CommercialAlert />;
  }

  const hasAtLeastOneSchedule = collectionSchedules.some(
    (schedule) => schedule.nextCollectionDate
  );

  return (
    <div>
      {hasAtLeastOneSchedule ? (
        <ScheduleTable collectionSchedules={collectionSchedules} />
      ) : (
        <p>No schedules have been found for this property.</p>
      )}
      {pdfLink && (
        <>
          <h3>Download</h3>
          <a href={pdfLink} rel="noopener noreferrer" target="_blank">
            Download your complete four-year collection schedule.
          </a>
        </>
      )}
    </div>
  );
};

Schedule.propTypes = {
  /** Schedule Data */
  schedule: PropTypes.object.isRequired,
};

export default Schedule;
