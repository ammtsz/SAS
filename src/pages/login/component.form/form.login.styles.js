import styled from "styled-components";
import { CardContainer, Button } from "../../../assets/css";
import { navbarHeight } from "../../../assets/css/variables";

export const PageLogin = styled.section`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - ${navbarHeight});
  width: 100vw;
`;

export const CardForm = styled(CardContainer)`
  width: 400px;
  height: 100%;
  padding: 50px 75px;
  margin: 50px 0;
`;

export const FormTitle = styled.h4`
  margin-bottom: 1.5rem;

  font-size: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.text3};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonLogin = styled(Button)`
  margin-top: 32px;

  background-color: ${({ theme }) => theme.btn1};
  box-shadow: ${({ theme }) => theme.shadow};

  color: ${({ theme }) => theme.cards};

  &:hover {
    background-color: ${({ theme }) => theme.btnHover};
    color: ${({ theme }) => theme.text1};
  }
  &:last-child {
    margin-top: 4px;
    background-color: ${({ theme }) => theme.btn2};
    &:hover {
      background-color: ${({ theme }) => theme.btnHover};
      color: ${({ theme }) => theme.text1};
    }
  }
`;
