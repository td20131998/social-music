import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import getPublicImage from "common/getPublicImage";
import { PauseOutlined, PlayCircleOutlined } from "@ant-design/icons";

const MyVideo = function ({ streamInfo }) {
  const [isPlay, setIsPlay] = useState(false);
  console.log(streamInfo);
  const videoRef = useRef();
  return (
    <MyVideoDiv>
      <video
        className="video"
        ref={videoRef}
        width="320"
        height="240"
        poster={getPublicImage(streamInfo.host.avatar)}
      ></video>
      <div className="controls">
        <div className="orange-bar">
        </div>

        <div className="buttons">
          {isPlay ? <PauseOutlined /> : <PlayCircleOutlined />}
        </div>
      </div>
    </MyVideoDiv>
  );
};

const MyVideoDiv = styled.div`
  position: relative;
  .video {
  }
  .controls {
    display: flex;
    position: absolute;
    bottom: 0;
  }
  .orange-bar {
  }
  .orange-juice {
  }
`;

export default MyVideo;
