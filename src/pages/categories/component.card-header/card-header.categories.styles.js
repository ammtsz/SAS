import styled from "styled-components";

export const CardHeaderStyled = styled.div`
  color: ${({ theme }) => theme.text4};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  .category-card__link {
    margin-left: auto;
    cursor: pointer;
    &:hover {
      font-weight: 700;
      text-decoration: underline;
    }
  }
`;
