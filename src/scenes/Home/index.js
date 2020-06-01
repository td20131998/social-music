import React from "react";
import { Col, Row } from "antd";
import { Route } from "react-router-dom";
import OwnPlaylist from "components/Playlist";
import LikedList from "./components/LikedList";
import Category from "./components/Category";
import PopularList from "./components/PopularList";
import PostList from "components/PostList";
import LeftSider from "./components/LeftSider";
import RightSider from "./components/RightSider";
import Upload from "./components/Upload";
import Stream from './components/Stream'
import styled from "styled-components";
import { apiGetListPost } from 'services/post/api'

const DivHome = styled.div`
  margin-top: 10px;
  .home-content {
    background-color: #ffffff;
    margin-top: 8px;
  }
`;

const Home = function () {
  return (
    <DivHome>
      <Row gutter={[32, 16]}>
        <Col xs={0} md={4} lg={4} xl={5} className="home-left">
          <LeftSider />
        </Col>

        <Col xs={24} md={15} lg={15} xl={14} className="home-content">
          <Route exact path="/discover">
            <PostList getListPost={apiGetListPost} />
          </Route>

          <Route path="/discover/upload" component={Upload} />
          
          <Route path="/discover/stream" component={Stream} />

          <Route path="/discover/playlist" component={OwnPlaylist} />

          <Route path="/discover/liked" component={LikedList} />

          <Route path="/discover/popular" component={PopularList} />

          <Route path="/discover/category" component={Category} />
        </Col>

        <Col xs={0} md={5} lg={5} xl={5} className="home-right">
          <RightSider />
        </Col>
        {/* <InfiniteScroll loadData={this.loadPost} component={Post} /> */}
      </Row>
    </DivHome>
  );
};

export default Home;
