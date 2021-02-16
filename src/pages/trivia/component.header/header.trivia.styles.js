import styled from "styled-components";
import {
  mq_xs,
} from "../../../assets/css/variables";


export const HeaderTrivia = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${mq_xs}) {
    margin: 0 16px;
  }
`;

export const CategoryName = styled.h4`
  margin: 10px 0;
  
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
  color: ${({theme}) => theme.text2};
`;
export const CloseButton = styled.button`
  display: flex;
  margin: 8px;
  align-self: center;
  align-items: center;

  height: 20px;
  width: 75px;
  border: none;
  background-color: transparent;

  color: ${({theme}) => theme.text5};
  font-style: normal;
  font-weight: bold;
  font-size: 0.875rem;
  letter-spacing: 0.4px;

  cursor: pointer;
`;
export const CloseIcon = styled.img`
  margin-right: 7px;
  filter: ${({theme}) => theme.icon}
`;
