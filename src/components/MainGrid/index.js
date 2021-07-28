import styled from 'styled-components';
const MainGrid = styled.main`
width:100%;
grid-gap:50px;
margin-left:auto;
margin-right:auto;
max-width: 500px;
display:flex;
align-items:center;justify-content:center;place-items:center;
@media (max-width:570px){
    max-width: 200px;grid-gap:20px;
}
`
export default MainGrid;