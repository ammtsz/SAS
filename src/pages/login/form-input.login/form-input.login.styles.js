import styled from "styled-components"

export const FormInputBox = styled.div`
    height: 2rem;
    border-radius: 8px;
    display: flex;
    margin-bottom: 1rem;
    color: ${({theme}) => theme.text3};


    & label{
        align-self: center;
        margin-right: 0.7rem;
    }
`

export const Input = styled.input`
    flex-grow: 1;
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.text3};
    background-color: transparent;
    color: ${({theme}) => theme.text3};
    &:focus{
        outline: none;
    }
    &::placeholder{
        font-size: 1rem;
    }
`