import React from 'react'
import { Menu, Avatar } from 'antd';
import { 
    UserOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import './styles.css'

const { Item } = Menu;

const LeftSider = () => (
    <Menu
        className="left-sider"
        defaultSelectedKeys={['1']}
        mode="inline"
    >
        {/* <Item key="1">
            <Link to="/username">
                <Avatar size="small" icon={<UserOutlined />} />
                Tungduong
            </Link>
        </Item> */}

        <Item key="2">
            <Link to="/playlist">
                <CalendarOutlined />
                Playlist
            </Link>
        </Item>

        <Item key="3">
            <Link to="/liked">
                <AppstoreOutlined />
                Đã thích
            </Link>
        </Item>

        <Item key="4">
            <Link to="/popular">
                <SettingOutlined />
                Phổ biến
            </Link>
        </Item>

        <Item>
            <Link to="/category">
                <SettingOutlined />
                Thể loại
            </Link>
        </Item>
    </Menu>
)

export default LeftSider