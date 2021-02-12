import React from "react";
import { NavbarStyled, Logo, UserBox, Name, Login } from "./navbar.styles";

const NavbarRender = ({user, signOut, goToLogin, history, goToCategories}) => {

  return (
    <NavbarStyled>
      <Logo>Teste Dev Frontend</Logo>
      <UserBox>
        <Name>{user ? `Hello, ${user.displayName}` : ""}</Name>
        {user ? (
          <Login onClick={() => signOut()}>Exit</Login>
        ) : (
          history.location.pathname === "/login" 
            ?
            <Login onClick={() => goToCategories()}>continue without login</Login>
            :
            <Login onClick={() => goToLogin()}>Login</Login>
        )}
      </UserBox>
    </NavbarStyled>
  );
};

export default NavbarRender;