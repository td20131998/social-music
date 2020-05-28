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
  UnorderedListOutlined
} from "@ant-design/icons";
import { playnext, playprevious, playorpause, play, pause } from "services/player/actions";
import { message, Drawer } from "antd";

const Player = function ({ playing, playingIndex, playlist, dispatch }) {
  const refPlayer = useRef();
  const [player, setPlayer] = useState(null);
  const [visiblePlaylist, setVisiblePlaylist] = useState(false)

  useEffect(() => {
    if (refPlayer.current) {
      setPlayer(
        WaveSurfer.create({
          waveColor: "violet",
          progressColor: "purple",
          barWidth: 2,
          barHeight: 0.5,
          barGap: 1,
          cursorWidth: 1,
          container: refPlayer.current,
          backend: "WebAudio",
          height: 80,
          responsive: true,
          cursorColor: "transparent",
          hideScrollbar: true,
          xhr: {
            requestHeaders: [
              {
                key: "Authorization",
                value: `Bearer ${getToken()}`,
              },
            ],
          }
        })
      );
    }
    if (playlist.length > 0) {
      player.load(playlist[playingIndex]);
    }
  }, []);

  useEffect(() => {
    if (playlist.length > 0) {
      load(playlist[playingIndex]);
      player.on('ready', () => {
        console.log('ready')
        dispatch(play())
        player.play()
      })
      player.on('finish', () => {
        if (playlist.length > 1) {
          next()
        } else {
          player.stop()
          dispatch(pause())
        }
      })
      player.on('loading', () => {
        console.log('loading')
      })
    }
  }, [playingIndex, playlist]);

  function load(audio) {
    player.load(`http://localhost:8080/api/songs/${audio}`);
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

  function handlePlay() {
    player.playPause();
    dispatch(playorpause());
  }

  function togglePlaylist() {
    setVisiblePlaylist(!visiblePlaylist)
  }

  return (
    <PlayerDiv>
      <StepBackwardOutlined className="another" onClick={previous} />
      {!playing ? (
        <PlayCircleOutlined onClick={handlePlay} className="play-pause" />
      ) : (
        <PauseCircleOutlined onClick={handlePlay} className="play-pause" />
      )}
      <StepForwardOutlined className="another" onClick={next} />
      <QuestionCircleOutlined className="another" />
      <RetweetOutlined className="another" />
      <UnorderedListOutlined className="another" onClick={togglePlaylist} />
      <Wave ref={refPlayer} />
      <Drawer 
        title="Danh sách phát"
        placement="right"
        closable={false}
        onClose={togglePlaylist}
        visible={visiblePlaylist}
      >
        {playlist.map(post => <div>{post}</div>)}
      </Drawer>
    </PlayerDiv>
  );
};

const PlayerDiv = styled.div`
  background-color: #2d1653;
  height: 60px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .play-pause,
  .another {
    padding-right: 10px;
  }
  .play-pause {
    font-size: 40px;
  }
  .another {
    font-size: 30px;
  }
`;

const Wave = styled.div`
  width: 50%;
  height: auto;
  display: inline;
  width: ;
  wave {
    // width: 100%;
  }
`;

export default connect((state) => ({
  playlist: state.player.stack,
  playingIndex: state.player.playingIndex,
  playing: state.player.playing,
}))(Player);
