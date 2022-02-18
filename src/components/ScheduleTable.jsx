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

const scheduleLink = (yardSchedule) => {
  return `See Yard <a href="#" onClick = ${handleOnClick(
    "Schedule-" + { yardSchedule }
  )}>Schedule ${yardSchedule}</a>`;
};

const getNameSpecificValues = (name, yardSchedule = 0) => {
  switch (name.toLowerCase()) {
    case "trash":
      return { icon: "far fa-trash-alt", frequency: "Weekly" };
    case "recycling":
      return { icon: "far fa-recycle", frequency: "Weekly" };
    case "yard materials":
      return {
        icon: "far fa-leaf",
        frequency: (
          <div
            dangerouslySetInnerHTML={{ __html: scheduleLink(yardSchedule) }}
          ></div>
        ),
      };
    case "bulk pickup":
      return { icon: "far fa-dumpster", frequency: "Two Pickups Per Year" };
    default:
      return "";
  }
};

const handleOnClick = (e) => {
  scrollSmoothTo("holiday-schedule");
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
  collectionDays,
  nextCollectionDate,
  isCurrentlyActive,
  bulkCollectionDates,
  yardSchedule
) => {
  return name === "Bulk Pickup" ? (
    GetBulkDates(bulkCollectionDates)
  ) : name === "Yard Materials" ? (
    <div dangerouslySetInnerHTML={{ __html: scheduleLink }}></div>
  ) : null;
};

const GetDayOfWeekRowText = (name, collectionDays) => {
  let days = "";
  for (let i = 0; i < collectionDays.length; ++i) {
    days += collectionDays[i] + " ";
  }

  if (collectionDays.length === 0 && name === "Yard Materials") {
    days = "Collected with trash";
  }
  return days;
};

const ScheduleTable = ({ collectionSchedules = [] }) => (
  <Table className="table-fixed">
    <TableHead>
      <TableRow>
        <TableHeadCell>Type</TableHeadCell>
        <TableHeadCell>Collection Frequency</TableHeadCell>
        <TableHeadCell>Collection Day(s)</TableHeadCell>
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
            <TableCell>
              {getNameSpecificValues(name, yardSchedule).frequency}
            </TableCell>
            <TableCell>
              {name.toLowerCase() === "bulk pickup"
                ? GetDateRowText(
                    name,
                    collectionDays,
                    nextCollectionDate,
                    isCurrentlyActive,
                    bulkCollectionDates,
                    yardSchedule
                  )
                : GetDayOfWeekRowText(name, collectionDays)}
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);

export default ScheduleTable;
