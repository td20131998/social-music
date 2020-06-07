import React, { useState, useEffect, useRef } from "react";
import { Button, notification, Modal, message } from "antd";
import socket from "common/socketio";
import { connect } from "react-redux";
import { apiGetFollowersOf, apiGetFollowingsOf } from "services/follow/api";
import { WebRtcPeer } from "kurento-utils";
import ListLivestream from "./ListLivestream";

const Stream = function ({ userInfo }) {
  const [isStreaming, setIsStreaming] = useState(false);

  const [rtcStream, setRtcStream] = useState(null);
  const [rtcViewer, setRtcViewer] = useState(null);

  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  const refLivestream = useRef();
  // const refVideo2 = useRef();
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
  }, []);

  /**
   * @Start_Handle_Streaming
   */
  useEffect(() => {
    if (rtcStream) {
      socket.on("ice_candidate_streamer", (candidate) => {
        console.log("add candidate streamer: ", candidate);
        rtcStream.addIceCandidate(candidate);
      });

      socket.on("stream_response", streamResponse);
    }
  }, [rtcStream]);

  function streamResponse(mess) {
    if (mess.result !== "accepted") {
      message.error(`Create livestream error: ${mess.error}`);
    } else {
      rtcStream.processAnswer(mess.answer, (err) =>
        err ? message.error(err) : null
      );
    }
  }

  function startLivestream() {
    setIsStreaming(true);
    const options = {
      localVideo: refLivestream.current,
      onicecandidate: onIceCandidateStreamer,
      mediaConstraints: {
        audio: true,
        video: {
          width: 1000,
          framerate: 30,
        },
      },
    };
    setRtcStream(
      new WebRtcPeer.WebRtcPeerSendrecv(options, function (err) {
        if (err) message.error(err);
        refLivestream.current.play();
        this.generateOffer(function (error, offerSdp) {
          if (error) console.log(error);
          const streamInfo = {
            host: {
              id: userInfo._id,
              avatar: userInfo.avatar,
              username: userInfo.username,
              followers: followers.map((follower) => follower.username),
            },
            offerSdp,
          };
          socket.emit("livestream", streamInfo);
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

  function endLivestream() {
    if (rtcStream) {
      const host = userInfo;
      socket.emit("end_livestream", host);
      rtcStream.dispose();
      setRtcStream(null);
      setIsStreaming(false);
    }
  }
  /**
   * @End_Handle_Streaming
   */

  /**
   * @Start_Handle_Watch_Livestream
   */
  // useEffect(() => {
  //   if (rtcViewer) {
  //     socket.on("ice_candidate_viewer", (candidate) => {
  //       rtcViewer.addIceCandidate(candidate);
  //     });
  //     socket.on("watch_stream_response", viewResponse);
  //     socket.on("end_livestream", ({ host, streamId }) => {
  //       notification.info({
  //         placement: "topRight",
  //         message: `${host.username} đã kết thúc buổi livestream!`,
  //       });
  //       rtcViewer.dispose();
  //     });
  //   }
  // }, [rtcViewer]);

  // function viewResponse(mess) {
  //   if (mess.result !== "accepted") {
  //     message.error(`Watch livestream error: ${mess.error}`);
  //   } else {
  //     rtcViewer.processAnswer(mess.answer, (err) =>
  //       err ? message.error(err) : null
  //     );
  //   }
  // }

  // function viewer(hostId) {
  //   const options = {
  //     remoteVideo: refVideo2.current,
  //     onicecandidate: onIceCandidateViewer,
  //     mediaConstraints: {
  //       audio: true,
  //       video: {
  //         width: 500,
  //         framerate: 30,
  //       },
  //     },
  //   };
  //   setRtcViewer(
  //     new WebRtcPeer.WebRtcPeerRecvonly(options, function (err) {
  //       if (err) message.error(err);
  //       this.generateOffer(function (error, offerSdp) {
  //         if (error) message.error(error);
  //         const viewerInfo = {
  //           viewer: {
  //             id: userInfo._id,
  //             username: userInfo.username,
  //           },
  //           hostId,
  //           offerSdp,
  //         };
  //         socket.emit("view_livestream", viewerInfo);
  //       });
  //     })
  //   );
  // }

  // function onIceCandidateViewer(candidate) {
  //   const candidateInfo = {
  //     id: userInfo._id,
  //     candidate,
  //   };
  //   socket.emit("icecandidate_viewer", candidateInfo);
  // }
  /**
   * @End_Handle_Watch_Livestream
   */

  return (
    <>
      <Button onClick={startLivestream}>Connect</Button>
      <Modal
        visible={isStreaming}
        getContainer={false}
        onCancel={endLivestream}
        onOk={endLivestream}
        width={window.innerWidth}
      >
        <video ref={refLivestream} style={{ width: "100%" }} controls />
        <Button>Capture</Button>
      </Modal>

      <ListLivestream />
      {/* <video ref={refVideo2} controls></video> */}
      {/* <Button onClick={viewer}>Viewer</Button> */}
    </>
  );
};

export default connect((state) => ({ userInfo: state.user.info }))(Stream);
