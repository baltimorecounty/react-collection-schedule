import { useLocation, useParams } from "react-router-dom";
import { Alert } from "@baltimorecounty/dotgov-components";
import AddressNotFoundAlert from "./AddressNotFoundAlert";
import CommercialAlert from "./CommercialAlert";
import { Config } from "@baltimorecounty/javascript-utilities";
import Fetch from "../common/Fetch";
import { FormatAddress } from "../common/Formatters";
import React from "react";
import ScheduleTable from "./ScheduleTable";
import SomethingWentWrongAlert from "./SomethingWentWrongAlert";
import WrongAddressMessage from "./WrongAddressMessage";
import { useQuery } from "react-query";

const { getValue } = Config;

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQueryParams() {
  const params = new URLSearchParams(useLocation().search);

  //return { error: parseInt(params.get("error")) };
  return { error: 0 };
}

const Schedule = () => {
  const { address } = useParams();

  const zipcode = address.split(",")[1];

  const { error: errorFromQueryParams = 0 } = useQueryParams();
  const { data, status } = useQuery(
    address && [
      "getSchedule",
      {
        endpoint: getValue("collectionSchedule"),
        path: `${address.split(",")[0]},${zipcode}`,
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

  if (status === "error" || errorFromQueryParams === 500) {
    return <SomethingWentWrongAlert />;
  }

  const {
    collectionSchedules = [],
    isSingleFamilyHome,
    isApartmentInDwelling,
    isActiveRoute,
    isProposedRoute,
    pdfLink,
    status: httpStatus,
  } = data;

  const showSchedule = isActiveRoute ? true : isProposedRoute ? true : false;

  const hasAtLeastOneSchedule = collectionSchedules.some(
    (schedule) => schedule.nextCollectionDate
  );

  const displayMessage = () => {
    return (
      <Alert className="status" type="information" icon="far fa-info-circle">
        <p>
          Separate yard materials collection occurs every other week, from April
          through mid-December.
        </p>
      </Alert>
    );
  };

  const isResidential = isApartmentInDwelling
    ? true
    : isSingleFamilyHome
    ? true
    : false;

  const currentYear = () => new Date().getFullYear();

  const isYardWasteActiveFlag = () => {
    const isActiveFlag =
      collectionSchedules.length > 0
        ? collectionSchedules[2].isCurrentlyActive
        : true;

    return isActiveFlag;
  };

  return (
    <div>
      <div className="results">
        <h3>Your Current Schedule</h3>
        <p>You searched for:</p>
        <p className="font-weight-bold">
          {FormatAddress(address.split(",")[0])}
        </p>
        <WrongAddressMessage />
      </div>
      {!showSchedule ||
      httpStatus === 404 ||
      errorFromQueryParams === 404 ||
      !hasAtLeastOneSchedule ? (
        <AddressNotFoundAlert />
      ) : !isResidential ? (
        <CommercialAlert />
      ) : (
        <ScheduleTable collectionSchedules={collectionSchedules} />
      )}
      {!isYardWasteActiveFlag() &&
      collectionSchedules[2].nextCollectionDate != null
        ? displayMessage()
        : ""}

      {pdfLink && (
        <>
          <h3>YOUR YEARLY SCHEDULE</h3>
          <p>
            Find your complete trash, recycling and yard materials collections
            schedule for {currentYear()}.
          </p>
          <p>
            <a
              className="dg_button"
              href={pdfLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Download my schedule
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default Schedule;
