import React, { useState, useEffect, useRef } from "react";
import { message, Modal, Button } from "antd";
import socket from "common/socketio";
import { connect } from "react-redux";
import { apiGetFollowersOf, apiGetFollowingsOf } from "services/follow/api";
import { WebRtcPeer } from "kurento-utils";
import ListLivestream from "scenes/Home/components/ListLivestream";
import styled from "styled-components";
import { togglePlayerVisible } from "services/player/actions";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import FullscreenLivestream from "components/FullscreenLivestream";
import { apiCreateStream } from "services/stream/api";

const Stream = function ({ userInfo, dispatch }) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [confirmEndLivestream, setConfirmEndLivestream] = useState(false);

  const [rtcStream, setRtcStream] = useState(null);
  const [streamInfo, setStreamInfo] = useState(null);

  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  const refStreaming = useRef();
  const imgRef = useRef();

  useEffect(() => {
    const { _id } = userInfo;
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
    console.log(mess);
    if (mess.result !== "accepted") {
      message.error(`Create livestream error: ${mess.error}`);
    } else {
      setStreamInfo(mess.streamInfo);
      rtcStream.processAnswer(mess.answer, (err) =>
        err ? message.error(err) : null
      );
    }
  }

  function startLivestream() {
    dispatch(togglePlayerVisible());
    setIsStreaming(true);
    const options = {
      localVideo: refStreaming.current,
      onicecandidate: onIceCandidateStreamer,
      mediaConstraints: {
        audio: true,
        video: {
          width: 1280,
          height: 1000,
          framerate: 30,
        },
      },
    };
    setRtcStream(
      new WebRtcPeer.WebRtcPeerSendrecv(options, function (err) {
        if (err) message.error(err.toString());
        refStreaming.current.play();
        // refStreaming.current.ontimeupdate = event => {
        //   console.log(refStreaming.current.currentTime)
        // }
        // const canvas = document.createElement("canvas")
        // canvas.width = refStreaming.current.videoWidth
        // canvas.height = refStreaming.current.videoHeight
        // console.log(canvas.width)
        // canvas.getContext("2d").drawImage(refStreaming.current, 0, 0)

        // if (imgRef.current) {
        //   imgRef.current.src = canvas.toDataURL("image/webp")
        // }
        // console.log(img)
        this.generateOffer(function (error, offerSdp) {
          console.log(this);
          if (error) message.error(error.toString());
          const streamInfo = {
            host: {
              ...userInfo,
              id: userInfo._id,
              followers: followers.map((follower) => follower._id),
            },
            // background: img,
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

  function endLivestream(isStoreLivestrem) {
    if (rtcStream && isStoreLivestrem) {
      console.log("store livestream");
      socket.emit("end_livestream", {
        host: userInfo,
        isStore: true,
      });

      socket.on("livestream_comments", (commentTxts) => {
        const comments = commentTxts.map(cmt => {
          const { user, content, created_at } = JSON.parse(cmt)
          return ({ userId: user._id, content, createdAt: created_at })
        })
        console.log(comments);
        const data = {
          host: userInfo._id,
          src: streamInfo.streamId,
          comments: comments,
        };

        apiCreateStream(data).then((stream) => {
          if (stream && stream._id) {
            message.success("Lưu livestream thành công!");
            resetLivestream();
          }
        });
      });
    } else {
      console.log("delete stream");
      message.success("Đã kết thúc buổi livestream!");
      socket.emit("end_livestream", {
        host: userInfo,
        isStore: false,
      });
      resetLivestream();
    }
  }

  function resetLivestream() {
    rtcStream.dispose();
    dispatch(togglePlayerVisible());
    setRtcStream(null);
    setConfirmEndLivestream(false);
    setIsStreaming(false);
  }
  /**
   * @End_Handle_Streaming
   */

  return (
    <>
      <DivStream>
        <div className="start-livestream" onClick={startLivestream}>
          <VideoCameraAddOutlined style={{ fontSize: "40px" }} />
          <span style={{ paddingLeft: "10px" }}>Bắt đầu Livestream</span>
        </div>
      </DivStream>

      <FullscreenLivestream
        onClose={() => setConfirmEndLivestream(true)}
        visible={isStreaming}
        refStreaming={refStreaming}
        userInfo={userInfo}
        host={userInfo}
      />

      <Modal
        visible={confirmEndLivestream}
        title="Xác nhận"
        onCancel={() => setConfirmEndLivestream(false)}
        footer={[
          <Button key="back" onClick={() => setConfirmEndLivestream(false)}>
            Hủy
          </Button>,
          <Button key="yes and delete" onClick={() => endLivestream(false)}>
            Có và xóa
          </Button>,
          <Button key="yes and save" onClick={() => endLivestream(true)}>
            Có và lưu
          </Button>,
        ]}
      >
        Kết thúc buổi livestream?
      </Modal>
      {/* <img ref={imgRef} /> */}
      <ListLivestream />
    </>
  );
};

const DivStream = styled.div`
  height: 60px;
  .start-livestream {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 65px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .start-livestream:hover {
    cursor: pointer;
    background: #f0f2f5;
  }
`;
export default connect((state) => ({ userInfo: state.user.info }))(Stream);
