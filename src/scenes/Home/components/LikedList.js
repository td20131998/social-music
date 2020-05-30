import React, { useState, useEffect } from "react";
import { apiGetListPostLikedByUser } from "services/post/api";
import Post from 'components/Post'

const LikedList = function () {
  const [page, setPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState([]);
  useEffect(() => {
    apiGetListPostLikedByUser(page).then(posts => {
        setLikedPosts(posts)
    })
  }, []);
  return (
    <div>
        {likedPosts.map(post => <Post key={post._id} info={post} />)}
    </div>
  );
};

export default LikedList;
