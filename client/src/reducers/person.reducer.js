import { CREATE_PERSON,
         OPEN_POPUP_PERSON,
         GET_PERSONS,
         SEARCH_PERSONS,
         GET_FREE_PERSONS,
         GET_PERSON_INFO,
         SELECTION_MODE,
         UPDATE_PERSON_INFO,
         SET_SEARCH_BOX_FREE } from '../actions/person.action';


const INITIAL_STATE = { CreatePersonPopUp: false,
                        persons: [],
                        searchedPersons: [],
                        personInfo: {},
                        selectionMode: false
                      };

export default function (state = INITIAL_STATE, action){
    switch (action.type){

        case OPEN_POPUP_PERSON:
            return { ...state, CreatePersonPopUp: action.payload };

        case CREATE_PERSON:
            return { ...state, persons: [...state.persons, action.payload] };  

        case GET_PERSONS:
            return { ...state, persons: action.payload };  

        case SEARCH_PERSONS:
            return { ...state, searchedPersons: action.payload };  

        case GET_FREE_PERSONS:
            return { ...state, searchedPersons: action.payload };  

        case GET_PERSON_INFO:
            return { ...state, personInfo: action.payload }; 

        case SET_SEARCH_BOX_FREE:
            return { ...state, searchedPersons: action.payload };     

        case UPDATE_PERSON_INFO:
            return { ...state, personInfo: action.payload };     

        case SELECTION_MODE:
            return { ...state, selectionMode: action.payload };                     

        default:
            return state;
    }

}

