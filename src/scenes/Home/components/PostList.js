import React from "react";
import Post from "../../../components/Post";
import { getListPost } from "../../../services/posts/api";
import styled from 'styled-components'

const DivPostList = styled.div`
  .ant-card {
    margin-bottom: 15px;
  }
`

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      // index: 0
    };
  }

  componentDidMount() {
    getListPost(1).then((posts) => this.setState({ posts: [...posts] }));
  }

  render() {
    return (
      <DivPostList>
        {this.state.posts.map((post) => (
          <Post key={post._id} info={post} />
        ))}
      </DivPostList>
    );
  }
}

export default PostList;
