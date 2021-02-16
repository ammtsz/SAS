import styled from 'styled-components';
import {colorGrey, colorDarkBlue, navbarHeight}  from "../../assets/css/variables"


export const SpinnerOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(100vh - ${navbarHeight});
  width: 100%;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  
  width: 50px;
  height: 50px;
  border: 3px solid ${colorDarkBlue};
  border-radius: 50%;
  border-top-color: ${colorGrey};
  
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
