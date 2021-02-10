import React from "react";
import {
  ButtonSwitch,
  ButtonSwitchContainer,
  Input,
  Slider,
} from "./button-switch.styles.js";

const ButtomSwitch = ({ label, id, ...otherSwitchProps }) => (
  <ButtonSwitch>
    <ButtonSwitchContainer>
      <Input
        type="checkbox"
        id={`button-switch--${id}`}
        {...otherSwitchProps}
      />
      <Slider className="slider round"></Slider>
    </ButtonSwitchContainer>

    <label htmlFor={`button-switch--${id}`}>{label}</label>
  </ButtonSwitch>
);

export default ButtomSwitch;