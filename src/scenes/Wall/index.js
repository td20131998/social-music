import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Avatar,
  Tabs,
  notification,
  Upload,
} from "antd";
import { CameraOutlined } from "@ant-design/icons";
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
import getPublicImage from "common/getPublicImage";
import ListRecordLivestream from './components/ListRecordLivestream'

const { TabPane } = Tabs;

const Wall = function ({ loginedUser, match: { params } }) {
  const { username } = params;
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const isLoginedUser = username === loginedUser.username;
  useEffect(() => {
    apiGetUserInfoByUsername(username).then((user) => {
      const {
        posts,
        playlists,
        isFollow,
        followers,
        following,
        cover,
        avatar,
      } = user;
      setUserInfo(user);
      setPosts(
        posts.map((post) => ({
          ...post,
          user: { username: username, fullName: user.fullName },
        }))
      );
      setPlaylists(playlists);
      setIsFollow(isFollow);
      setFollowers(followers);
      setFollowings(following);
      setCover(cover);
      setAvatar(avatar);
    });
  }, [username]);

  useEffect(() => {}, [cover]);

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

  function handlePreview() {}
  function handleChange() {}
  return (
    <DivWall>
      <Row justify="center">
        <Card
          className="wall-cover"
          cover={
            <div className="wrapper-img">
              <img
                className="img-cover"
                alt="cover_username"
                src={getPublicImage(cover)}
              />
              {isLoginedUser ? (
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // listType="none"
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  <Button
                    shape="round"
                    className="image-edit"
                    icon={<CameraOutlined />}
                  >
                    Đổi ảnh bìa
                  </Button>
                </Upload>
              ) : null}
            </div>
          }
        >
          <Row justify="center" style={{ marginTop: "-80px" }}>
            <div style={{ width: "200px", textAlign: "center" }}>
              <Avatar
                src={getPublicImage(avatar)}
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
                    <Col span={6} key={follower.user.username}>
                      <Link to={`/${follower.user.username}`}>
                        <Avatar
                          shape="square"
                          src={getPublicImage(follower.user.avatar)}
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
                    <Col span={6} key={following.follower.username}>
                      <Link to={`/${following.follower.username}`}>
                        <Avatar
                          shape="square"
                          src={getPublicImage(following.follower.avatar)}
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
              <Tabs defaultActiveKey="all" type="card" size="large">
                <TabPane tab="All" key="all">
                  {posts.map((post) => (
                    <Post key={post._id} info={post} />
                  ))}
                </TabPane>

                <TabPane tab="Playlist" key="playlist">
                  {isLoginedUser ? (
                    <OwnPlaylist />
                  ) : (
                    <OtherPlaylist playlists={playlists} />
                  )}
                </TabPane>

                {isLoginedUser ? (
                  <TabPane tab="Liked" key="liked">
                    <PostList getListPost={apiGetListPostLikedByUser} />
                  </TabPane>
                ) : null}

                <TabPane tab="Streams" key="livestreams">
                  <ListRecordLivestream userInfo={userInfo} />
                </TabPane>
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
  .wrapper-img {
    position: relative;
  }
  .wrapper-img:hover {
    .image-edit {
      display: inline-block;
    }
  }
  .img-cover {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .image-edit {
    position: absolute;
    bottom: 10px;
    right: 10px;
    // font-size: 40px;
    // color: white;
    display: none;
  }
  .ant-upload-list-item-info,
  ant-upload-list-item
    ant-upload-list-item-done
    ant-upload-list-item-list-type-text {
    display: none;
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
    max-width: 25%;
    height: 300px;
    background-color: white;
    padding-left: 10px;
    padding-top: 10px;
  }
  .column-right {
    flex: 6;
    max-width: 75%;
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
