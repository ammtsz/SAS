import styled from "styled-components";
import { Button } from "../../../../components/UI";
import {
  colorWhite,
  colorDarkBlue,
  colorDarkBlue08,
  fontAvenir,
  mq_sm,
  mq_xs,
} from "../../../../components/UI/variables";

const cardHeaderHeight = "237px";
const cardHeaderHeightXS = "214px";

export const CardBodyTrivia = styled.p`
  margin-top: ${cardHeaderHeight};
  padding-top: 57px;
  padding-bottom: 27px;
  @media (max-width: ${mq_xs}) {
    margin-top: ${cardHeaderHeightXS};
    padding: 37px 22px 16px 22px;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const BodyTitle = styled.p`
  position: absolute;
  top: calc(${cardHeaderHeight} - 35px / 2);
  @media (max-width: ${mq_xs}) {
    top: calc(${cardHeaderHeightXS} - 35px / 2);
  }

  left: 50%;
  transform: translate(-50%);
  width: 280px;
  padding: 8px 6px;
  box-sizing: border-box;

  background: ${colorWhite};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  font-family: ${fontAvenir};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2rem;
  text-align: center;
  color: ${colorDarkBlue};
`;

export const ResultsSumary = styled.p`
  display: flex;
  justify-content: space-between;
  width: 199px;
  padding: 4px 32px;

  background: ${colorDarkBlue08};
  border-radius: 10px;

  text-align: center;

  .sumary__number {
    font-family: ${fontAvenir};
    font-size: 28px;
    line-height: 36px;
  }

  .sumary__text {
    font-family: ${fontAvenir};
    font-size: 13px;
    line-height: 18px;
  }
`;

export const ResultsDetails = styled.div`
  display: flex;

  .level__details {
    padding: 0 48px;
    margin: 40px 0 58px 0;
    border-right: 1px solid #b8bed5;

    &:last-child {
      border: none;
    }

    .level__details--title,
    .level__details--info {
      font-family: ${fontAvenir};
      font-size: 0.875rem;
      line-height: 1.25rem;
      letter-spacing: 0.4px;
      color: ${colorDarkBlue};
    }
  }

  @media (max-width: ${mq_sm}) {
    .level__details {
      padding: 0 8vw;
    }
  }

  @media (max-width: ${mq_xs}) {
    flex-direction: column;
    text-align: center;
    margin: 35px 0 40px 0;

    .level__details {
      border: none;
      margin: 0 0 46px 0;
      &:last-child {
        margin-bottom: 0;
      }

      .level__details--title {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
  }
`;

export const GoBackBtn = styled(Button)`
  display: block;
  margin: 0 auto;

  font-family: ${fontAvenir};

  @media (max-width: ${mq_xs}) {
    width: 100%;
  }
`;
