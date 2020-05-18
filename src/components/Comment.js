import React from "react";
import { Comment as Cm, Avatar, Tooltip } from "antd";
import moment from "moment";

const Comment = ({ content, author }) => {
  return (
    <Cm
      actions={[
        <span key="comment-basic-reply-to">Reply</span>
      ]}
      author={<a>{author.username}</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt={author.username}
          size='small'
        />
      }
      content={
        <p>
          {content}
        </p>
      }
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Comment;
