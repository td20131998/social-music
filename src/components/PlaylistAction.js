import React from "react";
import { Modal, List, Button, Empty, Divider, Input, message } from "antd";
import { SaveOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addPostToPlaylist } from "services/playlist/actions";
import styled from "styled-components";
import { addPlaylist } from 'services/playlist/actions'
import { apiCreatePlaylist } from 'services/playlist/api'

const { Item } = List;

const CreateNewPlaylist = styled.div`
  .create-new-playlist {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 65px;
  }
  .create-new-playlist:hover {
    cursor: pointer;
    background: #f0f2f5;
  }
`;

class PlaylistAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isCreateNew: false,
      playlistName: "",
      isValidPlaylistName: false,
    };

    this.showPlaylist = this.showPlaylist.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.saveToPlaylist = this.saveToPlaylist.bind(this);
    this.isCreatePlaylist = this.isCreatePlaylist.bind(this);
    this.handleChangeCreatePlaylist = this.handleChangeCreatePlaylist.bind(
      this
    );
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.resetCreateNewPlaylist = this.resetCreateNewPlaylist.bind(this);
  }

  onCancel() {
    this.setState({
      visible: false,
      playlists: [],
      isCreateNew: false,
      playlistName: ''
    });
  }

  showPlaylist() {
    this.setState({ visible: true });
  }

  saveToPlaylist(playlistId) {
    const { postId } = this.props;
    this.props.dispatch(addPostToPlaylist(postId, playlistId));
  }

  isCreatePlaylist() {
    this.setState({ isCreateNew: true });
  }

  handleChangeCreatePlaylist(e) {
    e.preventDefault();
    let { value } = e.target
    this.setState({ playlistName: value, isValidPlaylistName: value.length < 1 ? false : true });
  }

  createNewPlaylist() {
    const { dispatch } = this.props
    apiCreatePlaylist(this.state.playlistName)
      .then(playlist => {
        if (playlist && playlist._id) {
          message.success("Tạo playlist thành công!")
          dispatch(addPlaylist(playlist))
        } else {
          message.error("Lỗi!")
        }
      })
    this.resetCreateNewPlaylist()
  }

  resetCreateNewPlaylist() {
    this.setState({ isCreateNew: false, playlistName: "", isValidPlaylistName: false });
  }

  render() {
    return (
      <>
        <SaveOutlined onClick={this.showPlaylist} />
        <span className="count">{this.props.playlists.length}</span>
        <Modal
          visible={this.state.visible}
          title={<h4 style={{ textAlign: "center" }}>Lưu vào</h4>}
          onCancel={this.onCancel}
          footer={
            this.state.isCreateNew
              ? [
                  <Button onClick={this.resetCreateNewPlaylist}>
                    Hủy
                  </Button>,
                  <Button
                    onClick={this.createNewPlaylist}
                    disabled={!this.state.isValidPlaylistName}
                  >
                    Tạo
                  </Button>,
                ]
              : [<Button onClick={this.onCancel}>Xong</Button>]
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={this.props.playlists}
            renderItem={(playlist) => (
              <Item onClick={() => this.saveToPlaylist(playlist._id)}>
                <h3 style={{ float: "left" }}>{playlist.name}</h3>
                <h3 style={{ float: "right" }}>{playlist.posts.length}</h3>
              </Item>
            )}
          >
            {this.props.playlists.length < 1 ? <Empty /> : null}
            <CreateNewPlaylist>
              <Divider />
              {this.state.isCreateNew ? (
                <>
                  <label>Tên</label>
                  <Input
                    onChange={this.handleChangeCreatePlaylist}
                    placeholder="Đặt tên cho playlist của bạn..."
                    onPressEnter={this.createNewPlaylist}
                  />
                </>
              ) : (
                <span
                  className="create-new-playlist"
                  onClick={this.isCreatePlaylist}
                >
                  <PlusSquareOutlined style={{ fontSize: "40px" }} />
                  <span style={{ paddingLeft: "10px" }}>Playlist mới</span>
                </span>
              )}
            </CreateNewPlaylist>
          </List>
        </Modal>
      </>
    );
  }
}

export default connect((state) => ({ playlists: state.playlists }))(
  PlaylistAction
);
