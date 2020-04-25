import React from 'react'
import { Avatar as Avt } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const Avatar = (info) => (
    <div>
        <span>
            <Avt 
                size="default" 
                src={ info.imgSrc } 
                icon={ !info.imgSrc ? <UserOutlined /> : null }
                alt={`${info.id}_avatar`}
            />
            {info.fullname}
        </span>
        {info.id}
    </div>
)

export default Avatar