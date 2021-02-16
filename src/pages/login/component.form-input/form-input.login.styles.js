import styled from "styled-components";

export const FormInputBox = styled.div`
  display: flex;
  height: 2rem;
  margin-bottom: 1rem;

  border-radius: 8px;
  
  color: ${({ theme }) => theme.text3};

  & label {
    align-self: center;
    margin-right: 0.7rem;
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.text3};
  background-color: transparent;
  
  color: ${({ theme }) => theme.text3};
  
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
  }
`;
