import styled from "styled-components";
import {
  colorWhite,
  colorDarkBlue40,
  colorLight,
  colorBlue,
  colorDarkBlue,
} from "./variables.js";

export const CardContainer = styled.div`
  background-color: ${colorWhite};
  border: 1px solid ${colorLight};
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px ${colorDarkBlue40};
`;

export const Button = styled.button`
  padding: 11px 24px;

  background: ${colorBlue};
  border: none;
  border-radius: 8px;

  color: ${colorWhite};
  font-size: 1rem;
  line-height: 1.5rem;

  cursor: pointer;

  &:hover {
    background: ${colorDarkBlue};
  }
`;
