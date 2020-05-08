import React from "react";
import { Card, Avatar, List } from "antd";
import PropTypes from "prop-types";
import { SaveOutlined } from "@ant-design/icons";
import Heart from "./Heart";
import styled from "styled-components";
import CommentList from "./CommentList";
import LikeList from "./LikeList";

const { Meta } = Card;
const { Item } = List;

const DivPost = styled.div`
  .ant-list-item {
    display: block;
  }
  .anticon-heart,
  .anticon-comment {
    display: inline !important;
  }
  .count-likes,
  .count-comment {
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

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.info,
      isShowComment: false,
    };
  }

  render() {
    let info = this.state;
    return (
      <DivPost>
        <Card
          style={{ width: "100%" }}
          // hoverable={true}
          loading={false}
          actions={[
            <LikeList 
              likeCount={info.likes.length}
              postId={info._id}
              isLike={info.isLike}
            />,
            <CommentList
              commentCount={info.comments.length}
              postId={info._id}
            />,
            <SaveOutlined onClick={() => console.log("save")} />,
            // <ShareAltOutlined key="share" />
          ]}
          extra={
            <>
              <div
                style={{ display: "inline-block", float: "left", top: "5px" }}
              >
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span>{info.user.username}</span>
              </div>
              <div style={{ display: "inline-block", float: "right" }}>...</div>
            </>
          }
        >
          <div style={{ display: "inline-block", width: "100%" }}>
            <List>
              <Item>
                <div>{info.song.name}</div>
                <audio controls>
                  {/* this is source audio */}
                  <source src="https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-10.mp3" />
                </audio>
              </Item>
            </List>
          </div>
        </Card>
        <div></div>
      </DivPost>
    );
  }
}

Post.propTypes = {
  info: PropTypes.object.isRequired,
};

export default Post;
