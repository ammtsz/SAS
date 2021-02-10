import React from "react";
import { NavbarStyled, Logo, UserBox, Name, Login } from "./navbar.styles";

const NavbarRender = ({user, signOut, goToLogin}) => {

  return (
    <NavbarStyled>
      <Logo>Teste Dev Frontend</Logo>
      <UserBox>
        <Name>{user ? `Hello, ${user.displayName}` : ""}</Name>
        {user ? (
          <Login onClick={() => signOut()}>Exit</Login>
        ) : (
          <Login onClick={() => goToLogin()}>Login</Login>
        )}
      </UserBox>
    </NavbarStyled>
  );
};

export default NavbarRender;