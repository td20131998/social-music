import React, { useState } from "react";
import { Comment as Cm, Avatar, Tooltip } from "antd";
import moment from "moment";

const Comment = ({ content, author }) => {
  // <Cm
  //     style={{ textAlign: 'left' }}
  //     actions={[<span key="Cm-nested-reply-to">Reply to</span>]}
  //     author={info.name}
  //     avatar={<Avatar src={info.avatarSrc} alt={`${info.name}_avatar`} size='small' />}
  //     datetime={
  //         <Tooltip
  //           title={moment()
  //             .subtract(1, 'days')
  //             .format('YYYY-MM-DD HH:mm:ss')}
  //         >
  //           <span>
  //             {moment()
  //               .subtract(1, 'days')
  //               .fromNow()}
  //           </span>
  //         </Tooltip>
  //     }
  //     content={<p>{info.comment}</p>}
  // >
  //     {children}
  // </Cm>
  const actions = [
    <span key="comment-basic-reply-to">Reply</span>
  ];

  return (
    <Cm
      actions={actions}
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
