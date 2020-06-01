import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import socket from 'common/socketio'
import Peer from 'peerjs'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'

const Stream = function ({ userInfo }) {
    const refVideo = useRef()
    // `${new Date().getTime()}-${uuidv4()}`
    const [peer, setPeer] = useState(new Peer())
    const [video, setVideo] = useState(null)

    useEffect(() => {
        socket.emit('test', peer.id)
        socket.on("friend livestream", idStream => {
            // alert(idStream)
            peer.on('stream', remoteStream => {
                video.srcObject = remoteStream;
                video.play()
            })
            // peer.connect(idStream, aa => console.log("friend livestream: ", aa))
        })
        if (refVideo.current) {
            setVideo(refVideo.current)
        }
    }, [])

    function openStream() {
        const config = { audio: false, video: true }
        return navigator.mediaDevices.getUserMedia(config)
    }

    function playStream() {
        console.log(peer)
        openStream().then(stream => {
            video.srcObject = stream;
            video.play()
            socket.on("peerId", peerId =>{
                alert("peerId", peerId)
                peer.call(peerId, stream)
            })
            // peer.call(, stream)
            socket.emit('new stream', { idHostStream: userInfo._id, idLiveStream: peer.id })
        })
    }

  return (
    <>
      <video ref={refVideo} width="300" controls />
      <Button onClick={playStream}>Connect</Button>
    </>
  );
};

export default connect(state => ({ userInfo: state.user.info }))(Stream);
