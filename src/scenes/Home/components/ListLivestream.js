import React, { useState, useEffect } from "react";
import { notification, message } from "antd";
import Livestream from "./Livestream";
import socket from "common/socketio";
import { connect } from "react-redux";
import { WebRtcPeer } from "kurento-utils";

const ListLivestream = function ({ userInfo }) {
  const [livestreams, setLivestreams] = useState([]);

  const [rtcViewer, setRtcViewer] = useState(null);

  useEffect(() => {
    const { _id } = userInfo;
    socket.emit("list_livestreams", _id);
    socket.on("list_livestreams", (listLivestreams) => {
      setLivestreams(listLivestreams);
    });

    socket.on("new_livestream", (notify) => {
    setLivestreams([...livestreams, notify])
    const { username, hostId } = notify
      notification.info({
        placement: "topRight",
        message: `${username} vừa bắt đầu buổi livestream!`,
        onClick: () => {
          console.log("play stream");
        //   watchLivestream();
        },
      });
    });
  }, []);

  useEffect(() => {
    if (rtcViewer) {
      socket.on("ice_candidate_viewer", (candidate) => {
        rtcViewer.addIceCandidate(candidate);
      });
      socket.on("watch_stream_response", viewResponse);
      socket.on("end_livestream", ({ host, streamId }) => {
        notification.info({
          placement: "topRight",
          message: `${host.username} đã kết thúc buổi livestream!`,
        });
        rtcViewer.dispose();
      });
    }
  }, [rtcViewer]);

  function viewResponse(mess) {
    if (mess.result !== "accepted") {
      message.error(`Watch livestream error: ${mess.error}`);
    } else {
      rtcViewer.processAnswer(mess.answer, (err) =>
        err ? message.error(err) : null
      );
    }
  }

  function watchLivestream(hostId, refLivestream) {
    if (rtcViewer) {
        rtcViewer.dispose()
    }
    const options = {
      remoteVideo: refLivestream.current,
      onicecandidate: onIceCandidateViewer,
      mediaConstraints: {
        audio: true,
        video: {
          width: 300,
          framerate: 30,
        },
      },
    };
    refLivestream.current.oncanplay = () => refLivestream.current.play()
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
            hostId,
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

  return (
    <>
      {livestreams.map((host) => (
        <Livestream
          key={host.id}
          watchLivestream={watchLivestream}
          host={host}
        />
      ))}
    </>
  );
};

export default connect((state) => ({ userInfo: state.user.info }))(
  ListLivestream
);
