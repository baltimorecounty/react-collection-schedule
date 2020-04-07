import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@baltimorecounty/dotgov-components";

import PropTypes from "prop-types";
import React from "react";

const Schedule = ({ schedule = {} }) => {
  const { collectionSchedules = [] } = schedule;
  const hasAtLeastOneSchedule = collectionSchedules.some(
    (schedule) => schedule.nextCollectionDate
  );

  const getIconClass = (name) => {
    switch (name.toLowerCase()) {
      case "trash":
        return "far fa-trash-alt";
      case "recycling":
        return "far fa-recycle";
      case "yard waste":
        return "far fa-leaf";
      default:
        return "";
    }
  };

  return hasAtLeastOneSchedule ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Type</TableHeadCell>
          <TableHeadCell>Collection Occurs</TableHeadCell>
          <TableHeadCell>Next Collection</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {collectionSchedules.map(
          ({ name, collectionDays, nextCollectionDate }, index) => (
            <TableRow key={name}>
              <TableCell style={{ verticalAlign: "middle" }}>
                <i
                  className={`${getIconClass(name)} fa-2x`}
                  style={{ marginRight: "10px" }}
                  aria-hidden="true"
                ></i>
                {name}
              </TableCell>
              <TableCell>
                {collectionDays.length > 0
                  ? collectionDays.join(",")
                  : "No collection days specified for this type."}
              </TableCell>
              <TableCell>
                {nextCollectionDate
                  ? new Date(nextCollectionDate).toLocaleDateString()
                  : "n / a"}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  ) : (
    <p>No schedules have been found for this property.</p>
  );
};

Schedule.propTypes = {
  /** Schedule Data */
  schedule: PropTypes.object.isRequired,
};

export default Schedule;
