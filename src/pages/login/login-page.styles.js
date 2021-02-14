import styled from "styled-components";
import { CardContainer } from "../../assets/css";
import { navbarHeight, mq_xs } from "../../assets/css/variables";

export const PageLogin = styled.section`
  min-height: calc(100vh - ${navbarHeight});
  width: 100vw;
  display: flex;
  justify-content: center;
  color: ${({theme}) => theme.text1};
`;

export const CardForm = styled(CardContainer)`
  width: max(30vw, 400px);
  padding: 50px 75px;
  margin: 10vh 0;
  height: 100%;

  @media (max-width: ${mq_xs}) {
    padding: 50px 20px;
    margin: 0;
    height: 100%;
  }
`;
