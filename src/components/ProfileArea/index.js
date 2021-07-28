import styled from 'styled-components';
const ProfileArea = styled.div`
    position:fixed;top:1em;left:1em;
    display:flex;align-items: center;
    ${({ status }) => status === 'study' && 'color: white;' || status === 'break' && 'color: white;'}
`
const ProfileImage = styled.img`
    border-radius: 50%;
    max-width: 50px;
    width:50px;height:50px;
    :hover{cursor:pointer;}
    @media (max-width:570px){
    width:45px;height:45px;
    
    }
`
const ProfileLabel = styled.label`
    font-family:sans-serif;
    font-size:20px;
    margin-left:1em;
    @media (max-width:570px){
        font-size:14px
    }
   

`
const ProfileModal = styled.div`
    position:absolute;
    border-radius:10px;
    width:30%;
    height:35%;
    z-index:2000000000000;
    background-color:white;
    justify-content: center;
    flex-direction: column;
    padding:60px;    
    color:black;
    
    @media (max-width:570px){
        width:65%;
        height:70%;
        padding:45px;
    
    }
`
const ProfileModalImage = styled.img`
    border-radius: 50%;
    max-width: 150px;
    width:150px;height:150px;
    border:12px solid white;
    position: absolute;
	left: 0;
	right: 0;
	margin: auto;
    top:-81px;
    @media (max-width:570px){
    width:90px;height:90px;
    top:-35px;border:6px solid white;
    }
`
export { ProfileModalImage };
export { ProfileModal };
export { ProfileLabel };
export { ProfileImage };
export { ProfileArea };