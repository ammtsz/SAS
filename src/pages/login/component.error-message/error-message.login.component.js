import React from "react";
import {ErrorMessage} from "./error-message.login.styles";

function FormErrorMessage({ error, message, ...otherProps}) {
  return error ? <ErrorMessage {...otherProps}>{message}</ErrorMessage> : null;
}

export default FormErrorMessage;
