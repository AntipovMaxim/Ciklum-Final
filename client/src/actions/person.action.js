//Setting headers
const headers = new Headers();
headers.set('Content-Type', 'application/json');


export const OPEN_POPUP_PERSON = 'OPEN_POPUP_PERSON';
export const CREATE_PERSON = 'CREATE_PERSON';
export const GET_PERSONS = 'GET_PERSONS';
export const SEARCH_PERSONS = 'GET_ALL_PERSONS';
export const GET_FREE_PERSONS = 'GET_FREE_PERSONS';
export const GET_PERSON_INFO = 'GET_PERSON_INFO';
export const SELECTION_MODE = 'SELECTION_MODE';
export const UPDATE_PERSON_INFO = 'UPDATE_PERSON_INFO';
export const SET_SEARCH_BOX_FREE = 'SET_SEARCH_BOX_FREE';


//OPEN PERSON POPUP FUNCTION
export function openPopUpPerson(act) {

    return {
        type: OPEN_POPUP_PERSON,
        payload: act
    }
}

//CREATE NEW PERSON FUNCTION
export function cteateNewPerson(person) {

    return (dispatch) => {

        return fetch('/person', {
            method: 'post',
            headers,
            body: JSON.stringify(person)
        }).then(r => {
            return r.json();

        })
            .then(r => {

                dispatch({
                    type: CREATE_PERSON,
                    payload: r
                })
            })
            .catch(error => {

                console.log('Request failed', error)
            })

    }
}

//GET PERSONS FUNCTION
export function getPersons() {

    return (dispatch) => {

        return fetch('/person').then(r => {
            return r.json();

        })
            .then(r => {

                const freePerson = r.filter(person => {
                    return person.seatId == "free";
                });

                dispatch({
                    type: GET_PERSONS,
                    payload: freePerson
                })
            })
            .catch(error => {

                console.log('Request failed', error)
            })

    }
}

//UPDATE PERSON FUNCTION
export function updatePerson(seatId, personId) {

    return (dispatch) => {

        return fetch(`/person/${personId}/${seatId}`, {
            method: 'put',
            headers

        }).then(r => {
            return r.json();

        })
            .then(r => {

                dispatch({
                    type: UPDATE_PERSON_INFO,
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


//SEARCH PERSONS FUNCTION
export function searchPersons(input) {

    const inputValue = input.toLowerCase().trim();

    return (dispatch) => {

        return fetch('/person').then(r => {
            return r.json();
        })
            .then(r => {

                var searchResult = r.filter(person => {
                    if ((inputValue.charAt(0) == person.name.toLowerCase().charAt(0)) || (inputValue.charAt(0) == person.lastName.toLowerCase().charAt(0))) {
                        const name = `${person.name.toLowerCase()}${person.lastName.toLowerCase()}`;

                        return name.toLowerCase().trim().includes(inputValue);
                    }


                });

                dispatch({
                    type: SEARCH_PERSONS,
                    payload: searchResult
                })
            })
            .catch(error => {

                console.log('Request failed', error)
            })

    }
}

//GET FREE PERSONS FUNCTION
export function getFreePersons(persons, input) {

    const freePersons = persons.filter(person => {
        return person.seatId == 'free';
    });

    return {
        type: GET_FREE_PERSONS,
        payload: freePersons
    }
}

//GET PERSONS INFO FUNCTION
export function getPersonInfo(person) {

    return {
        type: GET_PERSON_INFO,
        payload: person
    }

}

//SET SEARCH RESULTS FREE
export function setSearchBoxFree() {

    return {
        type: SET_SEARCH_BOX_FREE,
        payload: []
    }

}


export function switchOffSelectionMode(state) {
    return {
        type: SELECTION_MODE,
        payload: state
    }
}
