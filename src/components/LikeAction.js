import React from "react";
import Heart from "./Heart";
import { apiLikePost, apiUnlikePost, apiGetListLike } from "services/likes/api";
import { Modal, List, Avatar as Avt, notification } from "antd";
import socket from "common/socketio";
import { connect } from "react-redux";

const { Item } = List;

class LikeAction extends React.Component {
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
    this.onCancel = this.onCancel.bind(this);
  }
  componentDidMount() {
    socket.on("user_like_post", ({ userLike, postId }) => {
      if (postId == this.props.postId) {
        this.setState({
          likeCount: this.state.likeCount + 1,
        });

        notification.info({
          placement: "topRight",
          message: `${userLike.username} đã thích bài hát của bạn!`,
        });
      }
    });

    socket.on("user_unlike_post", ({ userUnlike, postId }) => {
      if (postId == this.props.postId) {
        this.setState({
          likeCount: this.state.likeCount - 1,
        })
      }
    })
  }
  toggleLove(isLike) {
    const { userInfo, postId, author } = this.props;
    if (isLike) {
      socket.emit("user_unlike_post", { userUnlike: userInfo, postId, author })
      apiUnlikePost(postId).then((like) =>
        like._id
          ? this.setState({
              isLike: !isLike,
              likeCount: this.state.likeCount - 1,
            })
          : null
      );
    } else {
      socket.emit("user_like_post", { userLike: userInfo, postId, author });
      apiLikePost(postId).then((like) =>
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
    apiGetListLike(this.props.postId).then((likes) => {
      this.setState({
        visible: true,
        likes: [...this.state.likes, ...likes],
      });
    });
  }

  onCancel() {
    this.setState({
      visible: false,
      likes: [],
    });
  }

  render() {
    return (
      <>
        <Heart
          love={this.state.isLike}
          toggleLove={() => this.toggleLove(this.state.isLike)}
          style={{ display: "inline" }}
        />
        <span className="count" onClick={this.showLikes}>
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

export default connect((state) => ({ userInfo: state.user.info }))(LikeAction);
