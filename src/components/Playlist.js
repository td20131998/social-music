import React, { useState } from "react";
import { connect } from "react-redux";
import {
  List,
  Empty,
  Input,
  Modal,
  Button,
  Popover,
  message,
} from "antd";
import styled from "styled-components";
import {
  addPlaylist,
  subPlaylist,
  editPlaylist,
} from "services/playlist/actions";
import {
  apiCreatePlaylist,
  apiRemovePlaylist,
  apiUpdatePlaylist,
} from "services/playlist/api";
import {
  PlusSquareOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Item } = List;

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

const CreateNewPlaylist = styled.div`
  .create-new-playlist {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 65px;
    margin-bottom: 15px;
  }
  .create-new-playlist:hover {
    cursor: pointer;
    background: #f0f2f5;
  }
`;

const Playlist = function ({ playlists, dispatch }) {
  const [mdCreatePlaylist, setMdCreatePlaylist] = useState(false);
  const [mdDeletePlaylistWarning, setMdDeletePlaylistWarning] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [isValidPlaylistName, setIsValidPlaylistName] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const [mdEditPlaylist, setMdEditPlaylist] = useState(false);

  function createNewPlaylist() {
    apiCreatePlaylist(playlistName).then((playlist) => {
      if (playlist && playlist._id) {
        message.success("Tạo playlist mới thành công");
        dispatch(addPlaylist(playlist));
      } else {
        message.error("Lỗi!");
      }
    });
    resetCreateNewPlaylist();
  }

  function deletePlaylist() {
    const { _id } = selectedPlaylist;
    apiRemovePlaylist(_id).then((playlist) => {
      if (playlist && playlist._id) {
        message.success("Xóa playlist thành công!");
        dispatch(subPlaylist(playlist._id));
      } else {
        message.error("Lỗi!");
      }
    });
    resetDeletePlaylist();
  }

  function updatePlaylist() {
    const { _id } = selectedPlaylist;
    apiUpdatePlaylist(_id, playlistName).then((playlist) => {
      if (playlist && playlist._id) {
        message.success("Đổi tên thành công!");
        dispatch(editPlaylist(playlist));
      } else {
        message.error("Lỗi!");
      }
    });
    resetEditPlaylist();
  }

  function resetDeletePlaylist() {
    setMdDeletePlaylistWarning(false);
    setSelectedPlaylist("");
  }

  function handleChangeCreatePlaylist(e) {
    let { value } = e.target;
    setIsValidPlaylistName(value.length > 0 ? true : false);
    setPlaylistName(value);
  }

  function handleChangeEditPlaylist(e) {
    let { value } = e.target;
    const { name } = selectedPlaylist;
    setIsValidPlaylistName(value.length > 0 && value !== name ? true : false);
    setPlaylistName(value);
  }
  
  function toggleMDCreatePlaylist() {
    setMdCreatePlaylist(!mdCreatePlaylist);
  }

  function resetCreateNewPlaylist() {
    setMdCreatePlaylist(false);
    setPlaylistName("");
    setIsValidPlaylistName(false);
  }

  function resetEditPlaylist() {
    setMdEditPlaylist(false);
    setPlaylistName("");
    setIsValidPlaylistName(false);
  }

  function toggleMDDeletePlaylist() {
    setMdDeletePlaylistWarning(!mdDeletePlaylistWarning);
  }

  return (
    <DivPlaylist>
      <CreateNewPlaylist>
        <span
          className="create-new-playlist bold"
          onClick={toggleMDCreatePlaylist}
        >
          <PlusSquareOutlined style={{ fontSize: "40px" }} />
          <span style={{ paddingLeft: "10px" }}>Playlist mới</span>
        </span>
      </CreateNewPlaylist>

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
                <Popover
                  className="playlist-more bold"
                  placement="bottomRight"
                  trigger="click"
                  content={
                    <MoreAction
                      deletePlaylistWarning={toggleMDDeletePlaylist}
                      editPlaylistModal={() =>
                        setMdEditPlaylist(!mdEditPlaylist)
                      }
                    />
                  }
                >
                  <MoreOutlined
                    rotate={90}
                    onClick={() => {
                      console.log(playlist._id);
                      setSelectedPlaylist(playlist);
                    }}
                  />
                </Popover>
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

      <Modal
        visible={mdCreatePlaylist}
        title={<h4 style={{ textAlign: "center" }}>Tạo Playlist</h4>}
        onCancel={toggleMDCreatePlaylist}
        footer={[
          <Button onClick={resetCreateNewPlaylist}>Hủy</Button>,
          <Button onClick={createNewPlaylist} disabled={!isValidPlaylistName}>
            Tạo
          </Button>,
        ]}
      >
        <div>
          <label>Tên</label>
          <Input
            value={playlistName}
            onChange={handleChangeCreatePlaylist}
            placeholder="Đặt tên cho playlist của bạn..."
            onPressEnter={createNewPlaylist}
          />
        </div>
      </Modal>

      <Modal
        visible={mdDeletePlaylistWarning}
        title="Xóa Playlist?"
        onCancel={toggleMDDeletePlaylist}
        footer={[
          <Button onClick={toggleMDDeletePlaylist}>Hủy</Button>,
          <Button onClick={deletePlaylist}>Xóa</Button>,
        ]}
      >
        Bạn có chắc muốn xóa Playlist này không?
      </Modal>

      <Modal
        visible={mdEditPlaylist}
        title="Chỉnh sửa"
        footer={[
          <Button onClick={resetEditPlaylist}>Hủy</Button>,
          <Button disabled={!isValidPlaylistName} onClick={updatePlaylist}>
            Lưu
          </Button>,
        ]}
      >
        <div>
          <label>Tên</label>
          <Input
            value={playlistName}
            onChange={handleChangeEditPlaylist}
            placeholder="Đổi tên cho playlist của bạn..."
            onPressEnter={updatePlaylist}
          />
        </div>
      </Modal>
    </DivPlaylist>
  );
};

const MoreActionDiv = styled.div`
  .more-action-item {
    width: 100%;
    padding: 10px 10px !important;
    font-weight: bold;
  }

  .more-action-item:hover {
    cursor: pointer;
    background-color: #f0f2f5;
  }

  .item-icon {
    font-size: 20px;
    padding-right: 10px;
  }
`;

const MoreAction = ({ deletePlaylistWarning, editPlaylistModal }) => (
  <MoreActionDiv>
    <div className="more-action-item" onClick={editPlaylistModal}>
      <EditOutlined className="item-icon" />
      Chỉnh sửa
    </div>
    <div className="more-action-item" onClick={deletePlaylistWarning}>
      <DeleteOutlined className="item-icon" />
      Xóa Playlist này
    </div>
  </MoreActionDiv>
);

export default connect((state) => ({ playlists: state.playlists }))(Playlist);
