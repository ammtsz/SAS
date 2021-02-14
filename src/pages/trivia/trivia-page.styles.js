import styled from "styled-components";
import { CardContainer, Button } from "../../assets/css";
import {
  navbarHeight,
  colorWhite,
  colorGrey,
  colorBlack25,
  fontAvenir,
  mq_md,
  mq_xs,
} from "../../assets/css/variables";

export const PageTrivia = styled.section`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - ${navbarHeight});
`;
export const ContainerTrivia = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 26px;
  width: 700px;
  @media (max-width: ${mq_xs}) {
    margin: 0;
  }
`;

export const CardTrivia = styled(CardContainer)`
  display: flex;
  flex-direction: column;
  padding: 32px 40px 27px 40px;
  margin-bottom: 50px;

  @media (max-width: ${mq_md}) {
    padding: 32px 24px 24px 24px;
  }
  @media (max-width: ${mq_xs}) {
    padding: 32px 0 24px 0;
  }
`;

export const AnswerBtnContainer = styled.div`
  @media (max-width: ${mq_xs}) {
    display: flex;
    position: sticky;
    bottom: 0;
    background: ${({ theme }) => theme.cards};

    box-shadow: ${({ sticky }) =>
      sticky ? `0px -1px 4px ${colorBlack25}` : "none"};
  }
`;

export const AnswerBtn = styled(Button)`
  display: block;
  margin: auto;
  margin-top: 40px;

  background: ${colorGrey};

  font-family: ${fontAvenir};

  @media (max-width: ${mq_md}) {
    width: 100%;
  }
  @media (max-width: ${mq_xs}) {
    margin: 16px 24px;
  }

  &:disabled {
    &:hover {
      background: ${colorGrey};
    }
  }
`;
