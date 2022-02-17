import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@baltimorecounty/dotgov-components";

import React from "react";
import { scrollSmoothTo } from "../common/ScrollToAnchor";

const getNameSpecificValues = (name) => {
  switch (name.toLowerCase()) {
    case "trash":
      return { icon: "far fa-trash-alt", frequency: "Weekly" };
    case "recycling":
      return { icon: "far fa-recycle", frequency: "Weekly" };
    case "yard materials":
      return { icon: "far fa-leaf", frequency: "Seasonal Bi-Weekly" };
    case "bulk pickup":
      return { icon: "far fa-dumpster", frequency: "Two Pickups Per Year" };
    default:
      return "";
  }
};

const GetBulkDates = (dates) => {
  var newDates = dates.split(",");
  let newDateString = "";

  for (let i = 0; i < newDates.length; i++) {
    var year = newDates[i].substring(0, 4);
    var month = newDates[i].substring(4, 6);
    var day = newDates[i].substring(6, 8);

    var newDate = new Date(year, month - 1, day).toLocaleDateString();

    if (i === newDates.length - 1) {
      newDateString += newDate;
    } else {
      newDateString += newDate + ", ";
    }
  }

  return newDateString;
};

const GetDateRowText = (
  name,
  nextCollectionDate,
  isCurrentlyActive,
  bulkCollectionDates,
  yardSchedule
) => {
  const scheduleLink = `See Yard <a href="javascript:;" onClick = ${scrollSmoothTo(
    "#Schedule-" + { yardSchedule }
  )}>Schedule ${yardSchedule}</a>`;

  console.log(scheduleLink);
  return name === "Bulk Pickup" ? (
    GetBulkDates(bulkCollectionDates)
  ) : name === "Yard Materials" ? (
    <div dangerouslySetInnerHTML={{ __html: scheduleLink }}></div>
  ) : null;
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
        <TableHeadCell>Collection Frequency</TableHeadCell>
        <TableHeadCell>Next Collection Day</TableHeadCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {collectionSchedules.map(
        (
          {
            name,
            collectionDays,
            yardSchedule,
            isCurrentlyActive = true,
            nextCollectionDate,
            bulkCollectionDates,
          },
          index
        ) => (
          <TableRow key={name}>
            <TableCell style={{ verticalAlign: "middle" }}>
              <i
                className={`fa-fw d-sm-none d-none d-md-inline ${
                  getNameSpecificValues(name).icon
                } fa-2x`}
                style={{ marginRight: "15px" }}
                aria-hidden="true"
              ></i>
              {name}
            </TableCell>
            <TableCell>{getNameSpecificValues(name).frequency}</TableCell>
            <TableCell>
              {name.toLowerCase() === "bulk pickup" ||
              name.toLowerCase() === "yard materials"
                ? GetDateRowText(
                    name,
                    nextCollectionDate,
                    isCurrentlyActive,
                    bulkCollectionDates,
                    yardSchedule
                  )
                : GetDayOfWeekRowText(
                    name,
                    nextCollectionDate,
                    isCurrentlyActive
                  )}
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);

export default ScheduleTable;
