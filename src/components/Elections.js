
import { Table } from "antd";
import React from "react";

const Elections = (props) => {
  const { data } = props;
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => `${index + 1}`,
      width:50,
  
    },
    {
      title: "Office",
      dataIndex: "name",
      key: "name",
      width:400,
    
    },
    {
      title: "Date",
      dataIndex: "electionDay",
      key: "electionDay",
    
    },
    // {
    //   title: "OCD-Division",
    //   dataIndex: "ocdDivisionId",
    //   key: "ocdDivisionId",
    // },
  ];
  
  return <Table dataSource={data} columns={columns} />;
};

export default Elections;
