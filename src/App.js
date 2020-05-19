import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import RootLayout from './RootLayout'
import Auth from './scenes/Auth'
import { connect } from 'react-redux'
import { getToken } from './common/jwt'

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  console.log('app auth', isAuthenticated)
  return (
    <Route 
      {...rest}
      render={({ location }) => isAuthenticated ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: '/auth',
              from: location.pathname
            }}
          />
        )}  
    />
  )
}

function App({ isAuthenticated }) {
  return (
    <div className="App">
      <Switch>
        <Route path='/auth' render={({ location: { from }}) => isAuthenticated ? <Redirect to='/' /> : <Auth from={from} /> } />

        <PrivateRoute isAuthenticated={isAuthenticated}>
          <RootLayout />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default connect(
  (state) => ({
    isAuthenticated: state.user.isAuthenticated
  })
)(App);
