import React, { useState, useEffect, useRef, forwardRef } from "react";
import styled from "styled-components";
import { Drawer, Row, Col, Avatar, List, message } from "antd";
import Comment from "components/Comment";
import getPublicImage from "common/getPublicImage";
import socket from "common/socketio";
import moment from "moment";
import { connect } from "react-redux";
import { WebRtcPeer } from "kurento-utils";
import { togglePlayerVisible } from "services/player/actions";

const FullscreenRecordLivestream = function ({
  visible,
  onClose,
  userInfo,
  host,
  stream,
  dispatch,
}) {
  const refComments = useRef();
  const refVideo = useRef();
  const [rtcViewer, setRtcViewer] = useState(null);

  useEffect(() => {
    if (visible && refVideo.current) {
      watchRecordLivestream(stream.src);
      refVideo.current.oncanplay = () => refVideo.current.play();

      socket.on("finish_record_livestream", () => {
        refVideo.current.pause();
      });
    }
  }, [visible]);

  useEffect(() => {
    if (visible && rtcViewer) {
      socket.on("ice_candidate_viewer_record", (candidate) => {
        console.log(candidate);
        rtcViewer.addIceCandidate(candidate);
      });
      socket.on("watch_record_stream_response", viewResponse);
    }
  }, [rtcViewer]);

  function viewResponse(mess) {
    if (mess.result !== "accepted") {
      message.error(`Watch livestream error: ${mess.error}`);
    } else {
      rtcViewer.processAnswer(mess.answer, (err) =>
        err ? console.log(err) : null//message.error(err) : null
      );
    }
  }
  function watchRecordLivestream(streamPath) {
    dispatch(togglePlayerVisible());
    if (refVideo.current) {
      console.log(refVideo.current);
      const options = {
        remoteVideo: refVideo.current,
        onicecandidate: onIceCandidateViewer,
        mediaConstraints: {
          audio: true,
          video: {
            width: 300,
            framerate: 30,
          },
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
              streamPath,
              offerSdp,
            };
            socket.emit("watch_record_livestream", viewerInfo);
          });
        })
      );
    }
  }

  function onIceCandidateViewer(candidate) {
    const candidateInfo = {
      id: userInfo._id,
      candidate,
    };
    socket.emit("icecandidate_viewer_record", candidateInfo);
  }

  function leaveLivestream() {
    if (rtcViewer) {
      rtcViewer.dispose();
      socket.emit("exit_player");
      onClose();
      dispatch(togglePlayerVisible());
    }
  }

  function scrollToLastest() {
    if (refComments.current) {
      console.log(refComments.current);
      window.scrollTo(0, refComments.current.offsetTop);
    }
  }

  return (
    <DivFullscreenLivestream>
      <Drawer
        title="Livestream"
        placement="right"
        visible={visible}
        getContainer={false}
        onClose={leaveLivestream}
        className="livestream-drawer"
      >
        <Row className="content-livestream">
          <Col xs={24} md={15} lg={17}>
            <video
              ref={refVideo}
              controls
              className="video-livestream"
              width="100%"
              height="100%"
            />
          </Col>
          <Col xs={0} md={9} lg={7}>
            <div className="communication-livestream">
              <div className="host-info">
                <Avatar
                  src={getPublicImage(host.avatar)}
                  size="large"
                  className="streamer-avatar"
                />
                <span style={{ marginLeft: "45px", display: "inline-block" }}>
                  <div>{host.fullName}</div>
                  <div>
                    {moment(new Date(stream.created_at)).fromNow()}
                  </div>
                </span>
              </div>

              <div className="comments">
                <List
                  className="list-comment"
                  itemLayout="horizontal"
                  dataSource={stream.comments}
                  // ref={refComments}
                >
                  {stream.comments
                    .sort((a, b) =>
                      moment(new Date(a.created_at)).isBefore(
                        new Date(b.created_at)
                      )
                        ? -1
                        : 1
                    )
                    .map((cmt) => (
                      <List.Item key={cmt._id}>
                        <Comment info={cmt} />
                      </List.Item>
                    ))}
                </List>
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
    position: relative;
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
  .streamer-avatar {
    position: absolute;
  }
`;

export default connect()(FullscreenRecordLivestream);
