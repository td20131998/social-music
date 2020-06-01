import React, { useState, useEffect } from "react";
import Post from "components/Post";
import styled from "styled-components";

const DivPostList = styled.div`
  .ant-card {
    margin-bottom: 15px;
  }
`;

const PostList = function ({ getListPost, userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const data = { userId: userId, page: 1 }
    getListPost(data).then((listPost) => setPosts(listPost));
  }, []);

  return (
    <DivPostList>
      {posts.map((post) => (
        <Post key={post._id} info={post} />
      ))}
    </DivPostList>
  );
};

export default PostList;
