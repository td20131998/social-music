import React, { useEffect } from "react";
import Logo from "./Logo.png";
import { Input, Col, Row, Layout, Avatar } from "antd";
import {
  BellFilled,
  MessageFilled,
  MoreOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Home from "./scenes/Home";
import Wall from "./scenes/Wall";
import { Switch, Link, Route } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getPlaylistUser } from "./services/playlist/api";
import { initPlaylistUser } from "./services/playlist/actions";
import Player from "./components/Player";

const DivRootLayout = styled.div`
  @media only screen and (max-width: 575px),
    only screen and (min-width: 576px) {
    .header {
      padding: 0;
    }
  }

  @media only screen and (min-width: 768px) {
    .header {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  @media only screen and (min-width: 992px) {
    .header {
      padding-right: 10px;
      padding-right: 10px;
    }
  }

  @media only screen and (min-width: 1200px) {
  }

  .header {
    background: white;
    line-height: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    height: 70px;
    font-size: 15px;
    border-bottom: 1px solid #dddddd;
    position: fixed;
    width: 100%;
    z-index: 1000;
  }

  .content {
    margin-top: 70px;
  }

  .footer {
    z-index: 1000;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .search {
    background-color: #efefef;
    border: none;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    width: 100%;
    border-radius: 8px;
  }
  .search input {
    background-color: transparent;
  }

  .header-item {
    width: 100%;
    border-radius: 999px;
    justify-content: center;
    text-align: center;
    /* border: 2px solid black; */
  }

  .header-item:hover {
    background: #f0f0f0;
  }
`;

const { Header, Footer, Content } = Layout;

const RootLayout = ({ userInfo, dispatch }) => {
  useEffect(() => {
    getPlaylistUser().then((playlists) => {
      dispatch(initPlaylistUser(playlists));
    });
  }, []);
  return (
    <DivRootLayout>
      <Layout>
        <Header className="header">
          <Row
            style={{ fontWeight: 700 }}
            gutter={{ xs: 3, sm: 3, md: 7, lg: 7 }}
          >
            <Col xs={3} sm={2} md={2} lg={2}>
              <div className="header-item">
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
            </Col>

            <Col xs={6} sm={11} md={8} lg={11}>
              <Input
                className="search"
                size="large"
                placeholder="Tìm kiếm"
                prefix={<SearchOutlined style={{ fontSize: "20px" }} />}
                onChange={(value) => console.log(value)}
                onPressEnter={(value) => console.log(value)}
              />
            </Col>

            <Col xs={0} sm={0} md={4} lg={3}>
              <div className="header-item">
                <Link to="/">Trang chủ</Link>
              </div>
            </Col>

            <Col xs={9} sm={5} md={4} lg={4}>
              <div className="header-item">
                <Link to={`/${userInfo.username}`}>
                  <Avatar size="small" icon={<UserOutlined />} />{" "}
                  {userInfo.username}
                </Link>
              </div>
            </Col>

            <Col xs={0} sm={0} md={0} lg={1}>
              <div style={{ fontSize: "30px" }}>|</div>
            </Col>

            <Col xs={2} sm={2} md={2} lg={1}>
              <div className="header-item">
                <MessageFilled style={{ fontSize: "20px" }} />
              </div>
            </Col>

            <Col xs={2} sm={2} md={2} lg={1}>
              <div className="header-item">
                <BellFilled style={{ fontSize: "20px" }} />
              </div>
            </Col>

            <Col xs={2} sm={2} md={2} lg={1}>
              <div className="header-item">
                <MoreOutlined rotate={90} style={{ fontSize: "20px" }} />
              </div>
            </Col>
          </Row>
        </Header>
        <Content className="content">
          <Switch>
            <Route exact path={`/${userInfo.username}`} component={Wall} />
            <Route component={Home} />
          </Switch>
        </Content>
        <Footer className="footer">
          <Player />
        </Footer>
      </Layout>
    </DivRootLayout>
  );
};

export default connect((state) => ({ userInfo: state.user.info }))(RootLayout);
