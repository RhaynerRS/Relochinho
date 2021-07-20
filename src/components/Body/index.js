import styled from 'styled-components';

const Body=styled.body`

    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    transition: 0.5s;
    :focus{outline:none;}
    ${({status})=>status==='study' && 'background-color:black;color: white;' || status==='break' && 'background-color:white;color: black;'}
`

export default Body;