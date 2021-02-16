import React from "react";
import { FormInputBox, Input } from "./form-input.login.styles";

const FormInput = ({
  label,
  handleChange,
  id,
  placeholder,
  ...otheInputProps
}) => (
  <FormInputBox className="form-input__box">
    <label htmlFor={id} aria-label={placeholder}>
      {label}
    </label>
    <Input
      id={id}
      className="form-input__input"
      placeholder={placeholder}
      onChange={handleChange}
      {...otheInputProps}
    />
  </FormInputBox>
);

export default FormInput;
