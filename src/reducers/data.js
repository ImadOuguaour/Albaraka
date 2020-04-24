import {
    GET_PNEUS_SUCCESS, GET_PNEUS, GET_PNEUS_ERROR,
    GET_MARQUES, GET_MARQUES_SUCCESS, GET_MARQUES_ERROR,
    ADD_PNEU, ADD_PNEU_SUCCESS, ADD_PNEU_ERROR,
    UPDATE_PNEU, UPDATE_PNEU_SUCCESS, UPDATE_PNEU_ERROR
} from '../actions/index';

// create initial state for reducers
const INIT_STATE = {
    pneus: [],
    marques: [],
    responseAddPneu : "",
    responseUpdatePneu : ""
}

// reducer function to transform state
export default function(state = [INIT_STATE], action) {
    switch(action.type){
        case GET_PNEUS : {
            return { ...state}
        }
        case GET_PNEUS_SUCCESS : {
            return { pneus : action.payload}
        };
        case GET_PNEUS_ERROR : {
            return { ...state, pneus : action.payload}
        };
        case GET_MARQUES : {
            return { ...state}
        }
        case GET_MARQUES_SUCCESS : {
            console.log("hani f reducer")
            return { marques : action.payload}
        };
        case GET_MARQUES_ERROR : {
            return { ...state, marques : action.payload}
        };
        case ADD_PNEU : {
            return { ...state}
        }
        case ADD_PNEU_SUCCESS : {
            console.log("han hna")
            return { ...state, responseAddPneu : action.payload}
        };
        case ADD_PNEU_ERROR : {
            return { ...state, responseAddPneu : action.payload}
        };
        case UPDATE_PNEU : {
            return { ...state}
        }
        case UPDATE_PNEU_SUCCESS : {
            console.log("han hna")
            return { ...state, responseUpdatePneu : action.payload}
        };
        case UPDATE_PNEU_ERROR : {
            return { ...state, responseUpdatePneu : action.payload}
        };
        default : return state
    }
}