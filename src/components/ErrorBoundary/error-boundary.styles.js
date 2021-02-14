import styled from 'styled-components';
import { navbarHeight } from "../../assets/css/variables"

export const ErrorImageOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: calc(100vh - ${navbarHeight});
  width: 100%;
`;

export const ErrorImageContainer = styled.div`
  display: inline-block;
  
  width: 40vh;
  height: 40vh;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
`;

export const ErrorImageText = styled.h2`
  font-size: 1.5rem;
  color: ${({theme}) => theme.text3};
`;
