import React from "react";
import { Button, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";

const VotersElectionsDetail = ({ loading, data, error, address }) => {
console.log(data, "data")
  const navigate = useNavigate();
  const columns = [
    {
      title: "Election ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Election Day",
      dataIndex: "electionDay",
      key: "electionDay",
    },
    {
      title: "OCD-Division",
      dataIndex: "ocdDivisionId",
      key: "ocdDivisionId",
    },
    {
      title: "View Representatives",
      key: "viewrepresentatives",
      render: (record) => {
        return (
          <Button
          type="primary"
            onClick={() =>
              navigate("/representative-election-details", {
                state: { ocdDivisionId: record.ocdDivisionId, address }
              })
            }
          >View</Button>
        );
      },
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
  if (data?.hasOwnProperty("error")) {
    return <h3>{data.error?.errors?.[0]?.message}</h3>;
  }
  if (!data?.hasOwnProperty("error")) {
    return <Table dataSource={[data.election]} columns={columns} />;
  }

  return null;
};

export default VotersElectionsDetail;
