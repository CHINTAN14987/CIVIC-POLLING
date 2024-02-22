import React from "react";
import { Spin, Table } from "antd";

const Representatives = (props) => {
  const {
    response: { data, loading, error },
  } = props;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Party",
      dataIndex: "party",
      key: "party",
    },
    {
      title: "Phone Number",
      dataIndex: "phones",
      key: "phones",
      render: (phones) => phones?.join(", "),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) =>
        address
          ? `${address?.[0]?.line1}, ${address?.[0]?.city}, ${address?.[0]?.state} ${address?.[0]?.zip}`
          : "-",
    },
  ];

  if (error) {
    return <h3>Address is incorrect. Failed to parse the address.</h3>;
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!data.hasOwnProperty("error")) {
    return <Table dataSource={[...data?.officials]} columns={columns} />;
  }
  if (data.hasOwnProperty("error")) {
    return <h3>{data.error?.errors?.[0]?.message}</h3>;
  }

  return null;
};

export default Representatives;
