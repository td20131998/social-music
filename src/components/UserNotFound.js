import React from 'react'
import { Empty } from 'antd'
import { MehOutlined } from '@ant-design/icons'

const UserNotFound = function() {
    return (
        <Empty image={<MehOutlined />} />
    )
}

export default UserNotFound