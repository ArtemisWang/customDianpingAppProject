import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isLogin } from "../../redux/modules/login";

class PrivateRoute extends Component {
  render() {
    const { component: Component, login, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return login ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    login: isLogin(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
