import React, { useEffect } from "react";
import { Input, Col, Row, Layout, Avatar, Dropdown, Menu } from "antd";
import {
  BellFilled,
  MessageFilled,
  MoreOutlined,
  UserOutlined,
  SearchOutlined,
  AntCloudOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import Home from "scenes/Home";
import Wall from "scenes/Wall";
import { Switch, Link, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { apiGetPlaylistUser } from "services/playlist/api";
import { initPlaylistUser } from "services/playlist/actions";
import { setAuthenticate } from "services/user/actions";
import Player from "components/Player";
import { resetToken } from "common/jwt";
import NotFound from "scenes/NotFound";
import Settings from 'scenes/Settings'
import socket from 'common/socketio'

const { Header, Footer, Content } = Layout;
const RootLayout = ({ userInfo, dispatch }) => {
  useEffect(() => {
    console.log(userInfo)
    const { _id, username } = userInfo
    socket.emit("user active", { _id, username })
    apiGetPlaylistUser().then((playlists) => {
      dispatch(initPlaylistUser(playlists));
    });
  }, []);

  // useEffect(() => {
  //   socket.on("signal offer", a => console.log(a))
  // }, [])

  function logout() {
    resetToken();
    dispatch(setAuthenticate(false));
  }

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
                <Link to="/discover">
                  <AntCloudOutlined
                    alt="Logo"
                    style={{ fontSize: "50px", color: "#E82C49" }}
                  />
                </Link>
              </div>
            </Col>

            <Col xs={6} sm={11} md={8} lg={11}>
              <Input
                className="search"
                size="large"
                placeholder="Tìm kiếm"
                prefix={<SearchOutlined className="icon-header" />}
                onChange={(value) => console.log(value)}
                onPressEnter={(value) => console.log(value)}
              />
            </Col>

            <Col xs={0} sm={0} md={4} lg={3}>
              <div className="header-item">
                <Link to="/discover">Trang chủ</Link>
              </div>
            </Col>

            <Col xs={9} sm={5} md={4} lg={4}>
              <div className="header-item">
                <Link to={`/${userInfo.username}`}>
                  <Avatar size="small" icon={<UserOutlined />} />{" "}
                  {userInfo.fullName.split(" ").pop()}
                </Link>
              </div>
            </Col>

            <Col xs={0} sm={0} md={0} lg={1}>
              <div className="icon-header">|</div>
            </Col>

            <Col xs={2} sm={2} md={2} lg={1}>
              <div className="header-item">
                <MessageFilled className="icon-header" />
              </div>
            </Col>

            <Col xs={2} sm={2} md={2} lg={1}>
              <div className="header-item">
                <BellFilled className="icon-header" />
              </div>
            </Col>

            <Col xs={2} sm={2} md={2} lg={1}>
              <div className="header-item">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="0"><Link to="/settings">Cài đặt</Link></Menu.Item>
                      <Menu.Item key="1">2nd menu item</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        key="2"
                        icon={<LoginOutlined />}
                        onClick={logout}
                      >
                        Đăng xuất
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                  placement="bottomCenter"
                >
                  <MoreOutlined rotate={90} className="icon-header" />
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Header>
        <Content className="content">
          <Switch>
            <Redirect exact from="/" to="discover" />
            <Route path="/discover" component={Home} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/notfound" component={NotFound} />
            <Route exact path="/:username" component={Wall} />
          </Switch>
        </Content>
        <Footer className="footer">
          <Player />
        </Footer>
      </Layout>
    </DivRootLayout>
  );
};

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
    a {
      color: #111111;
    }
  }

  .content {
    margin-top: 70px;
    margin-bottom: 60px;
  }

  .footer {
    z-index: 1000;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
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
  .icon-header {
    font-size: 20px;
  }
`;

export default connect((state) => ({ userInfo: state.user.info }))(RootLayout);
