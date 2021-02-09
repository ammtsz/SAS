import styled from "styled-components";
import {
  colorDark,
  colorDarkGrey,
  mq_xs,
} from "../../../../components/UI/variables";


export const HeaderTrivia = styled.header`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${mq_xs}) {
    margin: 0 16px;
  }
`;

export const CategoryName = styled.h4`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
  color: ${colorDark};
  margin: 10px 0;
`;
export const CloseButton = styled.button`
  display: flex;
  margin: 0.5rem;
  align-self: center;
  align-items: center;

  height: 20px;
  width: 75px;
  border: none;
  background-color: transparent;

  color: ${colorDarkGrey};
  font-style: normal;
  font-weight: bold;
  font-size: 0.875rem;
  letter-spacing: 0.4px;

  cursor: pointer;
`;
export const CloseIcon = styled.img`
  margin-right: 7px;
`;
