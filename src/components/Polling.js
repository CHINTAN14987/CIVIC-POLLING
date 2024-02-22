import { Table } from "antd";
import React from "react";
import useFetch from "../useFetch";
import { URLS } from "../constants/url";

const Polling = (props) => {
  const { inputValue, electionID, earlyPolling, text } = props;
  const { data, loading, error } = useFetch(
    `${URLS.VOTER_INFO_URL}&address=${inputValue}&electionId=${electionID}`
  );

  console.log(data, "newData");
  const headingStyle = { margin: "3rem 0", fontSize: "40px" };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function ordinal(n) {
    const suffix = ["th", "st", "nd", "rd", "th"][Math.min(n % 10, 4)];
    if (11 <= n % 100 && n % 100 <= 13) {
      return n + "th";
    }
    return n + suffix;
  }
  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) =>
        address
          ? `${address?.line1}, ${address?.city}, ${address?.state} ${address?.zip}`
          : "-",
    },
    {
      title: "Polling Hours",
      dataIndex: "pollingHours",
      key: "pollingHours",
      render: (hours) => {
        if (hours.includes("\n")) {
          const newTiming = hours.split("\n");
          return newTiming.map((hour, index) => (
            <p
              key={index}
              style={{ fontWeight: 600, margin: 0, fontSize: "10px" }}
            >
              {hour}
            </p>
          ));
        } else return hours;
      },
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => {
        const dateObject = new Date(date);
        const day = dateObject.getDate();
        const monthIndex = dateObject.getMonth();
        const year = dateObject.getFullYear();
        const dayWithSuffix = ordinal(day);
        const formattedDate = `${dayWithSuffix} ${monthNames[monthIndex]} ${year}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => {
        const dateObject = new Date(date);
        const day = dateObject.getDate();
        const monthIndex = dateObject.getMonth();
        const year = dateObject.getFullYear();
        const dayWithSuffix = ordinal(day);
        const formattedDate = `${dayWithSuffix} ${monthNames[monthIndex]} ${year}`;
        return <span>{formattedDate}</span>;
      },
    },
  ];

  if (error) {
    return <h3>Address is incorrect. Failed to parse the address.</h3>;
  }

  if (loading) {
    return <></>;
  }

  if (!data?.hasOwnProperty("error")) {
    return (
      <div>
        <h3 style={headingStyle}>{text}</h3>
        <Table
          dataSource={
            earlyPolling ? data?.earlyVoteSites : data?.pollingLocations
          }
          columns={columns}
        />
        {earlyPolling && (
          <div style={{margin:"3rem 0"}}>
            <h3>Election Administration Body Links:</h3>
            {Object.entries(data?.state?.[0]?.electionAdministrationBody)?.map(
              ([key, value], index) => {
                if (key === "physicalAddress") {
                  return null; // or <></> if you prefer
                } else {
                  return (
                    <div key={index} style={{display:"flex", flexDirection:"column"}}>
                      <a href={value} style={{fontWeight:700, padding:"4px"}}>{value}</a>
                    </div>
                  );
                }
              }
            )}
          </div>
        )}
      </div>
    );
  }
  //   if (data.hasOwnProperty("error")) {
  //     return <h3>{data.error?.errors?.[0]?.message}</h3>;
  //   }

  return null;
};

export default Polling;
