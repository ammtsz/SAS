import styled from "styled-components"
import { colorDarkBlue, colorDarkGrey } from "../../../../components/UI/variables";

export const FormInputBox = styled.div`
    height: 2.5rem;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1rem;
    i{
        color: ${colorDarkBlue};
        padding: 0 10px 0 5px;
    }

    & label{
        color:${colorDarkBlue};
        align-self: flex-end;
        margin-right: 1rem;

    }
`

export const Input = styled.input`
    flex-grow: 1;
    border: none;
    border-bottom: 1px solid ${colorDarkBlue};
    background-color: transparent;
    padding: 5px;
    &:focus{
        outline: none;
    }
    &::placeholder{
        color:${colorDarkGrey};
        font-size: 1rem;
    }
`