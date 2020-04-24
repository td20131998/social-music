import React from 'react'
import { Comment as Cm, Avatar, Tooltip } from 'antd'
import moment from 'moment'

const Comment = ({ info, children }) => (
    <Cm 
        style={{ textAlign: 'left' }}
        actions={[<span key="Cm-nested-reply-to">Reply to</span>]}
        author={info.name}
        avatar={<Avatar src={info.avatarSrc} alt={`${info.name}_avatar`} />}
        datetime={
            <Tooltip
              title={moment()
                .subtract(1, 'days')
                .format('YYYY-MM-DD HH:mm:ss')}
            >
              <span>
                {moment()
                  .subtract(1, 'days')
                  .fromNow()}
              </span>
            </Tooltip>
        }
        content={<p>{info.comment}</p>}
    >
        {children}
    </Cm>
)

export default Comment