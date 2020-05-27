import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from 'react-router-dom'
import { apiResendActiveUser } from 'services/user/api'

const Active = function () {
  function onFinish(values) {
    apiResendActiveUser(values)
      .then(res => {
        console.log(res)
      })
  }
  function onFinishFailed() {
    message.warning("Vui lòng kiểm tra lại thông tin!")
  }
  
  return (
    <>
    Xin hãy cung cấp email bạn đã đăng kí!
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
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
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Kích hoạt
        </Button>

        <Link to="/auth/login" style={{ float: 'right' }}>Đăng nhập</Link>
      </Form.Item>
    </Form>
    </>
  );
};

export default Active;
