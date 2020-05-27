import React, { useEffect } from "react";
import { Row, Col, Card, Button, Space, Avatar, Tabs } from "antd";
import styled from "styled-components";
import Playlist from "components/Playlist";
import PostList from "components/PostList";
import {
  apiGetListPostOfUser,
  apiGetListPostLikedByUser,
} from "services/post/api";
import { connect } from "react-redux";
import { apiGetUserInfoByUsername } from "services/user/api";

const { Meta } = Card;
const { TabPane } = Tabs;

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      isLoginedUser: false,
    };
  }

  componentWillMount() {
    const { username } = this.props.match.params;
    const { logginedUser } = this.props;
    if (username !== logginedUser.username) {
      apiGetUserInfoByUsername(username).then((user) => {
        console.log(user)
        this.setState({ userInfo: user, isLoginedUser: false })
      })
    } else {
      this.setState({ userInfo: logginedUser, isLoginedUser: true });
    }
  }

  render() {
    console.log(this.state)
    const { userInfo, isLoginedUser } = this.state
    return (
      <DivWall>
        <Row justify="center">
          <Card
            className="wall-cover"
            cover={<img className="img-cover" alt="cover_username" src={src} />}
          >
            <Row justify="center" style={{ marginTop: "-80px" }}>
              <div style={{ width: "200px", textAlign: "center" }}>
                <Avatar
                  src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8"
                  size={100}
                  style={{ border: "3px solid white" }}
                />
                <div>{userInfo.username}</div>
              </div>
            </Row>
            <ConnectionDiv isLoginedUser={isLoginedUser}>
              <Space>
                <Button>{userInfo.isFollow ? "Followed" : "Follow"}</Button>
                <Button>Inbox</Button>
                <Button>More</Button>
              </Space>
            </ConnectionDiv>
          </Card>
        </Row>
        <Row className="wall-content" justify="center">
          <div style={{ width: "70%" }}>
            <div className="row">
              <div className="column-left">
                <div>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Avatar
                        shape="square"
                        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8"
                        size={64}
                      />
                      <div>Duong</div>
                    </Col>
                    <Col span={6}>
                      <Avatar
                        shape="square"
                        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8"
                        size={64}
                      />
                      <div>Duong</div>
                    </Col>
                    <Col span={6}>
                      <Avatar
                        shape="square"
                        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8"
                        size={64}
                      />
                      <div>Duong</div>
                    </Col>
                    <Col span={6}>
                      <Avatar
                        shape="square"
                        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8"
                        size={64}
                      />
                      <div>Duong</div>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row gutter={16}>
                    <Col span={8}>User 1</Col>
                    <Col span={8}>User 2</Col>
                    <Col span={8}>User 3</Col>
                    <Col span={8}>User 4</Col>
                  </Row>
                </div>
              </div>
              <div className="column-right">
                <Tabs defaultActiveKey="1" type="card" size="large">
                  <TabPane tab="All" key="1">
                    <PostList
                      getListPost={apiGetListPostOfUser}
                      userId={userInfo._id}
                    />
                  </TabPane>

                  <TabPane tab="Playlist" key="2">
                    <Playlist />
                  </TabPane>

                  {isLoginedUser ? (
                    <TabPane tab="Liked" key="3">
                      <PostList getListPost={apiGetListPostLikedByUser} />
                    </TabPane>
                  ) : null}
                </Tabs>
              </div>
            </div>
          </div>
        </Row>
      </DivWall>
    );
  }
}

const ConnectionDiv = styled.div`
  display: ${(props) => (props.isLoginedUser ? "none" : "block")};
  .ant-space {
    font-size: 40px;
    float: right;
    color: #595959;
  }
`;
const src = "";
const DivWall = styled.div`
  .wall-cover {
    width: 70%;
  }
  .img-cover {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .ant-card-meta {
    margin: -70px 0;
  }
  .wall-content {
    margin-top: 10px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .column-left {
    flex: 4;
    margin-right: 10px;
    max-width: 40%;
    height: 300px;
    background-color: white;
    padding-left: 10px;
    padding-top: 10px;
  }
  .column-right {
    flex: 6;
    max-width: 60%;
    background-color: white;
  }
  @media (max-width: 991px) {
    .column-left {
      flex: 100%;
      max-width: 100%;
      margin-right: 0;
    }
    .column-right {
      flex: 100%;
      max-width: 100%;
    }
  }
`;

export default connect((state) => ({ logginedUser: state.user.info }))(Wall);
