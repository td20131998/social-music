import React from "react";
import { Modal, Input, List } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { addComment } from "../services/comments/api";
import { getListComment } from '../services/comments/api'
import Comment from './Comment'

const { TextArea } = Input;
const { Item } = List;

class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentCount: this.props.commentCount,
      comments: [],
      commentText: '',
      visible: false
    }

    this.handleSubmitComment = this.handleSubmitComment.bind(this)
    this.handleChangeInputComment = this.handleChangeInputComment.bind(this)
    this.showComments = this.showComments.bind(this)
  }

  handleSubmitComment() {
    addComment(this.props.postId, { content: this.state.commentText }).then((comment) => {
      if (comment._id) {
        this.setState({
          commentText: '',
          comments: [...this.state.comments, comment],
          commentCount: this.state.commentCount + 1
        })
      }
    });
  }

  handleChangeInputComment(e) {
    e.preventDefault()
    this.setState({ commentText: e.target.value })
  }

  showComments() {
    getListComment(this.props.postId).then(comments => {
      this.setState({
        visible: true,
        comments: [...this.state.comments, ...comments]
      })
    })
  }

  render() {
    return (
      <>
        <CommentOutlined onClick={this.showComments} />
        <span className="count-comment">{this.state.commentCount}</span>
        <Modal
          visible={this.state.visible}
          title="Title"
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          footer={[
            <TextArea
              placeholder="Bình luận"
              autoSize={{ minRows: 1, maxRows: 6 }}
              onPressEnter={this.handleSubmitComment}
              onChange={this.handleChangeInputComment}
              value={this.state.commentText}
            />,
          ]}
        >
          <List
            itemLayout="horizontal"
            dataSource={this.state.comments}
            renderItem={(cmt) => <Item>
              <Comment content={cmt.content} author={cmt.user} />
            </Item>}
          />
        </Modal>
      </>
    );
  }
}

export default CommentList
