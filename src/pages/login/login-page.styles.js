import styled from "styled-components";
import { CardContainer } from "../../components/UI";
import {
  navbarHeight, mq_xs
} from "../../components/UI/variables";

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

  @media (max-width: ${mq_xs}){
  padding: 50px 20px;
  margin: 0;
  height: 100%;
  }
`;
