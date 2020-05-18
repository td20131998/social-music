import React from "react";
import { Upload as UploadAntd, Form, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadMusic, createPost, removeMusic } from "../../../services/posts/api";
import styled from "styled-components";

const { Dragger } = UploadAntd;
const { Item } = Form

const UploadDiv = styled.div`
  .ant-upload-drag {
    display: ${props => props.isShowDrager ? 'block' : 'none'};
  }
  .ant-form {
    display: ${props => props.isShowDrager ? 'none' : 'block'};
    margin-top: 10px;
  }
`;

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };

    this.uploadSong = this.uploadSong.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeSong = this.removeSong.bind(this)
  }

  uploadSong(options) {
    const { onSuccess, onError, file, onProgress } = options;
    const config = {
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress({ percent: percent });
      },
    };
    // uploadMusic(file, config)
    //   .then((post) => {
    //     if (post) {
          onSuccess('post');
      //   }
      // })
      // .catch((err) => onError(err));
  }

  onChange({ fileList }) {
    this.setState({ files: [...fileList] });
  }

  removeSong(file) {
    console.log(file)
    // removeMusic(file)
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
          multiple={true}
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

        <Form>
          <Item label='Note'>
            <Input />
          </Item>

          <Item label='Gender'>
            <Input />
          </Item>
        </Form>
      </UploadDiv>
    );
  }
}

export default Upload;
