import styled from "styled-components";
import {
  colorWhite,
  colorLightBlue,
  fontAvenir,
  mq_xs,
} from "../../../assets/css/variables";

const cardHeaderHeight = "237px";
const cardHeaderHeightXS = "214px";

export const CardHeaderTrivia = styled.div`
  position: absolute;
  width: min(534px, 100vw);
  height: ${cardHeaderHeight};
  @media (max-width: ${mq_xs}) {
    height: ${cardHeaderHeightXS};
  }
  left: -1px;
  top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px 8px 0 0;
  background: ${colorLightBlue};
`;

export const HeaderImage = styled.img`
  height: 115px;
`;

export const HeaderText = styled.div`
  margin-left: 26px;
  color: ${colorWhite};
`;

export const HeaderTitle = styled.h2`
  font-family: ${fontAvenir};
  font-size: 2.25rem;
  line-height: 3rem;
  font-weight: 400;
  @media (max-width: ${mq_xs}) {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

export const HeaderMessage = styled.p`
  font-family: ${fontAvenir};
  font-size: 1.125rem;
  line-height: 1.5rem;
  @media (max-width: ${mq_xs}) {
    font-size: 1rem;
  }
`;
