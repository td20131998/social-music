import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { apiLogin } from "services/user/api";
import { connect } from "react-redux";
import { initUserInfo, setAuthenticate } from "services/user/actions";
import { setToken, decodeJwt } from "common/jwt";

const { Item } = Form;

const DivLogin = styled.div`
  height: 320px;
  width: 300px;
  border: 1px solid #40a9ff;
  padding: 10px;
  .login-form-button {
    width: 100%;
  }
`;

const Login = function ({ dispatch, from, history }) {
  function onFinish(values) {
    apiLogin(values).then((res) => {
      if (res.status !== 1) {
        message.error("Login failed!")
      } else {
        const token = res.result.token;
        setToken(token);
        let decodedJwt = decodeJwt();

        if (decodedJwt && decodedJwt.userInfo) {
          delete decodedJwt.userInfo.comments;
          delete decodedJwt.userInfo.likes;
          delete decodedJwt.userInfo.password;
        }

        dispatch(initUserInfo(decodedJwt.userInfo));
        dispatch(setAuthenticate(true));

        if (from) {
          history.push(from);
        } else {
          history.push("/");
        }
      }
    });
  }

  function onFinishFailed() {
    message.warning("Vui lòng kiểm tra lại thông tin đăng nhập!")
  }

  return (
    <DivLogin>
      Đăng nhập
      <Form
        name="login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item
          name="username"
          rules={[
            {
              required: true,
              message: "Xin hãy nhập Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: "Xin hãy nhập mật khẩu!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Item>
        <Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link to="/auth/reset" className="login-form-forgot">
            Quên mật khẩu?
          </Link>
        </Item>

        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          Hoặc <Link to="/auth/signin">Đăng kí!</Link>
        </Item>
      </Form>
    </DivLogin>
  );
};

export default connect()(Login);
