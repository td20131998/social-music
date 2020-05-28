import React, { useState } from "react";
import { connect } from "react-redux";
import {
  List,
  Empty,
} from "antd";
import styled from "styled-components";
const { Item } = List;

const OtherPlaylist = function ({ playlists }) {
  
  return (
    <DivPlaylist>
      {playlists.length < 1 ? (
        <Empty />
      ) : (
        playlists.map((playlist) => (
          <List
            key={playlist._id}
            itemLayout="horizontal"
            dataSource={playlist.posts}
            header={
              <>
                <span className="bold">{playlist.name}</span>
              </>
            }
            bordered
            size="large"
            renderItem={(post) => (
              <Item className="post">
                <span className="post-author inline">{post.user.username}</span>
                <span className="divider inline">{`  -  `}</span>
                <span className="post-description inline">
                  {post.description}
                </span>
                <span className="divider inline">{`  -  `}</span>
                <span className="post-name inline">{post.name}</span>
                <span className="post-views inline right">1M</span>
              </Item>
            )}
          />
        ))
      )}

    </DivPlaylist>
  );
};

const DivPlaylist = styled.div`
  .bold {
    font-weight: bold;
  }
  .right {
    float: right;
  }
  .ant-list {
    background-color: #7e7b87;

    margin-bottom: 15px;
  }
  .ant-list-header {
    padding-top: 10px !important;
  }

  .playlist-more {
    height: 30px;
    width: 30px;
    float: right;
    border-radius: 30px;
    padding-top: 8px;
    .ant-popover-inner-content {
      padding: 5px 5px !important;
    }
  }

  .playlist-more:hover {
    cursor: pointer;
    background: #f0f2f5;
  }

  .post {
    display: block;
  }
  .post:hover {
    cursor: pointer;
    background-color: ;
  }
  .inline {
    display: inline;
  }
  .post-author {
    color: #e8e9e5;
  }
  .post-description, .divider, .post-name {
    color: #fffae7;
  }
`;

export default OtherPlaylist;
