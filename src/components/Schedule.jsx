import CommercialAlert from "./CommercialAlert";
import InActiveRouteAlert from "./InActiveRouteAlert";
import React from "react";
import ScheduleTable from "./ScheduleTable";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "../common/Fetch";
import SomethingWentWrongAlert from "./SomethingWentWrongAlert";
import { FormatAddress } from "../common/Formatters";

const { getValue } = Config;

const Schedule = () => {
  const { address } = useParams();

  const { data, isFetching, status } = useQuery(
    address && [
      "getSchedule",
      {
        endpoint: getValue("collectionSchedule"),
        path: `${address}`,
      },
    ],
    Fetch,
    {
      refetchOnWindowFocus: false,
      retries: false,
    }
  );

  if (!data) {
    return <p>Loading collection schedule for {FormatAddress(address)}...</p>;
  }

  if (status === "error") {
    return <SomethingWentWrongAlert />;
  }

  const {
    collectionSchedules = [],
    isSingleFamilyHome,
    isActiveRoute,
    pdfLink,
  } = data;

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
      <div className="results">
        <h3>Your Schedule</h3>
        <p>Showing collection schedule for:</p>
        <p className="font-weight-bold">{FormatAddress(address)}</p>
        <p>
          Not the right address? <Link to="/">Try another search</Link>.
        </p>
      </div>
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

export default Schedule;
