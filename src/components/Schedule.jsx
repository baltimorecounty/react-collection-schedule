import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "@baltimorecounty/dotgov-components";

import CommercialAlert from "./CommercialAlert";
import InActiveRouteAlert from "./InActiveRouteAlert";
import PropTypes from "prop-types";
import React from "react";

const Schedule = ({ schedule = {} }) => {
  const { collectionSchedules, isSingleFamilyHome, isActiveRoute } = schedule;
  const hasAtLeastOneSchedule = collectionSchedules.some(
    schedule => schedule.nextCollectionDate
  );

  if (!isActiveRoute) {
    return <InActiveRouteAlert />;
  }

  if (!isSingleFamilyHome) {
    return <CommercialAlert />;
  }

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
              <TableCell>{name}</TableCell>
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
  schedule: PropTypes.object.isRequired
};

export default Schedule;
