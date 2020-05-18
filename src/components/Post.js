import React from "react";
import { Card, Avatar, List } from "antd";
import PropTypes from "prop-types";
import { SaveOutlined } from "@ant-design/icons";
import Heart from "./Heart";
import styled from "styled-components";
import CommentAction from "./CommentAction";
import LikeAction from "./LikeAction";
import PlaylistAction from './PlaylistAction'

const { Meta } = Card;
const { Item } = List;

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

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.info
    };
  }

  render() {
    console.log(this.state)
    let info = this.state;
    return (
      <DivPost>
        <Card
          style={{ width: "100%" }}
          // hoverable={true}
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
            <PlaylistAction 
              postId={info._id}
            />
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
                  <source src={`http://localhost:8080/api/songs/${info.song.source}/play`} />
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
