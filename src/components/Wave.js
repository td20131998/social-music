import React from 'react'
import WaveSurfer from "wavesurfer.js";
import { getToken } from "common/jwt";
import { connect } from "react-redux";

export default class Wave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playing: false
        }
        this.handlePlay = this.handlePlay.bind(this)
        this.createId = this.createId.bind(this)
    }

    createId() {
        const id = this.props.name.split(' ').join('-')
        return id
    }

    componentDidMount() {
        this.waveform = WaveSurfer.create({
          waveColor: "black",
          progressColor: "purple",
          barWidth: 3,
          cursorWidth: 1,
          container: `#wave-${this.createId()}`,
          backend: "WebAudio",
          height: 80,
        //   responsive: true,
          cursorColor: "transparent",
          fillParent: true,
          minPxPerSec: 1,
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
    
        this.waveform.load("http://localhost:8080/api/songs/1589884018405-cea095fd3d.mp3");
      }
    
      handlePlay() {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
      }
    
    render() {
        // console.log('1111: ', this.props)
        return (
            <div id={`wave-${this.createId()}`}></div>
        )
    }
}