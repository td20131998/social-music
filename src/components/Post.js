import React from "react";
import { Link } from "react-router-dom";
import { Card, Avatar, List } from "antd";
import PropTypes from "prop-types";
import { RightCircleFilled } from "@ant-design/icons";
import styled from "styled-components";
import CommentAction from "./CommentAction";
import LikeAction from "./LikeAction";
import PlaylistAction from "./PlaylistAction";
import Wave from "./Wave";
import { connect } from "react-redux";
import { addToStackPlaylist } from "services/player/actions";
import getPublicImage from "common/getPublicImage";

const { Meta } = Card;
const { Item } = List;

const Post = function ({ info, dispatch }) {
  function play(audio) {
    dispatch(addToStackPlaylist(audio));
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
        extra={
          <Link to={`/${info.user.username}`}>
            <div style={{ display: "inline-block", float: "left", top: "5px" }}>
              <Avatar src={getPublicImage(info.user.avatar)} />
              <span>{info.user.fullName}</span>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>...</div>
          </Link>
        }
      >
        <div style={{ display: "inline-block", width: "100%" }}>
          <List>
            <Item>
              <div style={{ height: "180px" }}>
                <span style={{ display: "inline-block" }}>
                  <img
                    src="https://i1.sndcdn.com/artworks-000640919395-6d8iat-t500x500.jpg"
                    alt="aaa"
                    width="160"
                    height="160"
                  />
                </span>
                <span style={{ display: "inline-block", width: "100%" }}>
                  <RightCircleFilled
                    style={{ fontSize: "50px", color: "#E82C49" }}
                    onClick={() => play(info.src)}
                  />
                  <div>{info.user.username}</div>
                  <h4>{info.name}</h4>
                </span>
              </div>
            </Item>
          </List>
        </div>
      </Card>
      <div></div>
    </DivPost>
  );
};

const DivPost = styled.div`
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
  .ant-card-extra {
    float: none;
    padding-top: 8px;
  }
  .ant-card-head-wrapper {
    display: block;
  }
`;

Post.propTypes = {
  info: PropTypes.object.isRequired,
};

export default connect()(Post);
