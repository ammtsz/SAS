import React from "react";
import { NavbarStyled, Logo, UserBox, Name, Login } from "./navbar.styles";

const Navbar = ({user}) => {

  return (
    <NavbarStyled>
      <Logo>Teste Dev Frontend</Logo>
      <UserBox>
        <Name>{user ? `Hello, ${user}` : ""}</Name>
        {user ? (
          <Login href="#">Exit</Login>
        ) : (
          <Login href="#">Login</Login>
        )}
      </UserBox>
    </NavbarStyled>
  );
};

export default Navbar;
