import React from "react";
import { FormInputBox, Input } from "./form-input.login.styles"

const FormInput = ({ label, handleChange, id, ...otheInputProps }) => (
  <FormInputBox className="form-input__box">
    <label htmlFor={id} >{label}</label>
    <Input id={id} className="form-input_" {...otheInputProps} onChange={handleChange} />
  </FormInputBox>
);

export default FormInput;
