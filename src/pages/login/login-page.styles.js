import styled from "styled-components";
import { CardContainer } from "../../assets/css";
import { navbarHeight, mq_xs } from "../../assets/css/variables";

export const PageLogin = styled.section`
  display: flex;
  justify-content: center;

  width: 100vw;
  min-height: calc(100vh - ${navbarHeight});
  
  color: ${({theme}) => theme.text1};
`;

export const CardForm = styled(CardContainer)`
  width: max(30vw, 400px);
  height: 100%;
  margin: 10vh 0;
  padding: 50px 75px;

  @media (max-width: ${mq_xs}) {
    height: 100%;
    margin: 0;
    padding: 50px 20px;
  }
`;
