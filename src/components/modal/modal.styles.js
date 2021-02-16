import styled from "styled-components";
import { CardContainer, Button } from "../../assets/css/index";
import { colorRed, colorGreen } from "../../assets/css/variables";

export const PageModal = styled.section`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.bg50};

  z-index: 10;
`;

export const CardModal = styled(CardContainer)`
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 50%);
  width: 328px;
  height: 228px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  border: ${(props) =>
    props.right ? `3px solid ${colorGreen}` : `3px solid ${colorRed}`};
`;

export const Icon = styled.img`
  height: 47px;
`;

export const Message = styled.p`
  margin: 14px 0 31px 0;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2rem;

  color: ${({ theme }) => theme.text3};

  outline: none;
`;

export const NextBtn = styled(Button)`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);

  font-weight: bold;

  outline: none;

  cursor: pointer;

  .modal__nextButton--icon {
    vertical-align: middle;
    margin-left: 20px;
  }
`;
