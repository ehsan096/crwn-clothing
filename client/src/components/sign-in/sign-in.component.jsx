import React ,{useState}from 'react';
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";
import './sign-in.styles.scss';

const SignIn=({emailSignInStart, googleSignInStart})=>{
    const [userCredentials, setUserCredential] = useState({email: '', password: ''})
    
    const {email, password}= userCredentials;
    const handleSubmit = async event =>{
        event.preventDefault();
        emailSignInStart(email, password);

        
    }
    const handleChange = event =>{
        const {value , name} = event.target;
        setUserCredential({ ...userCredentials ,[name]: value});
    }

        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form  onSubmit={handleSubmit}>
                    <FormInput 
                        type="email" 
                        name='email' 
                        label ='email'
                        handleChange ={handleChange}
                        value={email} required 
                    />
                    <FormInput 
                        type="password" 
                        name='password'
                        label= 'password'
                        handleChange ={handleChange}
                        value={password} required 
                    />

                   <div className='buttons'>
                    <CustomButton type="submit" > Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In With GOOGLE</CustomButton>
                   </div>
                </form>

            </div>
        )
    }


const mapDispatchToProps= dispatch=>({
    googleSignInStart: ()=>dispatch(googleSignInStart()),
    emailSignInStart: (email, password)=>dispatch(emailSignInStart({email, password})) 
})

export default connect(null, mapDispatchToProps)(SignIn);
