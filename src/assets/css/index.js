import styled from "styled-components";
import { colorWhite, colorBlue, colorDarkBlue } from "./variables.js";

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.cards};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px ${({ theme }) => theme.shadow};
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
  outline: none;

  &:hover,
  &:focus {
    background: ${colorDarkBlue};
  }

  &[data-readonly="true"] {
    cursor: default;
    &:hover {
      background: ${colorBlue};
    }
  }
`;
