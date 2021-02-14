import styled from "styled-components";

export const FullBar = styled.div`
  display: flex;
  width: 100%;
  height: 5px;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.progress1};
  margin-bottom: 5px;
`

export const ProgressUnit = styled.span`
  height: 100%;
  flex-grow: 1;
  &.colored{
  background-color: ${({ theme }) => theme.progress2};

  }
`;
