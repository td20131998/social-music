import React from 'react'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

const Heart = ({ love }) => (
    love ? <HeartFilled style={{ color: '#E60023'}} /> : <HeartOutlined />
)

export default Heart