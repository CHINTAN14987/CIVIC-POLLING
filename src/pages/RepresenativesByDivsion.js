import React from "react";
import { Button } from "antd";
import useFetch from "../useFetch";

import { URLS } from "../constants/url";

import { useNavigate, useLocation } from "react-router-dom";

import DivisionRepresentatives from "../components/DivisionRepresntatives";

const RepresentativesByDivsion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const encodedOcdDivisionId = encodeURIComponent(location.state.ocdDivisionId);
  const { data, loading, error } = useFetch(
    `${URLS.REPRESENTATIVES_BY_DIVISION}/${encodedOcdDivisionId}?key=${process.env.REACT_APP_KEY}`
  );
  const headingStyle = { margin: "3rem 0", fontSize: "40px" };
  const container = { width: "80%", margin: "auto" };

  const linkStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  
  

  return (
    <div style={container}>
      <div style={linkStyle}>
        <span style={headingStyle}>Representatives By Division...</span>

        <Button
          type="primary"
          onClick={() => {
            navigate("/representative-by-address", {
              state: { address: location.state.address },
            });
          }}
        >
          Representatives By Address...
        </Button>
      </div>

      <DivisionRepresentatives data={data} loading={loading} error={error} />
    </div>
  );
};

export default RepresentativesByDivsion;
