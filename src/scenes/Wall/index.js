import React from 'react'
import { Row, Col, Card } from 'antd'
import styled from 'styled-components'
// import { Switch, Link } from 'react-router-dom'

const src = 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t31.0-8/p960x960/13147774_570853576409733_2111768662841229037_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_ohc=b44Zkcjn-xUAX_Daox-&_nc_ht=scontent.fsgn2-3.fna&_nc_tp=6&oh=09c2e2ae20e9bebfb73bd777af61ba2e&oe=5ECEE726'
const DivWall = styled.div`
    .wall-cover {
        width: 50%;
    }
`
const Wall = () => (
    <DivWall>
        <Row justify='center'>
            <Card
                hoverable
                className='wall-cover'
                cover={<img alt='cover_username' src={src} />}
            >

            </Card>
        </Row>
        <Row className='wall-center'>
            <Col lg={2}></Col>
            <Col lg={20}>
                <Row>
                    <Col>
                        Top list
                    </Col>
                    <Col>
                        Playlist
                    </Col>
                </Row>
            </Col>
            <Col lg={2}></Col>
        </Row>
    </DivWall>
)

export default Wall