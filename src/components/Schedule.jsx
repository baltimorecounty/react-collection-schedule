import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "@baltimorecounty/dotgov-components";

import PropTypes from "prop-types";
import React from "react";

const Schedule = ({ schedule = {} }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeadCell>Type</TableHeadCell>
        <TableHeadCell>Collection Occurs</TableHeadCell>
        <TableHeadCell>Next Collection</TableHeadCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {schedule.collectionSchedules.map(
        ({ name, collectionDays, nextCollectionDate }, index) => (
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{collectionDays.join(",")}</TableCell>
            <TableCell>
              {new Date(nextCollectionDate).toLocaleDateString()}
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);

Schedule.propTypes = {
  /** Schedule Data */
  schedule: PropTypes.object.isRequired
};

export default Schedule;
