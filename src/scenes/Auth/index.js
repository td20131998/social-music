import React from "react";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Reset from "./components/Reset";
import Active from "./components/Active";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const DivAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Auth = function ({ from, isActive }) {
  return (
    <DivAuth>
      <Switch>
        <Route
          exact
          path="/auth"
          render={() => (
            <Redirect
              from="/"
              to={{
                pathname: "/auth/login",
                state: { from: from },
              }}
            />
          )}
        />
        <Route
          path="/auth/login"
          render={({ history, location }) => {
            let from = undefined;
            if (location && location.state) {
              from = location.state.from;
            }
            return <Login history={history} from={from} />;
          }}
        />
        <Route path="/auth/signin" component={Signin} />

        <Route path="/auth/reset" component={Reset} />

        <Route path="/auth/active" component={Active} />
      </Switch>
    </DivAuth>
  );
};

export default connect((state) => ({ isActive: state.user.isActive }))(Auth);
