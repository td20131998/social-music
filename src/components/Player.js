import React from "react";
import { getMusic } from "services/song/api";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import { getToken } from "common/jwt";
import { connect } from "react-redux";

const WaveformContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 70%;
  background: transparent;
`;

const Wave = styled.div`
  width: 100%;
  height: 90px;
`;

const PlayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #efefef;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  &:hover {
    background: #ddd;
  }
`;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };

    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: "#2D5BFF",
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
      xhr: {
        requestHeaders: [
          {
            key: "Authorization",
            value: `Bearer ${getToken()}`,
          },
        ],
      },
    });

    this.waveform.load("http://localhost:8080/api/songs/1589358734290-7510b91feac.mp3/play");
  }

  handlePlay() {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  }

  render() {
    return (
      <WaveformContianer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </PlayButton>
        <Wave id="waveform" />
      </WaveformContianer>
    );
  }
}

export default connect()(Player);
