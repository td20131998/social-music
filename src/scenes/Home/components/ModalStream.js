import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "antd";
import socket from "common/socketio";
import { WebRtcPeer } from "kurento-utils";

const ModalStream = function ({ startOrEnd, followers, followings, userInfo }) {
  const [rtcStream, setRtcStream] = useState(
    new WebRtcPeer.WebRtcPeerSendrecv({
      localVideo: refVideo.current,
      onicecandidate: onIceCandidate,
    })
  );
  const refVideo = useRef();

  useEffect(() => {
    const offer = rtcStream.generateOffer();
    const streamInfo = {
      host: {
        id: userInfo._id,
        avatar: userInfo.avatar,
        username: userInfo.username,
        followers: followers.map((follower) => follower.username),
      },
      offer,
    };
    socket.emit("livestream", streamInfo);
  }, []);

  function onIceCandidate(candidate) {
    console.log("Local candidate: ", JSON.stringify(candidate));
    const candidateInfo = {
      id: userInfo._id,
      candidate,
    };
    socket.emit("icecandidate", candidateInfo);
  }

  return (
    <Modal
      visible={true}
      getContainer={false}
      onCancel={startOrEnd}
      onOk={startOrEnd}
    >
      <video ref={refVideo} style={{ width: "100%" }} controls />
      <Button>Capture</Button>
    </Modal>
  );
};

export default ModalStream;
