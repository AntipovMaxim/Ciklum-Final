import { STATUS,
         CREATE_SEAT,
         OPEN_POPUP,
         GET_SEATS,
         DELETE_SEAT,
         UPDATE_SEAT,
         SET_SEAT_HIGHTLIGHT,
         PRELOADER,
         UPDATE_COORDINATES} from '../actions/seat.action';


const INITIAL_STATE = { status: 'free', actPopUp: false, seats: [] };

export default function (state = INITIAL_STATE, action){
    switch (action.type){
        case STATUS:
            return { ...state, status: action.payload };

        case OPEN_POPUP:
            return { ...state, actPopUp: action.payload };

        case CREATE_SEAT:
            return { ...state, seats: [...state.seats, action.payload] }; 

        case GET_SEATS:
            return { ...state, seats: action.payload, fetchingSeats: false };    

        case PRELOADER:
            return { ...state, fetchingSeats: true };  

        case DELETE_SEAT:
               return { ...state, seats: [...state.seats.slice(0,
                        action.index), ...state.seats.slice(action.index + 1) ] };

        case UPDATE_SEAT:
            return { ...state, seats: [...state.seats.slice(0, action.index),
                    action.payload, ...state.seats.slice(action.index + 1) ] };

        case UPDATE_COORDINATES:
            return { ...state, seats: [...state.seats.slice(0, action.index),
                action.payload, ...state.seats.slice(action.index + 1) ] };
          
        case SET_SEAT_HIGHTLIGHT:
            return { ...state, seats: action.payload }; 

        default:
            return state;
    }

}