import React from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.actions";
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { OptionLink, OptionsContainer, LogoContainer, HeaderContainer} from './header.styles'



const Header=({currentUser, hidden, signOutStart})=>(
    
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
        <OptionLink to="/"> 
                HOME
            </OptionLink>
            <OptionLink to="/shop"> 
                SHOP
            </OptionLink>
            
            <OptionLink to="/contact"> 
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
                :
                <OptionLink to="/signin">SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
        
    </HeaderContainer>
);

const mapStateToProps =createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});
 
//above code is exact same as below one

// const mapStateToProps = (state)=>({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// }); 

const mapDispatchToProps = dispatch=>({
    signOutStart: ()=> dispatch(signOutStart())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Header);