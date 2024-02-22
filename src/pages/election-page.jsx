import React from "react";
import useFetch from "../useFetch";
import { URLS } from "../constants/url";
import Elections from "../components/Elections";
import { Button, Flex, Spin } from "antd";
import { Link } from "react-router-dom";

function ElectionPage() {
  const { data, loading } = useFetch(URLS.ELECTION_URL);
  const style = { margin: "3rem 0", fontSize: "40px" };

  const mainWrapperStyle = { margin: "0 4rem" };
const linkStyle={display:"flex", justifyContent:"space-between", alignItems:"center"}
  return ( 
    <div style={mainWrapperStyle}>
     <div style={linkStyle}>
     <span style={style}>AVAILABLE ELECTIONS:-</span> 
      <Link to="/election-place">
        <Button type="primary">Voter Polling Details</Button>
      </Link>
     </div>
      {loading ? (
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      ) : (
      <div style={{width:"800px"}}>
          <Elections data={data.elections} />
      </div>
      )}
    </div>
  );
}

export default ElectionPage;
