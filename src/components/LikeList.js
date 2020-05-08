import React from "react";
import Heart from "./Heart";
import { likePost, unlikePost, getListLike } from "../services/likes/api";
import { Modal, List, Avatar as Avt } from "antd";

const { Item } = List;

class LikeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.likeCount,
      likes: [],
      visible: false,
      isLike: this.props.isLike,
    };

    this.toggleLove = this.toggleLove.bind(this);
    this.showLikes = this.showLikes.bind(this);
    this.onCancel = this.onCancel.bind(this)
  }

  toggleLove(isLike) {
    if (isLike) {
      unlikePost(this.props.postId).then((like) =>
        like._id
          ? this.setState({
              isLike: !isLike,
              likeCount: this.state.likeCount - 1,
            })
          : null
      );
    } else {
      likePost(this.props.postId).then((like) =>
        like._id
          ? this.setState({
              isLike: !isLike,
              likeCount: this.state.likeCount + 1,
            })
          : null
      );
    }
  }

  showLikes() {
    getListLike(this.props.postId).then((likes) => {
      this.setState({
        visible: true,
        likes: [...this.state.likes, ...likes],
      });
    });
  }

  onCancel() {
    this.setState({
      visible: false,
      likes: []
    })
  }

  render() {
    return (
      <>
        <Heart
          love={this.state.isLike}
          toggleLove={() => this.toggleLove(this.state.isLike)}
          style={{ display: "inline" }}
        />
        <span className="count-likes" onClick={this.showLikes}>
          {this.state.likeCount}
        </span>
        <Modal
          visible={this.state.visible}
          title={<Heart love={true} />}
          onOk={this.onCancel}
          onCancel={this.onCancel}
          footer={[null]}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.state.likes}
            renderItem={(like) => (
              <Item>
                <Avatar author={like.user} />
              </Item>
            )}
          />
        </Modal>
        </>
    );
  }
}

const Avatar = ({ author }) => (
  <>
    <Avt
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      alt={author.username}
      size="small"
    />
    <a>{author.username}</a>
  </>
);

export default LikeList;
