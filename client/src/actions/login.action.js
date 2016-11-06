//Setting headers
const headers = new Headers();
headers.set('Content-Type', 'application/json');

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const OPEN_LOGIN_POPUP = 'OPEN_LOGIN_POPUP';
export const FETCHING_ACCESS = 'FETCHING_ACCSSES';
export const LOGIN_ERROR = 'LOGIN_ERROR';

//LOGIN FUNCTION
export function login(loginData) {

    return (dispatch) => {

        dispatch({
            type: FETCHING_ACCESS
        });

        return fetch('/login', {
            method: 'post',
            headers,
            body: JSON.stringify(loginData)
        }).then(r => {

            if (r.ok) {
                dispatch({
                    type: LOGIN,
                    payload: true
                })
            } else {
                dispatch({
                    type: LOGIN_ERROR
                })
            }
        })

            .catch(error => {

                console.log('Request failed', error)
            })

    }
}

//LOGOUT FUNCTION
export function logout() {

    return (dispatch) => {

        return fetch('/logout').then(r => {

            dispatch({
                type: LOGOUT,
                payload: false
            })

        })

            .catch(error => {

                console.log('Request failed', error)
            })

    }
}

//OPEN LOGIN POPUP FUNCTION
export function openLoginPopUp(state) {

    return {
        type: OPEN_LOGIN_POPUP,
        payload: state
    }
}