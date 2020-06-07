import React, { useState, useEffect, useRef } from "react";
import { Button, notification, Modal, message } from "antd";
import socket from "common/socketio";
import Peer from "peerjs";
import { connect } from "react-redux";
import { apiGetFollowersOf, apiGetFollowingsOf } from "services/follow/api";
import MyVideo from "components/MyVideo";
import { WebRtcPeer } from "kurento-utils";
import ModalStream from "./ModalStream";

const Stream = function ({ userInfo }) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [rtcStream, setRtcStream] = useState(null);
  const [rtcViewer, setRtcViewer] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const refVideo = useRef();
  const refVideo2 = useRef();
  useEffect(() => {
    const { _id } = userInfo;
    // if (refVideo.current && refVideo2.current) {
    //   setVideo(refVideo.current);
    //   setVideo2(refVideo2.current);
    // }
    apiGetFollowersOf(_id).then((followers) => {
      setFollowers(followers.map((follower) => follower.user));
    });

    apiGetFollowingsOf(_id).then((followings) => {
      setFollowings(followings.map((following) => following.follower));
    });
    socket.on("new_livestream", ({ host, streamId }) => {
      notification.info({
        placement: "topRight",
        message: `${host.username} vừa bắt đầu buổi livestream!`,
        onClick: () => {
          console.log("play stream");
          // socket.emit("watch stream",);
          viewer(host.id)
        },
      })
    })
  }, []);

  useEffect(() => {
    console.log(rtcStream)
    if (rtcStream) {
      socket.on("ice_candidate_streamer", (candidate) => {
        console.log("add candidate streamer: ", candidate)
        rtcStream.addIceCandidate(candidate);
      });
  
      socket.on("stream_response", streamResponse);
    }
  }, [rtcStream]);

  useEffect(() => {
    if (rtcViewer) {
      socket.on("ice_candidate_viewer", (candidate) => {
        console.log("add candidate viewer: ", candidate)
        rtcViewer.addIceCandidate(candidate);
      });
      socket.on("watch_stream_response", viewResponse);
      socket.on("end_livestream", ({ host, streamId }) => {
        notification.info({
          placement: "topRight",
          message: `${host.username} đã kết thúc buổi livestream!`
        })
        rtcViewer.dispose()
      })
    }
  }, [rtcViewer]);

  function streamResponse(mess) {
    if (mess.result !== "accepted") {
      message.error(`Create livestream error: ${mess.error}`);
    } else {
      rtcStream.processAnswer(mess.answer, err => err ? message.error(err) : null);
    }
  }

  function viewResponse(mess) {
    if (mess.result !== "accepted") {
      message.error(`Watch livestream error: ${mess.error}`)
    } else {
      rtcViewer.processAnswer(mess.answer, err => err ? message.error(err) : null)
    }
  }

  function stopStreaming() {
    console.log("stop stream");
  }

  function startLivestream() {
    setIsStreaming(true);
    const options = {
      localVideo: refVideo.current,
      onicecandidate: onIceCandidateStreamer,
    };
    setRtcStream(new WebRtcPeer.WebRtcPeerSendrecv(options, function(err) {
        if (err) message.error(err)
        this.generateOffer(function(error, offerSdp) {
            if (error) console.log(error)
            const streamInfo = {
              host: {
                id: userInfo._id,
                avatar: userInfo.avatar,
                username: userInfo.username,
                followers: followers.map((follower) => follower.username),
              },
              offerSdp
            }
            socket.emit("livestream", streamInfo)
        });
    }));
  }

  function viewer(hostId) {
    const options = {
      remoteVideo: refVideo2.current,
      onicecandidate: onIceCandidateViewer,
    };
    setRtcViewer(
      new WebRtcPeer.WebRtcPeerRecvonly(options, function (err) {
        if (err) message.error(err)
        this.generateOffer(function (error, offerSdp) {
          if (error) console.log(error);
          const viewerInfo = {
            viewer: {
              id: userInfo._id,
              username: userInfo.username,
            },
            hostId,
            offerSdp,
          }
          socket.emit("view_livestream", viewerInfo);
        });
      })
    );
  }
  function onIceCandidateStreamer(candidate) {
    const candidateInfo = {
      id: userInfo._id,
      candidate,
    };
    socket.emit("icecandidate_streamer", candidateInfo);
  }

  function onIceCandidateViewer(candidate) {
    const candidateInfo = {
      id: userInfo._id,
      candidate
    }
    socket.emit("icecandidate_viewer", candidateInfo)
  }

  function endLivestream() {
    if (rtcStream) {
      const host = userInfo
      socket.emit("end_livestream", host)
      rtcStream.dispose()
      setRtcStream(null)
      setIsStreaming(false)
    }
  }
  return (
    <>
      <Button onClick={startLivestream}>Connect</Button>
      <Modal
        visible={isStreaming}
        getContainer={false}
        onCancel={endLivestream}
        onOk={endLivestream}
      >
        <video ref={refVideo} style={{ width: "100%" }} controls />
        <Button>Capture</Button>
      </Modal>

      <video ref={refVideo2} controls></video>
      {/* <Button onClick={viewer}>Viewer</Button> */}
    </>
  );
};

export default connect((state) => ({ userInfo: state.user.info }))(Stream);
