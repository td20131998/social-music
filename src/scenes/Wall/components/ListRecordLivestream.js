import React, { useState, useEffect } from "react";
import RecordLivestream from "./RecordLivestream";
import { apiGetStreams } from "services/stream/api";

const ListRecordLivestream = function ({ userInfo }) {
  const [livestreams, setLivestreams] = useState([]);

  useEffect(() => {
    apiGetStreams(userInfo._id).then((streams) => setLivestreams(streams));
  }, []);


  return (
    <>
      {livestreams.map((stream) => (
        <RecordLivestream
          key={stream._id}
          stream={stream}
          host={stream.user}
          userInfo={userInfo}
        />
      ))}
    </>
  );
};

export default ListRecordLivestream
