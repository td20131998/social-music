import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, List, Tooltip } from "antd";
import PropTypes from "prop-types";
import { RightCircleFilled, CaretRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import CommentAction from "./CommentAction";
import LikeAction from "./LikeAction";
import PlaylistAction from "./PlaylistAction";
import Wave from "./Wave";
import { connect } from "react-redux";
import { addToStackPlaylist } from "services/player/actions";
import getPublicImage from "common/getPublicImage";
import moment from "moment";

const { Meta } = Card;
const { Item } = List;

const Post = function ({ info, dispatch }) {
  const createdTime = moment(info.created_at);
  const [view, setView] = useState(info.view)

  function play(audio) {
    dispatch(addToStackPlaylist(audio));
    setView(view + 1)
  }

  return (
    <DivPost>
      <Card
        style={{ width: "100%" }}
        loading={false}
        actions={[
          <LikeAction
            likeCount={info.likes.length}
            postId={info._id}
            isLike={info.isLike}
          />,
          <CommentAction
            commentCount={info.comments.length}
            postId={info._id}
          />,
          <PlaylistAction postId={info._id} />,
        ]}
      >
        <div className="post-content">
          <span>
            <img
              src="https://i1.sndcdn.com/artworks-000640919395-6d8iat-t500x500.jpg"
              alt="aaa"
              width="160"
              height="160"
            />
          </span>
          <span className="post-info">
            <RightCircleFilled
              style={{ fontSize: "50px", color: "#E82C49" }}
              onClick={() => play(info.src)}
            />
            <span className="author-name">
              <Link to={`/${info.user.username}`}>
                <div>{info.user.fullName}</div>
              </Link>
              <div>{info.name}</div>
            </span>
          </span>
          {/* <Wave className="wave" /> */}
          <span className="view">
            <Tooltip placement="bottomRight" title={`${view} lượt nghe`}>
              <CaretRightOutlined />
              {view}
            </Tooltip>
          </span>
          <span className="time-created">
            <Tooltip
              title={`Đăng vào ${createdTime.format("HH:mm:ss DD-MM-YYYY")}`}
              placement="bottomRight"
            >
              <span>{createdTime.fromNow()}</span>
            </Tooltip>
          </span>
        </div>
      </Card>
    </DivPost>
  );
};

const DivPost = styled.div`
  .post-content {
    display: inline-block;
    width: 100%;
    height: 160px;
    position: relative;
  }
  .author-name {
    display: inline-block;
    margin-left: 10px;
  }
  .post-info {
    position: absolute;
    top: 0;
    margin-left: 10px;
  }
  .wave {
    position: absolute;
    bottom: 0;
    margin-left: 10px;
  }
  .view {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 10px;
  }
  .time-created {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 10px;
  }
  .ant-list-item {
    display: block;
  }
  .anticon {
    display: inline !important;
  }
  .count {
    padding-left: 10px;
  }
  .ant-card-body {
    padding: 5px;
  }
  .ant-card-head-wrapper {
    display: block;
  }
`;

Post.propTypes = {
  info: PropTypes.object.isRequired,
};

export default connect()(Post);
