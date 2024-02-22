import React, {  useState } from "react";
import { Button, Input } from "antd";
import useFetch from "../useFetch";
import { URLS } from "../constants/url";
import VotersElectionsDetail from "../components/VotersElectionsDetail";
import Polling from "../components/Polling";

const VoterInfo = () => {
  const [inputValue, setInputValue] = useState(
    "1 MAIN ST, HOUSTON, TX 77002-1001, USA"
  );
  const { data, loading, error } = useFetch(
    `${URLS.VOTER_INFO_URL}&address=${inputValue}`
  );

  const onSearch = (e) => {
    setInputValue(e.target.value.toUpperCase());
  };

  const style = { borderRadius: "0px" };
  const mainWrapperStyle = { display: "flex" };
  const tableStyle = { marginTop: "4rem" };
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
        <span style={headingStyle}>
          Full address required for localized information
        </span>
        {/* <Link to="/">
          <Button type="primary">All Election Details</Button>
        </Link> */}
      </div>
      <div style={mainWrapperStyle}>
        <Input
          placeholder=" Enter your Address"
          allowClear
          enterButton="Search"
          size="large"
          value={inputValue}
          onChange={onSearch}
          style={style}
        />
        <Button type="primary" style={style} size="large">
          Search
        </Button>
      </div>
      <div style={tableStyle}>
        <VotersElectionsDetail
          loading={loading}
          data={data}
          error={error}
          address={inputValue}
        />
      </div>
      <div>
        <Polling
          electionID={data?.election?.id}
          inputValue={inputValue}
          earlyPolling={false}
          text={"Voter Polling Locations..."}
        />

        <Polling
          electionID={data?.election?.id}
          inputValue={inputValue}
          earlyPolling={true}
          text={"Voter Early Polling Locations"}
        />
      </div>
    </div>
  );
};

export default VoterInfo;
