import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@baltimorecounty/dotgov-components";

import React from "react";
import ScheduleButton from "./ScheduleButton";
import { scrollToAnchor } from "../common/ScrollToAnchor";

const ScheduleTable = (props) => {
  const { collectionSchedules } = props;

  const getNameSpecificValues = (
    name,
    yardSchedule = 0,
    collectionDays = []
  ) => {
    switch (name.toLowerCase()) {
      case "trash":
        return { icon: "far fa-trash-alt", frequency: "Weekly" };
      case "recycling":
        return { icon: "far fa-recycle", frequency: "Weekly" };
      case "yard materials":
        return {
          icon: "far fa-leaf",
          frequency:
            collectionDays.length === 0 ? "N/A" : scheduleLink(yardSchedule),
        };
      case "bulk pickup":
        return { icon: "far fa-dumpster", frequency: "Two Pickups Per Year" };
      default:
        return "";
    }
  };

  const GetBulkDates = (bulkCollectionDates) => {
    var newDates = bulkCollectionDates.split(",");
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

  const GetDayOfWeekRowText = (name, collectionDays) => {
    let days = "";
    for (let i = 0; i < collectionDays.length; ++i) {
      var newDay = collectionDays[i];

      if (i === collectionDays.length - 1) {
        days += newDay;
      } else {
        days += newDay + ", ";
      }
    }

    if (collectionDays.length === 0 && name === "Yard Materials") {
      days = "Collected with trash";
    }
    return days;
  };

  const scheduleLink = (yardSchedule) => {
    const ScheduleScroll = () => {
      scrollToAnchor(`Schedule-${yardSchedule}`);
    };

    return (
      <ScheduleButton
        yardSchedule={yardSchedule}
        handleLinkClick={ScheduleScroll}
      />
    );
  };

  return (
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
            { name, collectionDays, yardSchedule, bulkCollectionDates },
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
                {
                  getNameSpecificValues(name, yardSchedule, collectionDays)
                    .frequency
                }
              </TableCell>
              <TableCell>
                {name.toLowerCase() === "bulk pickup"
                  ? GetBulkDates(bulkCollectionDates)
                  : GetDayOfWeekRowText(name, collectionDays)}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default ScheduleTable;
