import React from 'react'
import { Col, Row } from 'antd'
import { Route } from 'react-router-dom'
import Playlist from './components/Playlist'
import LikedList from './components/LikedList'
import Category from './components/Category'
import PopularList from './components/PopularList'
import PostList from './components/PostList'
import LeftSider from './components/LeftSider'
import RightSider from './components/RightSider'
import styled from 'styled-components'

const DivHome = styled.div`
    margin-top: 10px;
`

const Home = () => (
    <DivHome>
        <Row>
            <Col xs={0} md={4} lg={4} xl={5} className="home-left">
                <LeftSider />
            </Col>

            <Col xs={24} md={15} lg={15} xl={14} className="home-content">
                <Route exact path='/' component={PostList} />

                <Route path='/playlist' component={Playlist} />

                <Route path='/liked' component={LikedList} />

                <Route path='/popular' component={PopularList} />

                <Route path='/category' component={Category} />
            </Col>
            
            <Col xs={0} md={5} lg={5} xl={5} className="home-right">
                <RightSider />
            </Col>
            {/* <InfiniteScroll loadData={this.loadPost} component={Post} /> */}
        </Row>
    </DivHome>
)

export default Home