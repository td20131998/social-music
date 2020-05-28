import React from "react";
import ReactDOM from "react-dom";
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
} from "@ant-design/icons";
import { playnext, playprevious, playorpause } from "services/player/actions";
import { message } from 'antd'

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.next = this.next.bind(this);
    this.load = this.load.bind(this);
    this.previous = this.previous.bind(this);
    this.onReady = this.onReady.bind(this)
  }

  componentDidMount() {
    const { playingIndex, playlist } = this.props;
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
      hideScrollbar: true,
      xhr: {
        requestHeaders: [
          {
            key: "Authorization",
            value: `Bearer ${getToken()}`,
          },
        ],
      },
    });
    if (playlist.length > 0) {
      console.log('duongdeptrai')
      this.load(playlist[playingIndex]);
    }
  }

  load(audio) {
    this.player.load(`http://localhost:8080/api/songs/${audio}`);
  }

  onReady(doNext) {
    this.player.on('ready', doNext)
  }

  next() {
    const { dispatch, playlist, playingIndex } = this.props
    if (playlist.length > 0) {
      dispatch(playnext())
      this.load(playlist[playingIndex])
      // this.onReady(dispatch(playorpause))
    } else {
      message.info('Playlist rỗng!')
    }
  }

  previous() {
    const { dispatch, playlist, playingIndex } = this.props
    if (playlist.length > 0) {
      dispatch(playprevious())
      this.load(playlist[playingIndex])
      this.setState({ playing: true })
    } else {
      message.info("Playlist rỗng!")
    }
  }

  handlePlay() {
    const { dispatch } = this.props
    // this.onReady(() => {
      this.player.playPause()
      dispatch(playorpause())
      
    // })
    // this.player.playPause()
    console.log(this.props)
  }

  render() {
    console.log(this.props)
    const { playing } = this.props
    return (
      <PlayerDiv>
        <StepBackwardOutlined className="another" onClick={this.previous} />
        {!playing ? (
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
      </PlayerDiv>
    );
  }
}

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
  playing: state.player.playing
}))(Player);
