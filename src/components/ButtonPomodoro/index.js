import styled from 'styled-components';
const ButtonPomodoro=styled.button`
    padding:12.5px 30px;border-radius:10px;border:none;
    cursor: pointer;font-size:16px;text-transform:uppercase;outline:none;
    background-color: transparent;min-width:118px;

    ${({status})=>status==='study' && 'border:2px solid white;color: white;:hover{background-color: white;color:black;}' ||
    status==='break' && 'border:2px solid black;color: black;:hover{background-color: black;color:white;}'}
`
export default ButtonPomodoro;