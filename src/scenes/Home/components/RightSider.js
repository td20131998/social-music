import React, { useState, useEffect } from "react";
import { List, Avatar } from "antd";
import styled from "styled-components";
import { apiSuggestFollow } from "services/follow/api"
import { Link } from 'react-router-dom'
import getPublicImage from 'common/getPublicImage'

const { Item } = List;
const { Meta } = Item;

const DivRightSider = styled.div`
  .right-sider {
    position: fixed;
    background-color: white;
  }

  @media only screen and (min-width: 768px) {
    .right-sider {
      width: 170px;
      margin-left: 0;
    }
    .ant-list-item {
      padding-left: 6px !important;
    }
  }

  @media only screen and (min-width: 992px) {
    .right-sider {
      width: 200px;
      margin-right: 18px;
    }

    .ant-list-item {
      padding-left: 16px !important;
    }
  }

  @media only screen and (min-width: 1200px) {
    .right-sider {
      width: 200px;
      margin-left: 40px;
    }

    .ant-list-item {
      padding-left: 24px !important;
    }
  }
`;
const RightSider = function () {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    apiSuggestFollow().then(suggestion => {
        setListUser(suggestion)
    })
  }, []);
  return (
    <DivRightSider>
      <List
        bordered={true}
        header="Suggetions for you"
        className="right-sider"
        itemLayout="horizontal"
        dataSource={listUser}
        renderItem={(user) => (
          <Item>
            <Meta
              avatar={<Avatar src={getPublicImage(user.avatar)} size="default" />}
              title={<Link to={`/${user.username}`}>{user.fullName}</Link>}
              description={`@${user.username}`}
            />
          </Item>
        )}
      />
    </DivRightSider>
  );
};

export default RightSider;
