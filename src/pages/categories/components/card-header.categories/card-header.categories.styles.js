import styled from "styled-components";
import {
  colorDarkBlue70,
} from "../../../../components/UI/variables";

export const CardHeaderStyled = styled.div`
  color: ${colorDarkBlue70};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  a {
    margin-left: auto;
  }

  a:hover {
    font-weight: 700;
    text-decoration: underline;
  }
`;
