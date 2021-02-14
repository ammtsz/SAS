import styled from "styled-components";
import {
  colorDarkBlue,
  fontAvenir,
  cardMargin_mq_xs,
} from "../../../assets/css/variables";

export const CardTriviaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  ${cardMargin_mq_xs}
`;
export const QuestionNumber = styled.h6`
  color: ${({theme}) => theme.text1};
  font-family: ${fontAvenir};
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.5rem;
`;
export const QuestionLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 14px;
  padding-left: 14px;

  height: 20px;
  border-radius: 14px;
  background-color: ${({theme}) => theme.progress1};

  font-size: 0.75rem;
  line-height: 0.875rem;
  color: ${colorDarkBlue};
`;
export const Stars = styled.span`
  margin-right: 5px;
  .starless {
    filter: brightness(5);
  }
`;
