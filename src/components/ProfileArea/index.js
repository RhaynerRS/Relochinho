import styled from 'styled-components';
const ProfileArea=styled.div`
    position:fixed;top:1em;left:1em;
    display:flex;align-items: center;
`
const ProfileImage=styled.img`
    border-radius: 50%;
    max-width: 65px;
    width:65px;height:65px;
    @media (max-width:570px){
    width:45px;height:45px;
    }
`
const ProfileLabel=styled.label`
    font-family:sans-serif;
    font-size:20px;
    margin-left:1em;
    @media (max-width:570px){
        font-size:14px
    }
`
export {ProfileLabel};
export {ProfileImage};
export {ProfileArea};