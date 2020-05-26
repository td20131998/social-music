import React from "react";
import ReactDOM from "react-dom";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import { getToken } from "common/jwt";
import { connect } from "react-redux";
import { addNewSong } from "services/player/actions";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  QuestionCircleOutlined,
  RetweetOutlined,
} from "@ant-design/icons";

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

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      index: 0,
      currentAudio: null,
      isReady: false,
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.next = this.next.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onError = this.onError.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.load = this.load.bind(this);
    this.setCurrentAudio = this.setCurrentAudio.bind(this);
    this.onPause = this.onPause.bind(this)
    this.onLoading = this.onLoading.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onAudioProcess = this.onAudioProcess.bind(this)
    this.previous = this.previous.bind(this)
  }

  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this);
    this.$player = this.$el.querySelector("#player");
    this.player = WaveSurfer.create({
      waveColor: "violet",
      progressColor: "purple",
      barWidth: 2,
      barHeight: 0.5,
      barGap: 1,
      cursorWidth: 1,
      container: this.$player,
      backend: "WebAudio",
      height: 80,
      responsive: true,
      cursorColor: "transparent",
      // fillParent: true,
      hideScrollbar: true,
      // renderer: WaveSurfer.drawBuffer,
      xhr: {
        requestHeaders: [
          {
            key: "Authorization",
            value: `Bearer ${getToken()}`,
          },
        ],
      },
    });
    this.$audio = this.$el.querySelector('#audio')
    // this.setCurrentAudio(this.state.index);
    this.player.load(this.$audio)
    this.player.on("ready", this.onReady);
    this.player.on("error", this.onError);
    this.player.on("finish", this.onFinish);
    this.player.on('pause', this.onPause)
    this.player.on('loading', this.onLoading)
    this.player.on('play', this.onPlay)
    this.player.on('audioprocess', this.onAudioProcess)
    console.log(this.player)
  }

  load(audio) {
    this.player.load(`http://localhost:8080/api/songs/${audio}`);
  }

  onReady() {
    console.log("ready");
    // this.player.play()
  }

  onError(e) {
    console.log(e);
  }

  onFinish() {
    console.log("finish");
  }

  onPause() {
    console.log('pause')
  }

  onLoading() {
    console.log('loading')
  }

  onPlay() {
    console.log('play')
  }

  onAudioProcess() {
    console.log('audio process')
  }

  next() {
    let { index } = this.state
    this.setState({ index: index + 1, playing: false }, () => {
      this.setCurrentAudio(this.state.index)
      // this.player.drawBuffer()
      this.player.play()
    });
  }

  previous() {
    this.setState({ index: this.state.index - 1, playing: false }, () => {
      this.setCurrentAudio(this.state.index)
      // this.player.drawBuffer()

      this.player.play()
    })
  }

  setCurrentAudio(index) {
    let { list } = this.props;
    if (index > list.length) {
      return null;
    }
    this.setState({ currentAudio: list[index] }, () => {
      this.load(this.state.currentAudio);
      console.log(this.player.source)
    });
  }

  handlePlay() {
    this.setState({ playing: !this.state.playing });
    this.player.playPause();
    console.log(this.player)
  }

  render() {
    return (
      <PlayerDiv>
        <StepBackwardOutlined className="another" onClick={this.previous} />
        {!this.state.playing ? (
          <PlayCircleOutlined
            onClick={this.handlePlay}
            className="play-pause"
          />
        ) : (
          <PauseCircleOutlined
            onClick={this.handlePlay}
            className="play-pause"
          />
        )}
        <StepForwardOutlined className="another" onClick={this.next} />
        <QuestionCircleOutlined className="another" />
        <RetweetOutlined className="another" />
        <Wave id="player" />
        <audio id="audio">
          <source src="http://localhost:8080/api/songs/1589962749543-4c7b4108f32.mp3" />
        </audio>
      </PlayerDiv>
    );
  }
}

export default connect((state) => ({
  list: state.player,
}))(Player);
