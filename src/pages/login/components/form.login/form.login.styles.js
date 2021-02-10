import styled from "styled-components";
import { CardContainer, Button } from "../../../../components/UI";
import {
  navbarHeight,
  colorDarkBlue,
  colorDarkBlue20,
  colorDarkBlue50,
} from "../../../../components/UI/variables";

export const PageLogin = styled.section`
  min-height: calc(100vh - ${navbarHeight});
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const CardForm = styled(CardContainer)`
  width: 400px;
  padding: 50px 75px;
  margin: 50px 0;
  height: 100%;
`;

export const FormTitle = styled.h4`
  font-size: 1.5rem;
  text-align: center;
  color: ${colorDarkBlue};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonLogin = styled(Button)`
  background-color: ${colorDarkBlue};
  margin-top: 32px;

  &:hover {
    background-color: ${colorDarkBlue20};
  }
  &:last-child {
    margin-top: 4px;
    background-color: ${colorDarkBlue50};
    &:hover {
      background-color: ${colorDarkBlue20};
    }
  }
`;
