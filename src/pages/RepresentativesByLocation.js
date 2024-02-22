import React from "react";
import { Link, useLocation } from "react-router-dom";
import { URLS } from "../constants/url";
import Representatives from "../components/representatives";
import useFetch from "../useFetch";
import { Button } from "antd";

const RepresentativesByLocation = () => {
  const location = useLocation();
  const response = useFetch(
    `${URLS.REPRESENTATIVES}&address=${location?.state?.address}`
  );
  const headingStyle = { margin: "3rem 0", fontSize: "40px" };
  const linkStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const container = { width: "80%", margin: "auto" };
  return (
    <div style={container}>
      <div style={linkStyle}>
        <span style={headingStyle}>Representatives Info by Address:</span>
        <Link to="/">
          <Button type="primary">Home</Button>
        </Link>
      </div>
      <Representatives response={response} />
    </div>
  );
};

export default RepresentativesByLocation;
