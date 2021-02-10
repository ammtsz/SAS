import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCredentials } from "../../redux/user/user.selectors";
import { actionSignOut } from "../../redux/user/user.actions";

import { withRouter } from "react-router";

import NavbarRender from "./navbar.render"
const Navbar = (props) => {

  const {history} = props
  
  const goToLogin = () => {
    history.push("/login")
  }
  return (
    <NavbarRender {...props} goToLogin={goToLogin}/>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCredentials,
});
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(actionSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));