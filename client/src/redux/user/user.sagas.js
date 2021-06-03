import { takeLatest, put , all, call} from "redux-saga/effects";

import userActionsTypes from './user.types'

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))
    } catch (error) {
        yield put(signInFailure(error))
    }
} 

export function* singInWithGoogle(){

    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}



export function* singInWithEmail({payload: {email, password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* singUp({payload: {email, password, displayName}}){
   
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    } catch (error) {
        yield put(signUpFailure(error))
    }

}

export function* signInAfterSignUp({payload: {user, additionalData}}){
    try {
        yield getSnapshotFromUserAuth(user, additionalData);
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signOut(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
        
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(userActionsTypes.GOOGLE_SIGNIN_START,singInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(userActionsTypes.EMAIL_SIGNIN_START, singInWithEmail )
}

export function* onSignUpStart(){
    yield takeLatest(userActionsTypes.SIGN_UP_START, singUp )
}

export function* onSignUpSuccess(){
    yield takeLatest(userActionsTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onCheckUserSession(){
    yield takeLatest(userActionsTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart(){
    yield takeLatest(userActionsTypes.SIGN_OUT_START, signOut)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ])
}