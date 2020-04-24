import React from 'react'
import './RootLayout.css'
import Logo from './Logo.png'
import { Input, Col, Row, Layout, Avatar } from 'antd'
import { BellFilled, MessageFilled, MoreOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons'
import Home from './scenes/Home'

const { Header, Footer, Content } = Layout

console.log(window.innerWidth)

class RootLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowNotif: false,
            isShowInbox: false
        }
    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <Row style={{ fontWeight: 700 }} gutter={{ xs: 3, sm: 3, md: 7, lg: 7 }}>
                        <Col xs={3} sm={2} md={2} lg={1} xl={1}>
                            <div className="header-item"><img src={Logo} alt="Logo"/></div>
                        </Col>
                        <Col xs={6} sm={11} md={8} lg={11} xl={11}>
                            <Input 
                                className="search"
                                size="large" 
                                placeholder="Tìm kiếm" 
                                prefix={<SearchOutlined style={{ fontSize: '20px' }} />} 
                                onChange={(value) => console.log(value)}
                                onPressEnter={(value) => console.log(value)} />
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={2} xl={2}>
                            <div className="header-item">Trang chủ</div>
                        </Col>
                        <Col xs={0} sm={0} md={4} lg={3} xl={3}>
                            <div className="header-item">Đang theo dõi</div>
                        </Col>
                        <Col xs={9} sm={5} md={4} lg={3} xl={3}>
                            <div className="header-item">
                                <Avatar size="small" icon={<UserOutlined />} /> Tungduong
                            </div>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={1}>
                            <div style={{ fontSize: '30px' }}>|</div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={1}>
                            <div className="header-item"><MessageFilled style={{ fontSize: '20px' }} /></div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={1}>
                            <div className="header-item"><BellFilled style={{ fontSize: '20px' }} /></div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={1}>
                            <div className="header-item"><MoreOutlined rotate={90} style={{ fontSize: '20px' }} /></div>
                        </Col>
                    </Row>
                </Header>
                <Content className="content">
                    <Home />
                </Content>
                <Footer className="footer"></Footer>
            </Layout>
        )
    }
}

export default RootLayout