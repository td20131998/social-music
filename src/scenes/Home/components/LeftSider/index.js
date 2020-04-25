import React from 'react'
import { Menu, Avatar } from 'antd';
import { 
    UserOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined
} from '@ant-design/icons';
import './styles.css'

const { Item } = Menu;

const LeftSider = () => (
    <Menu
        className="left-sider"
        defaultSelectedKeys={['1']}
        mode="inline"
    >
        <Item key="1">
            <Avatar size="small" icon={<UserOutlined />} />
            Tungduong
        </Item>

        <Item key="2">
            <CalendarOutlined />
            Playlist
        </Item>

        <Item key="3">
            <AppstoreOutlined />
            Đã thích
        </Item>

        <Item>
            <SettingOutlined />
            Phổ biến
        </Item>

        <Item>
            <SettingOutlined />
            Thể loại
        </Item>
    </Menu>
)

export default LeftSider