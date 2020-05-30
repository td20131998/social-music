import React, { useState, useEffect } from "react";
import { apiGetPopularPosts } from "services/post/api";
import Post from "components/Post";

const PopularList = function () {
  const [popularPosts, setPopularPosts] = useState([]);
  useEffect(() => {
    apiGetPopularPosts().then((populars) => setPopularPosts(populars));
  }, []);
  return (
    <div>
      {popularPosts.map((post) => (
        <Post key={post._id} info={post} />
      ))}
    </div>
  );
};

export default PopularList;
