import React, { useState, useEffect, useRef } from "react";
import { Button, notification, Modal } from "antd";
import socket from "common/socketio";
import Peer from "peerjs";
import { connect } from "react-redux";
import { apiGetFollowersOf, apiGetFollowingsOf } from "services/follow/api";
import MyVideo from "components/MyVideo";

const Stream = function ({ userInfo }) {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streams, setStreams] = useState([]);

  const refVideo = useRef();
  const refVideo2 = useRef();

  const [video, setVideo] = useState(null);
  const [video2, setVideo2] = useState(null);

  const [peer, setPeer] = useState(new Peer());

  useEffect(() => {
    const { _id } = userInfo;
    if (refVideo.current && refVideo2.current) {
      setVideo(refVideo.current);
      setVideo2(refVideo2.current);
    }
    apiGetFollowersOf(_id).then((followers) => {
      setFollowers(followers.map((follower) => follower.user));
    });

    apiGetFollowingsOf(_id).then((followings) => {
      setFollowings(followings.map((following) => following.follower));
    });
  }, []);

  useEffect(() => {
    const userId = userInfo._id
    peer.on("open", (id) => {
      console.log(id);
      socket.emit("new peer", { userId, peerId: id });

      socket.on("new stream", (hostInfo) => {
        console.log("new stream")
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

    socket.emit("list livestream", followings.map(following => following.username));

    socket.on("list livestream", (streamings) => {
      console.log(streamings);
      setStreams(streamings);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          console.log("streaming")
          call.answer(stream);

          call.on("stream", (remoteStream) => {
            console.log("streaming");
            refVideo2.current.srcObject = remoteStream;
            refVideo2.current.play();
          });
        });
    });
  }, [peer]);

  async function gotStream(stream) {
    console.log("Received local stream");
    video.srcObject = stream;
    video.play();
    window.localStream = stream;

    socket.emit("new stream", {
      peerId: peer.id,
      host: {
        id: userInfo._id,
        avatar: userInfo.avatar,
        username: userInfo.username,
        followers: followers.map((follower) => follower.username),
      },
    });

    socket.on("request host call", (watcherId) => {
      console.log("request host call: ", watcherId);
      peer.call(watcherId, stream);
    });
  }

  function start() {
    setIsStreaming(true);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(gotStream)
      .catch((e) => console.log("getUserMedia() error: ", e));
  }

  function captureScreen() {
    // const capture = await navigator.mediaDevices.getDisplayMedia({ video: true });
  }

  function stopStreaming() {
    // video.srcObject.getTracks().forEach(t => t.enabled = !t.enabled)
    window.localStream.getVideoTracks()[0].enabled = false
  }

  return (
    <>
      <Button onClick={start}>Connect</Button>

      <Modal
        visible={isStreaming}
        getContainer={false}
        onCancel={() => setIsStreaming(false)}
        onOk={stopStreaming}
      >
        <video ref={refVideo} style={{ width: "100%" }} controls />
        <Button onClick={captureScreen}>Capture</Button>
      </Modal>

      <video ref={refVideo2} controls width="300" />

      {streams.map((stream) => (
        <MyVideo streamInfo={stream} peer={peer} />
      ))}
    </>
  );
};

export default connect((state) => ({ userInfo: state.user.info }))(Stream);
