import styled from "styled-components";
import {
  colorDark,
  colorDarkBlue70,
  mq_md,
  mq_sm,
  mq_xs,
} from "../../../../components/UI/variables";
import { CardContainer } from "../../../../components/UI";

export const CardCategory = styled(CardContainer)`
  display: flex;
  flex-direction: column;
  justify-content:  ${(props) => (props.done ? "space-between" : "flex-end")};
  height: 100%;

  padding: 16px;

  min-height: 104px;
  word-break: break-word;
  cursor: pointer;

  .card__results {
    color: ${colorDarkBlue70};
    display: flex;
    justify-content: space-between;
    width: 100%;
    a:hover{
      font-weight: 700;
      text-decoration: underline;
    }
  }

  // medium to extra-large screen (>=768)
  // 4 cards and my-24px mx-24px
  @media (min-width: calc(${mq_md} + 1px)) {
    margin-bottom: 24px;
    margin-right: 24px;

    flex-basis: calc(25% - (3 * 24px) / 4);

    &:nth-child(4n) {
      margin-right: 0;
    }

    &:first-child,
    &:nth-child(4n + 1) {
      margin-left: 0;
    }
  }

  // small to medium screen (576 to 768)
  // 4 cards and my-24px mx-24px
  @media (min-width: calc(${mq_sm} + 1px)) and (max-width: ${mq_md}) {
    margin-bottom: 24px;
    margin-right: 24px;

    flex-basis: calc(25% - (3 * 24px) / 4);

    &:nth-child(4n) {
      margin-right: 0;
    }

    &:first-child,
    &:nth-child(4n + 1) {
      margin-left: 0;
    }
  }

  // extra-small to small screen (375 to 576)
  // 3 cards and my-16px mx-16px
  @media (min-width: calc(${mq_xs} + 1px)) and (max-width: ${mq_sm}) {
    margin-bottom: 16px;
    margin-right: 16px;

    flex-basis: calc(33.3% - (2 * 16px) / 3);
    &:nth-child(3n) {
      margin-right: 0;
    }

    &:first-child,
    &:nth-child(3n + 1) {
      margin-left: 0;
    }
  }

  // 0 to extra-small screen (<375)
  // 2 cards and my-16px mx-16px
  @media (max-width: ${mq_xs}) {
    margin-right: 16px;
    margin-bottom: 16px;

    flex-basis: calc(50% - (1 * 16px) / 2);

    &:nth-child(2n) {
      margin-right: 0;
    }
    &:nth-child(2n + 1) {
      margin-left: 0;
    }
  }
`;

export const CategoryName = styled.h2`
  text-align: start;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: ${(props) => (props.done ? colorDarkBlue70 : colorDark)};
`;
