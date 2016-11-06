import { LOGIN, LOGOUT, OPEN_LOGIN_POPUP, FETCHING_ACCESS, LOGIN_ERROR } from '../actions/login.action';


const INITIAL_STATE = { login: false, loginPopUp: false };

export default function (state = INITIAL_STATE, action){
    switch (action.type){
        
        case FETCHING_ACCESS:
            return { ...state, fetchingAccess: true };

        case LOGIN_ERROR:
            return { ...state, fetchingAccess: false, error: true };    

        case LOGIN:
            return { ...state, login: action.payload, loginPopUp: false, error: false, fetchingAccess: false };

        case LOGOUT:
            return { ...state, login: action.payload };

        case OPEN_LOGIN_POPUP:
            return Object.assign({}, state, {loginPopUp: action.payload});       
                     
        default:
            return state;
    }

}

