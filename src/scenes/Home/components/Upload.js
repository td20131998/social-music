import React from "react";
import { Upload as UploadAntd, Form, Input, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { apiUploadMusic, apiRemoveMusic } from "services/song/api";
import { apiCreatePost } from "services/post/api";
import styled from "styled-components";

const { Dragger } = UploadAntd;
const { Item } = Form;

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      filename: null,
    };

    this.uploadSong = this.uploadSong.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.createSong = this.createSong.bind(this);
  }

  uploadSong(options) {
    const { onSuccess, onError, file, onProgress } = options;
    const config = {
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress({ percent: percent });
      },
    };
    apiUploadMusic(file, config)
      .then((post) => {
        if (post) {
          this.setState({ filename: post.filename });
          onSuccess("post");
        }
      })
      .catch((err) => onError(err));
  }

  onChange({ fileList }) {
    this.setState({ files: [...fileList] });
  }

  removeSong() {
    apiRemoveMusic(this.state.filename).then((res) => {
      if (res === "success") {
        this.setState({ files: [], filename: null });
        message.success("Remove success!");
      } else {
        this.setState({ files: [], filename: null });
        message.error("Error!");
      }
    });
  }

  createSong({ title, description }) {
    let { files } = this.state;
    for (let file of files) {
      if (file.status !== "done") {
        return message.info("Uploading!");
      }
    }
    const data = {
      name: title,
      src: this.state.filename,
      description: description,
    };
    apiCreatePost(data).then((res) => {
      if (res.src) {
        this.setState({ files: [], filename: null });
        message.success("Create success!");
      } else {
        this.setState({ files: [], filename: null });
        message.error("Create failed");
      }
    });
  }

  render() {
    return (
      <UploadDiv isShowDrager={this.state.files.length < 1}>
        <Dragger
          defaultFileList={this.state.files}
          listType="picture"
          fileList={this.state.files}
          customRequest={this.uploadSong}
          onChange={this.onChange}
          multiple={false}
          onRemove={this.removeSong}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>

        <Form onFinish={this.createSong}>
          <Item label="Tên bài hát" name="title">
            <Input />
          </Item>

          <Item label="Mô tả" name="description">
            <Input />
          </Item>

          <Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            <Button onClick={this.removeSong} style={{ marginLeft: "20px" }}>
              Cancel
            </Button>
          </Item>
        </Form>
      </UploadDiv>
    );
  }
}

const UploadDiv = styled.div`
  .ant-upload-drag {
    display: ${(props) => (props.isShowDrager ? "block" : "none")};
  }
  .ant-form {
    display: ${(props) => (props.isShowDrager ? "none" : "block")};
    margin-top: 10px;
  }

  .ant-form-item-label > label {
    width: 100px;
  }
`;
export default Upload;
