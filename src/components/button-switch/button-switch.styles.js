import styled from "styled-components";
import { colorWhite, colorGrey, colorDarkBlue } from "../../assets/css/variables";


/* The switch - the box around the slider */
export const ButtonSwitch = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;

  .button-switch--label{
    font-size: 0.8rem;
  }
`;

export const ButtonSwitchContainer = styled.label`
  margin-top: auto;
  margin-bottom: auto;
  position: relative;
  display: inline-block;
  min-width: 30px;
  height: 17px;
  margin-right: 5px;
  transform: scale(0.8);

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

/* The slider */
export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colorGrey};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  &:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: ${colorWhite};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  /* Rounded sliders */
  &.round {
    border-radius: 17px;
  }

  &.round:before {
    border-radius: 50%;
  }
`;

export const Input = styled.input`
  &:checked + .slider {
    background-color: ${({theme}) => theme.btnSwitcher};
  }

  &:focus + .slider {
    box-shadow: 0 0 1px ${colorDarkBlue};
  }
  &:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
`;
