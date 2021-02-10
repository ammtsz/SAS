import React from "react";
import {ErrorMessage} from "./error-message.login.styles";

function FormErrorMessage({ error, message }) {
  return error ? <ErrorMessage>{message}</ErrorMessage> : null;
}

export default FormErrorMessage;
