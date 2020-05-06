import React from 'react'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

const Heart = ({ love, toggleLove }) => (
    <span onClick={toggleLove}>
        { love ? <HeartFilled style={{ color: '#E60023'}} /> : <HeartOutlined /> }
    </span>
)

export default Heart