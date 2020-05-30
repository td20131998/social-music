import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Avatar,
  Tabs,
  message,
  notification,
} from "antd";
import styled from "styled-components";
import OwnPlaylist from "components/Playlist";
import OtherPlaylist from "./components/Playlist";
import PostList from "components/PostList";
import Post from "components/Post";
import { apiGetListPostLikedByUser } from "services/post/api";
import { connect } from "react-redux";
import { apiGetUserInfoByUsername } from "services/user/api";
import { apiFollow, apiUnfollow } from "services/follow/api";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const Wall = function ({ loginedUser, match: { params } }) {
  const { username } = params;
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const isLoginedUser = username === loginedUser.username;

  useEffect(() => {
    apiGetUserInfoByUsername(username).then((user) => {
      const { posts, playlists, isFollow, followers, following } = user;
      setUserInfo(user);
      setPosts(posts);
      setPlaylists(playlists);
      setIsFollow(isFollow);
      setFollowers(followers);
      setFollowings(following);
    });
  }, [username]);

  function follow(userId) {
    apiFollow(userId).then((follow) => {
      if (follow && follow._id) {
        notification.success({
          message: `Bạn đã theo dõi ${userInfo.username}`,
          duration: 0,
        });
        setIsFollow(true);
      }
    });
  }

  function unfollow(userId) {
    apiUnfollow(userId).then((res) => {
      notification.success({
        message: `Bạn đã bỏ theo dõi ${userInfo.username}`,
        duration: 0,
      });
      setIsFollow(false);
    });
  }

  return (
    <DivWall>
      <Row justify="center">
        <Card
          className="wall-cover"
          cover={
            <img
              className="img-cover"
              alt="cover_username"
              src={`http://localhost:8080/photos/${userInfo.cover}`}
            />
          }
        >
          <Row justify="center" style={{ marginTop: "-80px" }}>
            <div style={{ width: "200px", textAlign: "center" }}>
              <Avatar
                src={`http://localhost:8080/photos/${userInfo.avatar}`}
                size={100}
                style={{ border: "3px solid white" }}
              />
              <div>{userInfo.fullName}</div>
            </div>
          </Row>
          <ConnectionDiv isLoginedUser={isLoginedUser}>
            <Space>
              <Button
                onClick={() =>
                  isFollow ? unfollow(userInfo._id) : follow(userInfo._id)
                }
              >
                {isFollow ? "Followed" : "Follow"}
              </Button>
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
                <span>Follower</span>
                <Row gutter={16}>
                  {followers.map((follower) => (
                    <Col span={6}>
                      <Link to={`/${follower.user.username}`}>
                        <Avatar
                          shape="square"
                          src={`http://localhost:8080/photos/${follower.user.avatar}`}
                          size={64}
                        />
                        <div>{follower.user.username}</div>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
              <div>
                <span>Following</span>
                <Row gutter={16}>
                  {followings.map((following) => (
                    <Col span={6}>
                      <Link to={`/${following.follower.username}`}>
                        <Avatar
                          shape="square"
                          src={`http://localhost:8080/photos/${following.follower.avatar}`}
                          size={64}
                        />
                        <div>{following.follower.username}</div>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <div className="column-right">
              <Tabs defaultActiveKey="1" type="card" size="large">
                <TabPane tab="All" key="1">
                  {posts.map((post) => (
                    <Post key={post._id} info={post} />
                  ))}
                </TabPane>

                <TabPane tab="Playlist" key="2">
                  {isLoginedUser ? (
                    <OwnPlaylist />
                  ) : (
                    <OtherPlaylist playlists={playlists} />
                  )}
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
};

const ConnectionDiv = styled.div`
  display: ${(props) => (props.isLoginedUser ? "none" : "block")};
  .ant-space {
    font-size: 40px;
    float: right;
    color: #595959;
  }
`;
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

export default connect((state) => ({ loginedUser: state.user.info }))(Wall);
