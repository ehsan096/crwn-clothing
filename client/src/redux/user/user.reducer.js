import userActionsTypes  from "./user.types";

const INITIAL_STATE={
    currentUser: null,
    error: null,
}

const userReducer = (state = INITIAL_STATE, action)=>{

    switch(action.type){
        case userActionsTypes.SIGNIN_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                error: null
            }
        case userActionsTypes.SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentUser: null,
                error: null
            }
        case userActionsTypes.SIGNIN_FAILURE:
        case userActionsTypes.SIGN_UP_FAILURE:
        case userActionsTypes.SIGN_OUT_FAILURE:
            return{
                    ...state,
                    error: action.payload
                }
        default:
            return state; 
    }
}

export default userReducer;