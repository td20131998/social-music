import React from "react";
import { Form, Input, Button, Tooltip, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { apiSignin } from 'services/users/api'

const { Item } = Form;
const DivSigin = styled.div`
  height: auto;
  width: auto;
  border: 1px solid #40a9ff;
  padding: 10px;

  .ant-form-item-label {
    text-align: left;
  }
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 10,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Signin = function () {
  function onFinish(registerInfo) {
    registerInfo.fullName = 'Nguyen tung duong'
    apiSignin(registerInfo)
      .then(res => {
        if (!res.msg) {

        } else {

        }
      })
  }

  function onFinishFailed() {
    message.warning("Vui lòng xem lại thông tin đăng kí!")
  }
  return (
    <DivSigin>
      Đăng kí
      <Form
        {...formItemLayout}
        name="register"
        initialValues={{
          prefix: "86",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Không đúng định dạng email!",
            },
            {
              required: true,
              message: "Xin hãy nhập email!",
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Xin hãy nhập mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Item>

        <Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Xin hãy nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Mật khẩu không trùng nhau!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Item>

        <Item
          name="username"
          label={
            <span>
              Username&nbsp;
              <Tooltip title="Bạn muốn người khác gọi bạn là gì?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Xin hãy nhập username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Item>

        <Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Item>
      </Form>
    </DivSigin>
  );
};

export default Signin;
