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
    case "bulk pickup":
      return "far fa-dumpster";
    default:
      return "";
  }
};

const GetDateRowText = (name, nextCollectionDate, isCurrentlyActive) => {
  return name === "Bulk Pickup" && nextCollectionDate === ""
    ? "There are no more bulk pickups for this year"
    : isCurrentlyActive
    ? new Date(nextCollectionDate).toLocaleDateString()
    : !isCurrentlyActive && nextCollectionDate != null
    ? new Date(nextCollectionDate).toLocaleDateString()
    : name === "bulk pickup" && nextCollectionDate === ""
    ? "There are no more bulk pickups for this year"
    : "n / a";
};

const GetDayOfWeekRowText = (name, nextCollectionDate, isCurrentlyActive) => {
  return name === "Bulk Pickup"
    ? nextCollectionDate !== ""
      ? new Date(nextCollectionDate).toLocaleDateString("en-us", {
          weekday: "long",
        })
      : "n/a"
    : isCurrentlyActive
    ? new Date(nextCollectionDate).toLocaleDateString("en-us", {
        weekday: "long",
      })
    : !isCurrentlyActive && nextCollectionDate != null
    ? "Collected with trash until"
    : "Collected with trash";
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
          {
            name,
            collectionDays,
            isCurrentlyActive = true,
            nextCollectionDate,
          },
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
              {GetDayOfWeekRowText(name, nextCollectionDate, isCurrentlyActive)}
            </TableCell>
            <TableCell>
              {GetDateRowText(name, nextCollectionDate, isCurrentlyActive)}
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);

export default ScheduleTable;
