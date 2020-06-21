import React, { useState, useEffect, useRef, forwardRef } from "react";
import styled from "styled-components";
import {
  Drawer,
  Row,
  Col,
  Avatar,
  Input,
  List,
  notification,
  message,
} from "antd";
import Comment from "components/Comment";
import getPublicImage from "common/getPublicImage";
import socket from "common/socketio";
import moment from "moment";
import { connect } from "react-redux";
import { WebRtcPeer } from "kurento-utils";
import { togglePlayerVisible } from "services/player/actions";

const ListCustomize = React.forwardRef((props, ref) => {
  return <List {...props} ref={ref} />;
});
const FullscreenLivestream = function ({
  visible,
  onClose,
  refStreaming,
  userInfo,
  host,
  dispatch,
}) {
  const [rtcViewer, setRtcViewer] = useState(null);
  const refVideo = useRef();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const refComments = useRef();

  useEffect(() => {
    socket.on("user_join_stream", (username) => {
      notification.info({
        placement: "topRight",
        message: `${username} đang xem!`,
      });
      socket.emit("");
    });
    socket.on("more_comments", (moreComments) => {
      const parseComments = moreComments
        .map((cmt) => JSON.parse(cmt))
        .sort((a, b) =>
          moment(new Date(a.created_at)).isBefore(new Date(b.created_at))
            ? -1
            : 1
        );
      setComments([...parseComments, ...comments]);
    });
  }, []);
  useEffect(() => {
    socket.on("receive_comment_from_user", (info) => {
      setComments([...comments, info]);
      scrollToLastest();
    });
    if (refComments.current) {
      // console.log(refComments.current);
    }
  }, [comments]);

  useEffect(() => {}, [refComments]);

  function scrollToLastest() {
    if (refComments.current) {
      console.log(refComments.current);
      window.scrollTo(0, refComments.current.offsetTop);
    }
  }

  function handleChangeComment(e) {
    e.preventDefault();
    setCommentText(e.target.value);
  }

  function handleSubmitComment(e) {
    e.preventDefault();
    const comment = {
      host,
      info: {
        created_at: new Date(),
        user: userInfo,
        content: commentText,
      },
    };
    socket.emit("send_comment_to_livestream", comment);
    setComments([...comments, comment.info]);
    setCommentText("");
    scrollToLastest();
  }

  function closeAndResetComment() {
    onClose();
    setComments([]);
  }

  useEffect(() => {
    if (visible && rtcViewer) {
      socket.on("ice_candidate_viewer", (candidate) => {
        rtcViewer.addIceCandidate(candidate);
      });
      socket.on("watch_stream_response", viewResponse);
    }
  }, [rtcViewer]);

  useEffect(() => {
    if (visible && refVideo.current) {
      watchLivestream(host);
      refVideo.current.oncanplay = () => refVideo.current.play();
    }
  }, [visible]);

  function viewResponse(mess) {
    if (mess.result !== "accepted") {
      message.error(`Watch livestream error: ${mess.error}`);
    } else {
      rtcViewer.processAnswer(mess.answer, (err) =>
        err ? message.error(err) : null
      );
    }
  }

  function watchLivestream(host) {
    dispatch(togglePlayerVisible());
    const options = {
      remoteVideo: refVideo.current,
      onicecandidate: onIceCandidateViewer,
      mediaConstraints: {
        audio: true,
        video: {
          mandatory: {
            maxWidth: 1024,
            maxHeight: 768,
            minWidth: 1024,
            minHeight: 768,
          },
        },
        // video: {
        //   width: 300,

        //   framerate: 30,
        // },
      },
    };
    setRtcViewer(
      new WebRtcPeer.WebRtcPeerRecvonly(options, function (err) {
        if (err) message.error(err);

        this.generateOffer(function (error, offerSdp) {
          if (error) message.error(error);
          const viewerInfo = {
            viewer: {
              id: userInfo._id,
              username: userInfo.username,
            },
            hostId: host.hostId,
            offerSdp,
          };
          socket.emit("watch_livestream", viewerInfo);
        });
      })
    );
  }

  function onIceCandidateViewer(candidate) {
    const candidateInfo = {
      id: userInfo._id,
      candidate,
    };
    socket.emit("icecandidate_viewer", candidateInfo);
  }

  function leaveLivestream() {
    if (rtcViewer) {
      rtcViewer.dispose();
      onClose();
      dispatch(togglePlayerVisible());
    }
  }
  return (
    <DivFullscreenLivestream>
      <Drawer
        title="Livestream"
        placement="right"
        visible={visible}
        getContainer={false}
        onClose={closeAndResetComment}
        className="livestream-drawer"
      >
        <Row className="content-livestream">
          <Col xs={24} md={15} lg={17}>
            <video
              ref={refStreaming ? refStreaming : refVideo}
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
                  className="list-comment"
                  itemLayout="horizontal"
                  dataSource={comments}
                  // ref={refComments}
                >
                  {comments.map((cmt) => (
                    <List.Item key={`${cmt.created_at}-${cmt.user.username}`}>
                      <Comment info={cmt} />
                    </List.Item>
                  ))}
                </List>
                <div className="write-comment">
                  <Input.TextArea
                    value={commentText}
                    placeholder="Bình luận"
                    autoSize={true}
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

  .ant-list-item {
    padding: 10px 10px;
  }
  .list-comment {
    height: 550px;
    width: 100%;
    overflow: auto;
  }
`;

export default connect()(FullscreenLivestream);
