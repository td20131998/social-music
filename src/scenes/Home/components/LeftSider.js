import React from 'react'
import { Menu } from 'antd';
import { 
    CloudUploadOutlined,
    PlayCircleOutlined,
    HeartOutlined,
    NodeIndexOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const { Item } = Menu;

const DivLeftSider = styled.div`
    .left-sider {
        position: fixed;
    }

    @media only screen and (min-width: 768px) {
        .left-sider {
            width: 125px;
            margin-left: 0;
        }
        .ant-menu-item {
            padding-left: 6px !important;
        }
    }

    @media only screen and (min-width: 992px) {
    .left-sider {
        width: 140px;
        margin-left: 18px;
    }

    .ant-menu-item {
        padding-left: 16px !important;
    }
    }

    @media only screen and (min-width: 1200px) {
        .left-sider {
            width: 180px;
            margin-left: 40px;
        }

        .ant-menu-item {
            padding-left: 24px !important;
        }
    }

`
const LeftSider = () => (
    <DivLeftSider>
        <Menu
            className="left-sider"
            defaultSelectedKeys={['1']}
            mode="inline"
        >
            <Item key="1">
                <Link to="/upload">
                    <CloudUploadOutlined />
                    Upload
                </Link>
            </Item>

            <Item key="2">
                <Link to='/playlist'>
                    <PlayCircleOutlined />
                    Playlist
                </Link>
            </Item>

            <Item key="3">
                <Link to='/liked'>
                    <HeartOutlined />
                    Đã thích
                </Link>
            </Item>

            <Item key="4">
                <Link to='/popular'>
                <NodeIndexOutlined />
                    Phổ biến
                </Link>
            </Item>

            <Item>
                <Link to='/category'>
                    <SettingOutlined />
                    Thể loại
                </Link>
            </Item>
        </Menu>
    </DivLeftSider>
)

export default LeftSider