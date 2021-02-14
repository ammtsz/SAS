import styled from "styled-components";
import {
  navbarHeight,
  mq_lg,
  mq_md,
  mq_sm,
  mq_xs,
} from "../../assets/css/variables";

export const PageCategories = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  
  max-width: min(1028px, calc(100vw - 2 * 40px));
  min-height: calc(100vh - ${navbarHeight});

  @media (max-width: ${mq_lg}) {
    margin: 0 40px;
    max-width: 100vw;
  }
  @media (max-width: ${mq_md}) {
    margin: 0 32px;
  }
  @media (max-width: ${mq_sm}) {
    margin: 0 24px;
  }
  @media (max-width: ${mq_xs}) {
    margin: 0 16px;
  }
`;

export const Title = styled.h1`
  margin-top: 48px;
  margin-bottom: 32px;
  align-self: flex-start;
  
  font-weight: 500;
  font-size: 2.75rem;
  line-height: 3.5rem;
  color: ${({theme}) => theme.text2};

  @media (max-width: ${mq_md}) {
    margin-top: 40px;
  }
  @media (max-width: ${mq_sm}) {
    margin-top: 32px;
    margin-bottom: 16px;
  }
`;

export const CardsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 50px;

  width: 100%;
`;

