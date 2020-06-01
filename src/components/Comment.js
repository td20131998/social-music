import React from "react";
import { Comment as Cm, Avatar, Tooltip } from "antd";
import { Link } from 'react-router-dom'
import moment from "moment";
import getPublicImage from 'common/getPublicImage'

const Comment = function({ info }) {
  const createdTime = moment(info.created_at)  
  return (
    <Cm
      actions={[
        // <span key="comment-basic-reply-to">Reply</span>
      ]}
      author={<Link to={`/${info.user.username}`}>{info.user.fullName}</Link>}
      avatar={
        <Avatar
          src={getPublicImage(info.user.avatar)}
          alt={info.user.username}
          size='small'
        />
      }
      content={
        <p>
          {info.content}
        </p>
      }
      datetime={
        <Tooltip title={moment(createdTime).format("HH:mm:ss DD-MM-YYYY")}>
          <span>{moment(createdTime).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default Comment;
