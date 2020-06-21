import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PlayCircleOutlined } from "@ant-design/icons";
import FullscreenRecordLivestream from "components/FullscreenRecordLivestream";
import moment from "moment";
import { Avatar } from "antd";
import getPublicImage from "common/getPublicImage";

const RecordLivestream = function ({ host, background, userInfo, stream }) {
  const [isWatch, setIsWatch] = useState(false);
  return (
    <DivLivestream>
      <div className="host-info">
        <Avatar
          src={getPublicImage(host.avatar)}
          size="large"
          className="streamer-avatar"
        />
        <span style={{ marginLeft: "45px", display: "inline-block" }}>
          <div>{host.fullName}</div>
          <div>{moment(new Date(stream.created_at)).fromNow()}</div>
        </span>
      </div>
      <div className="poster-livestream">
        <PlayCircleOutlined
          className="icon-play"
          onClick={() => setIsWatch(true)}
        />
      </div>
      <FullscreenRecordLivestream
        onClose={() => setIsWatch(false)}
        visible={isWatch}
        userInfo={userInfo}
        host={host}
        stream={stream}
      />
    </DivLivestream>
  );
};

const DivLivestream = styled.div`
  width: 100%;
  max-width: 100%;
  margin-bottom: 40px;
  .poster-livestream {
    background: black;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-play {
    display: none;
    font-size: 60px;
    color: white;
  }
  .poster-livestream:hover {
    cursor: pointer;
    .icon-play {
      display: block;
    }
  }
  .host-info {
    padding: 5px 10px;
    display: inline-block;
    height: 10%;
    position: relative;
  }

  .streamer-avatar {
    position: absolute;
  }
`;
export default RecordLivestream;
