import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import WaveSurfer from 'wavesurfer.js';
import { getToken } from 'common/jwt'

const Wave = function () {
  const refPlayer = useRef();
  const [player, setPlayer] = useState(null);

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

    player.load(`http://localhost:8080/api/songs/1590660196542-ff922804c2.mp3`)
  }, []);

  return <wave ref={refPlayer} />;
};

const wave = styled.div`
  width: 50%;
  height: auto;
  display: inline;
`;

export default connect()(Wave);
