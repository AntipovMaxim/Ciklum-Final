//Setting headers
const headers = new Headers();
headers.set('Content-Type', 'application/json');

export const STATUS = 'STATUS';
export const OPEN_POPUP = 'OPEN_POPUP';
export const CREATE_SEAT = 'POST_SEAT';
export const GET_SEATS = 'GET_SEATS';
export const DELETE_SEAT = 'DELETE_SEAT';
export const UPDATE_SEAT = 'UPDATE_SEAT';
export const SET_SEAT_HIGHTLIGHT = 'SET_SEAT_HIGHTLIGHT';
export const PRELOADER = 'PRELOADER';
export const UPDATE_COORDINATES = 'UPDATE_COORDINATES';


// CHOOSE STATUS FUNCTION - FREE/OCCUPIED
export function chooseStatus(status) {

    return {
        type: STATUS,
        payload: status
    }
}

//OPEN CREATE SEAT POPUP FUNCTION
export function openPopUp(act) {

    return {
        type: OPEN_POPUP,
        payload: act
    }
}

//CREATE NEW SEAT FUNCTION
export function cteateNewSeat(seat) {

    return (dispatch) => {

        return fetch('/seat', {
            method: 'post',
            headers,
            body: JSON.stringify(seat)
        }).then(r => {
            return r.json();

        })
            .then(r => {

                dispatch({
                    type: CREATE_SEAT,
                    payload: r
                });

                return r;
            })
            .catch(error => {

                console.log('Request failed', error)

                return error;

            })


    }
}


//GET  ALL SEATS FUNCTION
export function getSeats() {

    return (dispatch) => {

        dispatch({
            type: PRELOADER
        });

        return fetch('/seat').then(r => {
            return r.json();
        })
            .then(r => {

                dispatch({
                    type: GET_SEATS,
                    payload: r
                })
            })
            .catch(error => {

                console.log('Request failed', error)
            })

    }
}


//UPDATE COORDINATES OF SEAT ON CLIENT

export function updateCoordinates(seat, index){

    return{
        type: UPDATE_COORDINATES,
        payload: seat,
        index
    }
}

//SEND NEW  SEAT COORDINATES TO SERVER
export function sendCoordToServer(seat, index) {

    return (dispatch) => {

        return fetch(`/seat/${seat._id}`, {
            method: 'put',
            headers,
            body: JSON.stringify(seat)
        }).then(r => {
            return r.json();

        })
            .then(r => {

                return r;
            })
            .catch(error => {

                console.log('Request failed', error)

                return error;

            })
    }
}



//UPDATE SEAT FUNCTION
export function updateSeat(seat, index) {

    return (dispatch) => {

        return fetch(`/seat/${seat._id}`, {
            method: 'put',
            headers,
            body: JSON.stringify(seat)
        }).then(r => {
            return r.json();

        })
            .then(r => {

                dispatch({
                    type: UPDATE_SEAT,
                    payload: r,
                    index
                });

                return r;
            })
            .catch(error => {

                console.log('Request failed', error)

                return error;

            })
    }
}

//DELETE SEAT FUNCTION
export function deleteSeat(id, index) {

    return (dispatch) => {

        return fetch(`/seat/${id}`, {
            method: 'delete'

        }).then(r => {

            return r.json();
        })
            .then(r => {

                dispatch({
                    type: DELETE_SEAT,
                    index: index
                })
            })

            .catch(error => {

                console.log('Request failed', error)

            })
    }
}


//SET SOME STYLE TO CHOOSEN SEAT
export function hightlightSeat(seats) {
    return {
        type: SET_SEAT_HIGHTLIGHT,
        payload: seats
    }
}