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
    background-color:transparent;
    :focus{outline:none;}
    ${({status})=>status==='study' && 'color: white; background:#0e2431;' || status==='break' && 'color: black; background:#0e2431;'}
    
`

export default Body;