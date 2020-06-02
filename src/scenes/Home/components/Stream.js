import React, { useState, useEffect, useRef } from "react";
import { Button, notification } from "antd";
import socket from "common/socketio";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import styled from "styled-components";

const Stream = function ({ userInfo }) {
  const [isStreaming, setIsStreaming] = useState(false);

  const refVideo = useRef();
  const refVideo2 = useRef();

  const [video, setVideo] = useState(null);
  const [video2, setVideo2] = useState(null);

  const [peer, setPeer] = useState(new Peer());

  useEffect(() => {
    if (refVideo.current && refVideo2.current) {
      setVideo(refVideo.current);
      setVideo2(refVideo2.current);
    }
  }, []);

  useEffect(() => {
    peer.on("open", (id) => {
      console.log(id)
      socket.emit("new peer", { userId: userInfo._id, peerId: id });

      socket.on("new stream", (hostInfo) => {
        const { peerId, hostId } = hostInfo;
        notification.info({
          placement: "topRight",
          message: `new stream from ${peerId}`,
          onClick: () => {
            console.log("play stream");
            socket.emit("watch stream", { hostId, watcherId: id });
          },
        });
      });
    });

    peer.on("call", (call) => {
      console.log("calling: ", call);
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      }).then(stream => {
        call.answer(stream)
        
        call.on("stream", (remoteStream) => {
          console.log("streaming");
          refVideo2.current.srcObject = remoteStream;
          refVideo2.current.play();
        });
      })
    });      
  }, [peer])

  async function gotStream(stream) {
    console.log("Received local stream");
    video.srcObject = stream;
    video.play();
    window.localStream = stream;

    socket.emit("new stream", {
      hostId: userInfo._id,
      peerId: peer.id,
      // followers: userInfo.followers,
      followers: [`linhbui98`],
    });

    socket.on("request host call", (watcherId) => {
      console.log("request host call: ", watcherId);
      peer.call(watcherId, stream);
    });
  }

  function start() {
    console.log("Requesting local stream");
    setIsStreaming(true);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(gotStream)
      .catch((e) => console.log("getUserMedia() error: ", e));
  }

  return (
    <>
      <video
        ref={refVideo}
        width="300"
        controls
        style={{ display: isStreaming ? "block" : "none" }}
      />
      <Button onClick={start}>Connect</Button>

      <video ref={refVideo2} controls width="300" />
    </>
  );
};

export default connect((state) => ({ userInfo: state.user.info }))(Stream);
