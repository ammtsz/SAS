import styled from "styled-components"
import { colorDarkBlue } from "../../../../components/UI/variables";

export const FormInputBox = styled.div`
    height: 2rem;
    border-radius: 8px;
    display: flex;
    margin-top: 1rem;
    color: ${colorDarkBlue};

    & label{
        align-self: center;
        margin-right: 0.7rem;
    }
`

export const Input = styled.input`
    flex-grow: 1;
    border: none;
    border-bottom: 1px solid ${colorDarkBlue};
    background-color: transparent;
    &:focus{
        outline: none;
    }
    &::placeholder{
        font-size: 1rem;
    }
`