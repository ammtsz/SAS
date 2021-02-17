import styled from "styled-components";
import {
  colorGrey,
  colorBlue,
  colorBlack,
  mq_md,
  mq_xs,
  cardMargin_mq_xs,
} from "../../../assets/css/variables";

export const Question = styled.h4`
  margin-bottom: 30px;

  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.text2};

  @media (max-width: ${mq_md}) {
    margin-bottom: 24px;
    line-height: 1.4rem;
  }
  @media (max-width: ${mq_xs}) {
    margin-bottom: 16px;
  }
  ${cardMargin_mq_xs}
`;

export const AnswerOptionCard = styled.button`
  display: flex;
  min-height: 60px;
  margin: 8px 0;
  padding: 12px 16px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.cards};
  box-shadow: 0px 1px 2px ${({ theme }) => theme.shadow};
  border: 1px solid ${colorGrey};
  border-radius: 8px;

  text-align: start; 
  cursor: pointer;

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.cardHover};
  }

  &:hover {
    background-color: ${({ theme }) => theme.cardHover};
  }

  &.option__selected {
    border: 3px solid ${colorBlue};
  }

  ${cardMargin_mq_xs}
`;

export const AnswerText = styled.p`
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.text2};

  outline: none;
`;
