import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@baltimorecounty/dotgov-components";

import React from "react";

const getIconClass = (name) => {
  switch (name.toLowerCase()) {
    case "trash":
      return "far fa-trash-alt";
    case "recycling":
      return "far fa-recycle";
    case "yard materials":
      return "far fa-leaf";
    default:
      return "";
  }
};

const ScheduleTable = ({ collectionSchedules = [] }) => (
  <Table className="table-fixed">
    <TableHead>
      <TableRow>
        <TableHeadCell>Type</TableHeadCell>
        <TableHeadCell>Collection Occurs</TableHeadCell>
        <TableHeadCell>Next Collection</TableHeadCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {collectionSchedules.map(
        (
          { name, collectionDays, isCurrentlyActive, nextCollectionDate },
          index
        ) => (
          <TableRow key={name}>
            <TableCell style={{ verticalAlign: "middle" }}>
              <i
                className={`fa-fw d-sm-none d-none d-md-inline ${getIconClass(
                  name
                )} fa-2x`}
                style={{ marginRight: "15px" }}
                aria-hidden="true"
              ></i>
              {name}
            </TableCell>
            <TableCell>
              {isCurrentlyActive
                ? collectionDays.join(",")
                : "collected with trash"}
            </TableCell>
            <TableCell>
              {isCurrentlyActive
                ? new Date(nextCollectionDate).toLocaleDateString()
                : "n / a"}
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);

export default ScheduleTable;
