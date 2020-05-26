import React, { useState } from "react";
import { Popover, Modal, Button } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const MoreAction = ({ playlistId, openModal }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Popover
        visible={!showModal}
        className="playlist-more bold"
        placement="bottomRight"
        destroyTooltipOnHide={true}
        trigger="click"
        content={
          <MoreActionContent
            onClick={(e) => e.stopPropagation()}
            deletePlaylistWarning={() => {
              setShowPopover(false);
              setShowModal(true);
            }}
          />
        }
      >
        <MoreOutlined rotate={90} />
      </Popover>

      <Modal
        visible={showModal}
        title="Xóa Playlist?"
        content="Bạn có chắc muốn xóa Playlist này không?"
        onCancel={() => setShowModal(false)}
        footer={[
          <Button onClick={() => setShowModal(false)}>Hủy</Button>,
          <Button onClick={() => console.log("xoa")}>Tạo</Button>,
        ]}
      />
    </>
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

const MoreActionContent = ({ deletePlaylistWarning }) => (
  <MoreActionDiv>
    <div className="more-action-item">
      <EditOutlined className="item-icon" />
      Chỉnh sửa
    </div>
    <div className="more-action-item" onClick={deletePlaylistWarning}>
      <DeleteOutlined className="item-icon" />
      Xóa Playlist này
    </div>
  </MoreActionDiv>
);
