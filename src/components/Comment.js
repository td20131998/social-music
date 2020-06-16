import React from "react";
import { Comment as Cm, Avatar, Tooltip } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import getPublicImage from "common/getPublicImage";
import styled from "styled-components";

const Comment = function ({ info }) {
  const createdTime = moment(info.created_at);
  return (
    <DivComment>
      <Cm
        actions={[]}
        author={<Link to={`/${info.user.username}`}>{info.user.fullName}</Link>}
        avatar={
          <Avatar
            src={getPublicImage(info.user.avatar)}
            alt={info.user.username}
            size="small"
          />
        }
        content={<p>{info.content}</p>}
        datetime={
          <Tooltip title={moment(createdTime).format("HH:mm:ss DD-MM-YYYY")}>
            <span>{moment(createdTime).fromNow()}</span>
          </Tooltip>
        }
      />
    </DivComment>
  );
};

const DivComment = styled.div`
  width: 100%;
  .ant-comment {
    width: 100%;
  }
`;
export default Comment;
