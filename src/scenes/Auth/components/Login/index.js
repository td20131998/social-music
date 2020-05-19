import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from 'services/users/api'
import { connect } from 'react-redux'
import { initUserInfo, setAuthenticate } from 'services/users/actions'
import { setToken, decodeJwt } from 'common/jwt'

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        username: "",
        password: "",
      },
    };

    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }

  onFinish(values) {
    const { dispatch } = this.props
    login(values).then(res => {
      if (res.status !== 1) {
        alert('login faild')
      } else {
        const token = res.result.token
        setToken(token)
        let decodedJwt = decodeJwt()

        if (decodedJwt && decodedJwt.userInfo) {
          delete decodedJwt.userInfo.comments
          delete decodedJwt.userInfo.likes
          delete decodedJwt.userInfo.password
        }

        dispatch(initUserInfo(decodedJwt.userInfo))
        dispatch(setAuthenticate(true))

        if (this.props.from) {
          this.props.history.push(this.props.from);
        } else {
          this.props.history.push("/");
        }
      }
    })
  }

  onFinishFailed() {
    console.log("login failed");
  }

  render() {
    return (
      <DivLogin>
        Đăng nhập
        <Form
          name="login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
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
                message: "Please input your Password!",
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

            <Link to="/reset" className="login-form-forgot">
              Forgot password
            </Link>
          </Item>

          <Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Item>
        </Form>
      </DivLogin>
    );
  }
}

export default connect()(Login);
