import styled from "styled-components";
import { CardContainer } from "../../assets/css";
import {
  navbarHeight,
  mq_xs,
} from "../../assets/css/variables";


export const PageReport = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 63px;
  padding-bottom: 50px;

  min-height: calc(100vh - ${navbarHeight});

  @media (max-width: ${mq_xs}) {
    padding: 0;
  }
`;

export const CardReport = styled(CardContainer)`
  position: relative;
  display: flex;
  flex-direction: column;

  width: min(534px, 100vw);
  height: 100%;
`;
