import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PlayCircleOutlined } from "@ant-design/icons";
import FullscreenLivestream from "./FullscreenLivestream";

const Livestream = function ({ host, background, userInfo }) {
  const [isWatch, setIsWatch] = useState(false);

  return (
    <DivLivestream>
      <p>{host.fullName}</p>
      <div className="poster-livestream">
        <PlayCircleOutlined
          className="icon-play"
          onClick={() => setIsWatch(true)}
        />
      </div>
      <FullscreenLivestream
        onClose={() => setIsWatch(false)}
        visible={isWatch}
        userInfo={userInfo}
        host={host}
      />
    </DivLivestream>
  );
};

const DivLivestream = styled.div`
  .poster-livestream {
    background: black;
    width: 500px;
    height: 300px;
    position: relative;
  }
  .icon-play {
    display: none;
    position: absolute;
    font-size: 60px;
    top: 200px;
    left: 100px;
    color: white;
  }
  .poster-livestream:hover {
    cursor: pointer;
    .icon-play {
      display: block;
    }
  }
`;
export default Livestream;
