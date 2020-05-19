import React from "react";
import { Modal, List } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addPostToPlaylist } from "services/playlist/actions";

const { Item } = List;

class PlaylistAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.showPlaylist = this.showPlaylist.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.saveToPlaylist = this.saveToPlaylist.bind(this)
  }

  onCancel() {
    this.setState({
      visible: false,
      playlists: [],
    });
  }

  showPlaylist() {
    this.setState({ visible: true });
  }

  saveToPlaylist(playlistId) {
    const { postId } = this.props
    this.props.dispatch(addPostToPlaylist(postId, playlistId))
  }

  render() {
    return (
      <>
        <SaveOutlined onClick={this.showPlaylist} />
        <span className="count">{this.props.playlists.length}</span>
        <Modal
          visible={this.state.visible}
          title="Playlist"
          onOk={this.onCancel}
          onCancel={this.onCancel}
          footer={null}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.props.playlists}
            renderItem={(playlist) => (
              <Item onClick={() => this.saveToPlaylist(playlist._id)}>
                <h3 style={{ float: "left" }}>{playlist.name}</h3>
                <h3 style={{ float: "right" }}>{playlist.countSong}</h3>
              </Item>
            )}
          />
        </Modal>
      </>
    );
  }
}

export default connect(state => ({ playlists: state.playlists }))(PlaylistAction);
