import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import { getToken } from "common/jwt";
import { connect } from "react-redux";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  QuestionCircleOutlined,
  RetweetOutlined,
  UnorderedListOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import {
  playnext,
  playprevious,
  playorpause,
  play,
  pause,
  changeTrack,
} from "services/player/actions";
import { message, Drawer, Slider, Popover, Dropdown, Menu, List, Avatar } from "antd";
import MinimapPlugin from "wavesurfer.js/dist/plugin/wavesurfer.minimap";

const Player = function ({
  playing,
  playingIndex,
  playlist,
  visible,
  dispatch,
}) {
  const refPlayer = useRef();
  const [player, setPlayer] = useState(null);
  const [volume, setVolume] = useState(40);
  const [visiblePlaylist, setVisiblePlaylist] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    if (refPlayer.current) {
      setPlayer(
        WaveSurfer.create({
          waveColor: "violet",
          progressColor: "white",
          barWidth: 0,
          barGap: 0,
          barMinHeight: 0,
          barHeight: 0,
          barRadius: 1,
          cursorWidth: 1,
          container: refPlayer.current,
          backend: "WebAudio",
          height: 80,
          responsive: true,
          cursorColor: "transparent",
          hideScrollbar: true,
          scrollParent: false,
          xhr: {
            requestHeaders: [
              {
                key: "Authorization",
                value: `Bearer ${getToken()}`,
              },
            ],
          },
        })
      );
    }
  }, []);

  useEffect(() => {
    if (player) {
      player.setVolume(volume / 100);
    }
  }, [volume]);

  function onReady() {
    player.on("ready", () => {
      dispatch(play());
      player.play();
      setDuration(secondsToMinutes(player.getDuration()));
    });
  }

  function onAudioProcess() {
    player.on("audioprocess", (seconds) => {
      setCurrentTime(secondsToMinutes(seconds));
    });
  }

  function onSeek() {
    player.on("seek", (percent) => {
      const seconds = percent * player.getDuration();
      setCurrentTime(secondsToMinutes(seconds));
    });
  }

  function onAudioFinish() {
    player.on("finish", () => {
      if (playlist.length > 1) {
        next();
      } else {
        player.stop();
        dispatch(pause());
      }
    });
  }

  function onLoading() {
    player.on("loading", () => {
      console.log("loading");
    });
  }

  useEffect(() => {
    if (playlist.length > 0 && player) {
      const { src, _id } = playlist[playingIndex];
      load(src);

      onReady();

      onAudioProcess();

      onSeek();

      onAudioFinish();

      onLoading();
    }
  }, [playingIndex, playlist]);

  function secondsToMinutes(seconds) {
    const minutesInt = Math.floor(seconds / 60);
    const secondsInt = Math.floor(seconds - minutesInt * 60);
    return `${minutesInt < 10 ? `0${minutesInt}` : minutesInt}:${
      secondsInt < 10 ? `0${secondsInt}` : secondsInt
    }`;
  }

  useEffect(() => {
    if (player && !visible) {
      player.pause();
      dispatch(pause());
    }
  }, [visible]);

  function load(audioSrc) {
    const refWave = document.getElementById(playlist[playingIndex]._id);
    if (player.getActivePlugins().minimap) {
      player.destroyPlugin("minimap");
    }
    player.load(`http://localhost:8080/api/songs/${audioSrc}`);
    if (refWave) {
      player
        .addPlugin(
          MinimapPlugin.create({
            container: refWave,
            waveColor: "#777",
            progressColor: "#222",
            height: 60,
            barWidth: 2,
            barHeight: 1,
          })
        )
        .initPlugin("minimap");
    }
  }

  function next() {
    if (playlist.length > 0) {
      dispatch(playnext());
    } else {
      message.info("Playlist rỗng!");
    }
  }

  function previous() {
    if (playlist.length > 0) {
      dispatch(playprevious());
    } else {
      message.info("Playlist rỗng!");
    }
  }

  function playOrPause() {
    if (!player.isReady) {
      load(playlist[playingIndex].src);
      onReady();
      onSeek();
      onAudioFinish();
      onAudioProcess();
    }
    player.playPause();
    dispatch(playorpause());
  }

  function togglePlaylist() {
    setVisiblePlaylist(!visiblePlaylist);
  }

  return (
    <PlayerDiv visible={visible}>
      <StepBackwardOutlined className="another" onClick={previous} />
      {!playing ? (
        <PlayCircleOutlined onClick={playOrPause} className="play-pause" />
      ) : (
        <PauseCircleOutlined onClick={playOrPause} className="play-pause" />
      )}
      <StepForwardOutlined className="another" onClick={next} />

      <Popover
        style={{ position: "relative" }}
        content={
          <div
            style={{
              display: "inline-block",
              height: "100px",
              bottom: "45px",
            }}
          >
            <Slider
              vertical
              defaultValue={volume}
              onChange={(value) => setVolume(value)}
            />
          </div>
        }
        trigger="hover"
      >
        <SoundOutlined className="another" />
      </Popover>

      <Wave ref={refPlayer}>
        {playlist.length > 0 ? (
          <span style={{ position: "absolute", left: "5px", top: "7px" }}>
            {playlist[playingIndex].name} - {playlist[playingIndex].description}
          </span>
        ) : null}

        <span style={{ position: "absolute", right: "5px", top: "7px" }}>
          {currentTime} / {duration}
        </span>
      </Wave>

      <Dropdown
        overlay={
          <Menu>
            {playlist.map((post, index) => <Menu.Item onClick={() => dispatch(changeTrack(index))}>
              {post.name} - {post.description}
            </Menu.Item>)}
          </Menu>
        }
        placement="topRight"
        trigger="click"
        className="playlist-dropdown"
      >
        <UnorderedListOutlined className="another" onClick={togglePlaylist} />
      </Dropdown>

    </PlayerDiv>
  );
};

const PlayerDiv = styled.div`
  background-color: #2d1653;
  height: 60px;
  color: white;
  display: ${(props) => (props.visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  .play-pause,
  .another {
    padding-right: 10px;
    font-size: 30px;
  }
  .play-pause {
    font-size: 40px;
  }
  .ant-spin-container > ul {
    padding: 0 !important;
  }
  .ant-dropdown-menu-items {
    padding: 0px !important;
  }
`;

const Wave = styled.div`
  width: 40%;
  margin-right: 10px;
  height: auto;
  display: inline;
  position: relative;
  top: 10px;
`;

export default connect((state) => ({
  playlist: state.player.stack,
  playingIndex: state.player.playingIndex,
  playing: state.player.playing,
  visible: state.player.visible,
  streaming: state.stream.streaming,
}))(Player);
