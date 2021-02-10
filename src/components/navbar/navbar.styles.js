import styled from "styled-components";
import { colorDarkBlue, colorWhite } from "../UI/variables";

export const NavbarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 16px 26px;

  background: ${colorDarkBlue};
`;
export const Logo = styled.h3`
  margin: 0;

  font-weight: 500;
  font-size: 1.2rem;
  color: ${colorWhite};
`;

export const UserBox = styled.div`
  display: flex;
`;

export const Name = styled.p`
  margin-right: 1rem;
  align-self: center;

  font-size: 0.75rem;
  color: ${colorWhite};
`;
export const Login = styled.button`
  align-self: center;

  border: none;
  background-color: transparent;
  
  font-size: 0.75rem;
  text-decoration: underline;
  color: ${colorWhite};
  
  cursor: pointer;

  outline: none;
`;
