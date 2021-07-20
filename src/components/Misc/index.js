import styled from 'styled-components';

const SmallTitle=styled.h3`
    text-align: center;
    margin-block: 2em;
    @media (max-width:570px){
        margin-block: 1em;
        font-size:14px
    }
`
const Title = styled.h1`
    text-align: center;
    margin-block: 2em;
    @media (max-width:570px){
        margin-block: 1em;
        font-size:30px
    }
`
const Form=styled.form`
    display:flex;
    flex-direction:column;
`
const Input=styled.input`
    margin-block:1.2em;
    padding: 10px;
    border-radius:10px;
    border:2px solid white;
    background-color:transparent;
    color:white;
    :focus{outline:none;}
`
export {Input}
export {Form}
export {SmallTitle}
export {Title}