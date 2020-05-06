import React from "react";
import { Form, Input, Button, Checkbox, Tabs, Row } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Login from './components/Login'
import Signin from './components/Signin'
import {
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import styled from "styled-components";

const DivAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <DivAuth>
        <Switch>
            <Route exact path='/auth' render={() => <Redirect from='/' to={{
                pathname: '/auth/login',
                state: { from: this.props.from }
            }} />} />
            <Route path='/auth/login' render={({ history, location: { state: { from }} }) => <Login history={history} from={from} />} />
            <Route path='/auth/signin' component={Signin} />
        </Switch>
      </DivAuth>
    );
  }
}

export default Auth;
