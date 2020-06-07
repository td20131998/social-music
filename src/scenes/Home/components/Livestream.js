import React, { useState, useEffect, useRef } from "react";

const Livestream = function ({ watchLivestream, host: { hostId, username } }) {
  const livestream = useRef();

  function play() {
      if (livestream.current) {
          watchLivestream(hostId, livestream)
          livestream.current.play()
      }
  }
  return (
    <>
        <p>{username}</p>
      <video
        ref={livestream}
        controls
      />
      <button onClick={play}>Start</button>
    </>
  );
};

export default Livestream;
