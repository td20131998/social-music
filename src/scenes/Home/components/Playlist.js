import React from "react";
import Post from "../../../components/Post";
import { getPlaylistUser } from "../../../services/playlist/api";
import { connect } from "react-redux";
import { List, Avatar } from "antd";
import styled from 'styled-components'

const { Item } = List;

const DivPlaylist = styled.div`
    .ant-list {
        background: white;
        margin-bottom: 15px;
    }
`

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }
  componentDidMount() {
    getPlaylistUser().then((playlists) => {
      this.setState({ playlists: [...playlists] });
    });
  }

  render() {
    return (
      <DivPlaylist>
        {this.state.playlists.map((playlist) => (
          <List
            itemLayout="horizontal"
            dataSource={playlist.posts}
            header={<div>{playlist.name}</div>}
            bordered
            size='large'
            renderItem={(post) => (
                <Item>
                    <Item.Meta 
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{post.content}</a>}
                        description={post.user}
                    />
                </Item>
            )}
          />
        ))}
      </DivPlaylist>
    );
  }
}

export default connect((state) => console.log(state))(Playlist);
