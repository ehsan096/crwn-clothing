import userActionsTypes from "./user.types";

export const googleSignInStart=()=>({
    type: userActionsTypes.GOOGLE_SIGNIN_START
});

export const signInSuccess=user=>({
    type: userActionsTypes.SIGNIN_SUCCESS,
    payload: user
});

export const signInFailure = error=>({
    type: userActionsTypes.SIGNIN_FAILURE,
    payload: error
});

export const emailSignInStart= emailAndPassword =>({
    type: userActionsTypes.EMAIL_SIGNIN_START,
    payload: emailAndPassword
});

export const checkUserSession =()=>({
    type: userActionsTypes.CHECK_USER_SESSION
});

export const signOutStart=()=>({
    type: userActionsTypes.SIGN_OUT_START
});

export const signOutSuccess=()=>({
    type: userActionsTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure=(error)=>({
    type: userActionsTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStart=userCredentials=>({
    type: userActionsTypes.SIGN_UP_START,
    payload: userCredentials

});

export const signUpSuccess=({user, additionalData})=>({
    type: userActionsTypes.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
});

export const signUpFailure=(error)=>({
    type: userActionsTypes.SIGN_UP_FAILURE,
    payload: error
});

