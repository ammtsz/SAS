import styled from "styled-components";
import { colorWhite, colorBlack, mq_xs } from "../../assets/css/variables";

export const NavbarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 16px 26px;

  background: ${({ theme }) => theme.navbar};
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

  @media (max-width: ${mq_xs}) {
    display: none;
  }
`;
export const Login = styled.button`
  align-self: center;
  margin-right: 1rem;

  border: none;
  background-color: transparent;

  font-size: 0.75rem;
  color: ${colorWhite};

  cursor: pointer;

  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const SwitchButtonStyled = styled.span`
  color: ${colorWhite};
  align-self: center;

  input:checked + .slider {
    background-color: ${colorBlack};
  }
  span:before {
    background-color: ${({ theme }) => theme.btnTheme};
  }
`;
