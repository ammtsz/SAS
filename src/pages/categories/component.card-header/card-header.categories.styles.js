import styled from "styled-components";

export const CardHeaderStyled = styled.div`
  color: ${({ theme }) => theme.text4};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  font-size: 0.85rem;

  .category-card__link {
    outline: none;
    margin-left: auto;
    cursor: pointer;

    &:hover,
    &:focus {
      font-weight: 700;
      text-decoration: underline;
    }
  }
`;
