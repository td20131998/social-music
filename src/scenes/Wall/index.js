import React from 'react'
import { Row, Col, Card, Button, Space, Avatar, Tabs } from 'antd'
import styled from 'styled-components'
// import { Switch, Link } from 'react-router-dom'

const { Meta } = Card
const { TabPane } = Tabs

const src = 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t31.0-8/p960x960/13147774_570853576409733_2111768662841229037_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_ohc=b44Zkcjn-xUAX_Daox-&_nc_ht=scontent.fsgn2-3.fna&_nc_tp=6&oh=09c2e2ae20e9bebfb73bd777af61ba2e&oe=5ECEE726'
const DivWall = styled.div`
    .wall-cover {
        width: 70%;
    }
    .img-cover {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    .ant-card-meta {
        margin: -70px 0;
    }
    .wall-content {
        margin-top: 10px;
    }
    .row {
        display: flex;
        flex-wrap: wrap;
    }
    .column-left {
        flex: 4;
        margin-right: 10px;
        max-width: 40%;
        height: 300px;
        background-color: white;
        padding-left: 10px;
        padding-top: 10px;
    }
    .column-right {
        flex: 6;
        max-width: 60%;
        background-color: white;
    }
    @media (max-width: 991px) {
        .column-left {
            flex: 100%;
            max-width: 100%;
            margin-right: 0;
        }
        .column-right {
            flex: 100%;
            max-width: 100%;
        }
    }
`
const Wall = () => (
    <DivWall>
        <Row justify='center' className='aaa'>
            <Card
                className='wall-cover'
                cover={<img className='img-cover' alt='cover_username' src={src} />}
            >
                <Row justify='center' style={{ marginTop: '-80px' }}>
                    <div style={{ width: '200px', textAlign: 'center' }}>
                        <Avatar 
                            src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8" 
                            size={100} 
                            style={{ border: '3px solid white'}} 
                        />
                        <div>Nguyen Tung Duong</div>
                    </div>
                </Row>
                <Space style={{ fontSize: '40px', float: 'right', color: '#595959'}}>
                    <Button>Follow</Button>
                    <Button>Inbox</Button>
                    <Button>More</Button>
                    {/* <MailOutlined />
                    <MoreOutlined style={{ border: '3px solid #595959', fontSize: '30px' }} rotate={90}/> */}
                </Space>
            </Card>
        </Row>
        <Row className='wall-content' justify='center'>
            <div style={{ width: '70%' }}>
                <div className='row'>
                    <div className='column-left'>
                        <div>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Avatar 
                                        shape='square'
                                        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8" 
                                        size={64} 
                                    />
                                    <div>Duong</div>
                                </Col>
                                <Col span={6}>
                                    <Avatar 
                                        shape='square'
                                        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8" 
                                        size={64} 
                                    />
                                        <div>Duong</div>
                                </Col>
                                <Col span={6}>
                                    <Avatar 
                                        shape='square'
                                        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8" 
                                        size={64} 
                                    />
                                    <div>Duong</div>
                                </Col>
                                <Col span={6}>
                                    <Avatar 
                                        shape='square'
                                        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/59477702_1187895581372193_6129036636266168320_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=UbaRZ-PuDeoAX-HoEGM&_nc_ht=scontent.fsgn2-4.fna&oh=a3430a2a6f2e943dfa3a1e030044fa4f&oe=5EC9E9E8" 
                                        size={64} 
                                    />
                                    <div>Duong</div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row gutter={16}>
                                <Col span={8}>User 1</Col>
                                <Col span={8}>User 2</Col>
                                <Col span={8}>User 3</Col>
                                <Col span={8}>User 4</Col>
                            </Row>
                        </div>
                    </div>
                    <div className='column-right'>
                        <Tabs defaultActiveKey='1' type='card' size='large'>
                            <TabPane tab='All' key='1'>
                                {/* <PostList /> */}
                            </TabPane>

                            <TabPane tab='Liked' key='2'>
                                {/* <PostList /> */}
                            </TabPane>

                            <TabPane tab='Playlist' key='3'>
                                {/* <PostList /> */}
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Row>
    </DivWall>
)

export default Wall