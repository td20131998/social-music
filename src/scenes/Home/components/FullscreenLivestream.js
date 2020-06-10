import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Drawer, Row, Col, Avatar, Input, List } from "antd";
import Comment from "components/Comment";
import getPublicImage from "common/getPublicImage";
import socket from "common/socketio";

const FullscreenLivestream = function ({
  visible,
  onClose,
  refStreaming,
  userInfo,
  host
}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    socket.on("receive_comment_from_user", info => {
      console.log('receive_comment_from_user')
      setComments([...comments, info])
    })
  }, [])

  function handleChangeComment(e) {
    e.preventDefault();
    setCommentText(e.target.value);
  }

  function handleSubmitComment() {
    const comment = {
      host,
      info: {
        created_at: new Date(),
        user: userInfo,
        content: commentText,
      },
    };
    socket.emit("send_comment_to_livestream", comment);
    setComments([...comments, comment.info])
    setCommentText("")
  }

  return (
    <DivFullscreenLivestream>
      <Drawer
        title="Livestream"
        placement="right"
        visible={visible}
        getContainer={false}
        onClose={onClose}
        className="livestream-drawer"
      >
        <Row className="content-livestream">
          <Col xs={24} md={15} lg={17}>
            <video
              ref={refStreaming}
              controls
              className="video-livestream"
              width="100%"
              height="100%"
            />
          </Col>
          <Col xs={0} md={9} lg={7}>
            <div className="communication-livestream">
              <div className="host-info">
                <Avatar src={getPublicImage(host.avatar)} size="large" />
                <span style={{ paddingLeft: "5px" }}>{host.fullName}</span>
              </div>

              <div className="comments">
                <List
                  itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={(cmt) => (
                    <List.Item>
                      <Comment info={cmt} />
                    </List.Item>
                  )}
                />

                <div className="write-comment">
                  <Input.TextArea
                    value={commentText}
                    placeholder="Bình luận"
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    onChange={handleChangeComment}
                    onPressEnter={handleSubmitComment}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Drawer>
    </DivFullscreenLivestream>
  );
};

const DivFullscreenLivestream = styled.div`
  position: relative;
  overflow: hidden;

  .content-livestream {
    height: 100%;
  }

  .ant-drawer-content-wrapper {
    width: 100% !important;
    height: 100% !important;
  }

  .ant-drawer-body {
    padding: 0;
    // display: flex;
  }
  .communication-livestream {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .video-livestream {
    width: ${(props) => props.w};
    height: ${(props) => props.h};
    background-color: black;
  }
  .host-info {
    padding: 5px 10px;
    display: inline-block;
    height: 10%;
  }
  .comments {
    position: relative;
    height: 90%;
  }
  .write-comment {
    position: absolute;
    bottom: 10px;
    padding: 0 10px;
    width: 100%;
  }
`;

export default FullscreenLivestream;
