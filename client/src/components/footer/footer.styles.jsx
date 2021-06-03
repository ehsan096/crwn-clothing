import styled  from "styled-components";
import { Link } from "react-router-dom";


export const FooterContainer = styled.div`
    height: 170px;
    width: 100%;
    margin-bottom: 25px;
    background-color: #e1e5ea;
    position: relative;
    bottom: 0;
    @media screen and (max-width: 800px){
        heigh: 100px;
        padding: 10px;
        margin-top: 20px
    }
`;



export const OptionsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 25px;
    @media screen and (max-width: 800px){
        width: 80%;
    }
`;

export const OptionLink = styled(Link)`
    padding: 10px 10px;
    cursor: pointer;
    color: #4e3620;
`;

