import React from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { OptionLink, OptionsContainer, FooterContainer} from './footer.styles'



const Footer=()=>(
    
    <FooterContainer>
        
        
        <OptionsContainer>
            <OptionLink to="/privacy"> 
                <h3>PRIVACY POLICY</h3>
            </OptionLink>
            <OptionLink to="/refund"> 
                <h3>REFUND POLICY</h3>
            </OptionLink>
            
            <OptionLink to="/shiping"> 
                <h3>SHIPPING POLICY</h3>
            </OptionLink>
            <OptionLink to="/terms"> 
                <h3>TERMS AND CONDITIONS</h3>
            </OptionLink>
            
        </OptionsContainer>
       
    </FooterContainer>
);




export default Footer;