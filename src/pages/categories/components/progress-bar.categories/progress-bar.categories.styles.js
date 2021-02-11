import styled from "styled-components";
import {
  colorDarkBlue,
  colorDarkBlue20,

} from "../../../../components/UI/variables";

export const FullBar = styled.div`
  display: flex;
  width: 100%;
  height: 5px;
  flex-grow: 1;
  background-color: ${colorDarkBlue20};
`

export const ProgressUnit = styled.span`
  height: 100%;
  flex-grow: 1;
  &.colored{
  background-color: ${colorDarkBlue};
  }
`;
