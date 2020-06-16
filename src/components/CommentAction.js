import React from "react";
import { Modal, Input, List, Button, notification } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { apiAddComment, apiGetListComment } from "services/comment/api";
import Comment from "./Comment";
import { connect } from "react-redux";
import socket from "common/socketio";

const { TextArea } = Input;
const { Item } = List;

class CommentAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: this.props.commentCount,
      comments: [],
      commentText: "",
      visible: false,
      page: 1,
    };

    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleChangeInputComment = this.handleChangeInputComment.bind(this);
    this.showComments = this.showComments.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.loadMoreComment = this.loadMoreComment.bind(this);
  }

  componentDidMount() {
    socket.on("user_comment_post", ({ userComment, postId }) => {
      if (postId == this.props.postId) {
        this.setState({
          commentCount: this.state.commentCount + 1,
        });

        notification.info({
          placement: "topRight",
          message: `${userComment.username} đã bình luận về bài hát của bạn!`,
          onClick: this.showComments
        });
      }
    })
  }

  handleSubmitComment() {
    const { author, postId, userInfo } = this.props
    socket.emit("user_comment_post", ({ userComment: userInfo, postId, author }))
    apiAddComment(postId, { content: this.state.commentText }).then(
      (comment) => {
        if (comment._id) {
          comment.user = userInfo;
          this.setState({
            commentText: "",
            comments: [...this.state.comments, comment],
            commentCount: this.state.commentCount + 1,
          });
        }
      }
    );
  }

  handleChangeInputComment(e) {
    e.preventDefault();
    this.setState({ commentText: e.target.value });
  }

  showComments() {
    apiGetListComment(this.props.postId, this.state.page).then((comments) => {
      this.setState({
        visible: true,
        comments: [...this.state.comments, ...comments],
      });
    });
  }

  loadMoreComment() {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () =>
        apiGetListComment(this.props.postId, this.state.page).then(
          (comments) => {
            this.setState({
              comments: [...comments, ...this.state.comments],
            });
          }
        )
    );
  }
  onCancel() {
    this.setState({
      visible: false,
      comments: [],
      page: 1,
    });
  }

  render() {
    console.log(this.state.commentCount)
    return (
      <>
        <CommentOutlined onClick={this.showComments} />
        <span className="count">{this.state.commentCount}</span>
        <Modal
          visible={this.state.visible}
          title="Bình luận"
          onOk={this.onCancel}
          onCancel={this.onCancel}
          footer={[
            <TextArea
              key="comment-txt"
              placeholder="Bình luận"
              autoSize={{ minRows: 1, maxRows: 6 }}
              onPressEnter={this.handleSubmitComment}
              onChange={this.handleChangeInputComment}
              value={this.state.commentText}
            />,
          ]}
        >
          {this.props.commentCount > 0 ? null : (
            <Button size="small" onClick={this.loadMoreComment}>
              Tải thêm bình luận
            </Button>
          )}

          <List
            itemLayout="horizontal"
            dataSource={this.state.comments}
            renderItem={(cmt) => (
              <Item>
                <Comment info={cmt} />
              </Item>
            )}
          />
        </Modal>
      </>
    );
  }
}

export default connect((state) => ({ userInfo: state.user.info }))(CommentAction);
