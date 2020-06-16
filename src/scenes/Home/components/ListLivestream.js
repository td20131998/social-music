import React, { useState, useEffect, useRef } from "react";
import { notification, message } from "antd";
import Livestream from "../../../components/Livestream";
import socket from "common/socketio";
import { connect } from "react-redux";
import { WebRtcPeer } from "kurento-utils";
import { togglePlayerVisible } from "services/player/actions";

const ListLivestream = function ({ userInfo, dispatch }) {
  const [livestreams, setLivestreams] = useState([]);

  useEffect(() => {
    const { _id } = userInfo;
    socket.emit("list_livestreams", _id);
    socket.on("list_livestreams", (listLivestreams) => {
      setLivestreams(listLivestreams);
      console.log(livestreams)
    });

    socket.on("new_livestream", (notify) => {
      setLivestreams([...livestreams, notify]);
      const { username, hostId } = notify;
      notification.info({
        placement: "topRight",
        message: `${username} vừa bắt đầu buổi livestream!`,
        onClick: () => {
          console.log("play stream");
          //   watchLivestream();
        },
      });
    });

    if (livestreams.length) {
      socket.on("end_livestream", ({ host, streamId }) => {
        console.log("end-livestream")
        notification.info({
          placement: "topRight",
          message: `${host.username} đã kết thúc buổi livestream!`,
        });
        console.log(livestreams)
        setLivestreams(livestreams.filter(livestream => livestream.streamId !== streamId))
        // rtcViewer.dispose();
      });
    }

    socket.on("end_livestream", ({ host, streamId }) => {
      notification.info({
        placement: "topRight",
        message: `${host.username} đã kết thúc buổi livestream!`,
      });
      setLivestreams(
        livestreams.filter((livestream) => livestream.streamId !== streamId)
      );
      // rtcViewer.dispose();
    });
  }, []);

  return (
    <>
      {livestreams.map((host) => (
        <Livestream
          key={host.id}
          // watchLivestream={watchLivestream}
          host={host}
          userInfo={userInfo}
          setLivestreams={setLivestreams}
          livestreams={livestreams}
          // leaveLivestream={leaveLivestream}
          // isWatch={isWatch}
        />
      ))}
    </>
  );
};

export default connect((state) => ({ userInfo: state.user.info }))(
  ListLivestream
);
