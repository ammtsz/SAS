import React from "react";
import { FormInputBox, Input } from "./form-input.login.styles"

const FormInput = ({ label, handleChange, ...otheInputProps }) => (
  <FormInputBox className="form-input__box">
    {label}
    <Input className="form-input_" {...otheInputProps} onChange={handleChange} />
  </FormInputBox>
);

export default FormInput;
