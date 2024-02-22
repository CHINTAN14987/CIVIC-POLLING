import React from "react";
import { Spin, Table } from "antd";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramFilled,
} from "@ant-design/icons";

const DivisionRepresentatives = ({ data, loading, error }) => {
  const linkStyle = { margin: "5px", fontSize: "25px" };
  const getSocialChannels = (channel) => {
    switch (channel.type) {
      case "Facebook":
        return {
          icon: <FacebookFilled />,
          link: `https://www.facebook.com/${channel.id}`,
          name: channel.type,
        };
      case "Twitter":
        return {
          icon: <TwitterOutlined />,
          link: `https://www.twitter.com/${channel.id}`,
          name: channel.type,
        };
      case "Instagram":
        return {
          icon: <InstagramFilled />,
          link: `https://www.instagram.com/${channel.id}`,
          name: channel.type,
        };
      default:
        return null;
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Profile Picture",
      dataIndex: "photoUrl",
      key: "photoUrl",
      render: (img, record) =>
        img ? (
          <img
            src={img}
            alt="profile"
            style={{ borderRadius: "50%", width: "5rem", height: "5rem" }}
          />
        ) : (
          <div
            style={{
              borderRadius: "50%",
              width: "5rem",
              height: "5rem",
              background: "lightBlue",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}
          >
            <h3>{record?.name?.charAt(0)?.toUpperCase()}</h3>
          </div>
        ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles, record, index) => {
        const matchingOffice = data?.offices.find((office) =>
          office?.officialIndices?.includes(index)
        );
        if (matchingOffice) {
          return (
            <div>
              <span>{matchingOffice.name}</span>
              <h3 style={{ fontSize: "14px" }}>
                levels- {matchingOffice.levels[0]}
              </h3>
            </div>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Social Media",
      dataIndex: "channels",
      key: "channels",
      render: (channels) => (
        <div style={{ display: "flex", gap: "1rem" }}>
          {channels?.map((channel, index) => {
            const socialChannel = getSocialChannels(channel);
            if (socialChannel) {
              return (
                <a
                  key={index}
                  href={socialChannel.link}
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialChannel.icon}
                </a>
              );
            }
            return null;
          })}
        </div>
      ),
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
      render: (phones) => phones.join(", "),
    },
    {
      title: "E-Mail",
      dataIndex: "emails",
      key: "emails",
      render: (emails) =>
        !emails?.length || !emails ? (
          "-"
        ) : (
          <div>
            {emails.map((email, index) => (
              <a key={index} href={`mailto:${email}`}>
                {email}
              </a>
            ))}
          </div>
        ),
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
    {
      title: "Website",
      dataIndex: "urls",
      key: "urls",
      render: (url) =>
        url?.map((link) => (
          <div>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </div>
        )),
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

  if (data) {
    return <Table dataSource={data.officials} columns={columns} />;
  }

  return null;
};

export default DivisionRepresentatives;
