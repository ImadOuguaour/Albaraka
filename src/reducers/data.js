import {
    GET_PNEUS_SUCCESS, GET_PNEUS, GET_PNEUS_ERROR,
    GET_MARQUES, GET_MARQUES_SUCCESS, GET_MARQUES_ERROR,
    ADD_PNEU, ADD_PNEU_SUCCESS, ADD_PNEU_ERROR,
    ADD_VENTE_PNEU, ADD_VENTE_PNEU_SUCCESS, ADD_VENTE_PNEU_ERROR,
    UPDATE_PNEU, UPDATE_PNEU_SUCCESS, UPDATE_PNEU_ERROR,
    GET_TOP_CINQ_PNEUS, GET_TOP_CINQ_PNEUS_SUCCESS, GET_TOP_CINQ_PNEUS_ERROR,
    GET_HISTORIQUE_PNEU, GET_HISTORIQUE_PNEU_SUCCESS, GET_HISTORIQUE_PNEU_ERROR,
    GET_VENTE_PNEU, GET_VENTE_PNEU_SUCCESS, GET_VENTE_PNEU_ERROR
} from '../actions/index';

// create initial state for reducers
const INIT_STATE = {
    pneus: [],
    marques: [],
    topCinqPneusVendu: [],
    historiquePneu: [],
    historiqueVentePneuToday: [],
    responseAddPneu : null,
    responseUpdatePneu : null,
    responseAddVentePneu : null
}

// reducer function to transform state
export default function(state = [INIT_STATE], action) {
    switch(action.type){
        case GET_PNEUS : {
            return { ...state}
        }
        case GET_PNEUS_SUCCESS : {
            return {  pneus : action.payload, marques: state.marques}
        };
        case GET_PNEUS_ERROR : {
            return { ...state, pneus : action.payload}
        };
        case GET_TOP_CINQ_PNEUS : {
            return { ...state}
        }
        case GET_TOP_CINQ_PNEUS_SUCCESS : {
            return {  topCinqPneusVendu : action.payload}
        };
        case GET_TOP_CINQ_PNEUS_ERROR : {
            return { ...state, topCinqPneusVendu : action.payload}
        };
        case GET_MARQUES : {
            return { ...state}
        }
        case GET_MARQUES_SUCCESS : {
            return { ...state, marques : action.payload, pneus: state.pneus}
        };
        case GET_MARQUES_ERROR : {
            return { ...state, marques : action.payload}
        };
        case ADD_PNEU : {
            return { ...state}
        }
        case ADD_PNEU_SUCCESS : {
            return { ...state, responseAddPneu : action.payload}
        };
        case ADD_PNEU_ERROR : {
            return { ...state, responseAddPneu : action.payload}
        };
        case ADD_VENTE_PNEU : {
            return { ...state}
        }
        case ADD_VENTE_PNEU_SUCCESS : {
            return { ...state, responseAddVentePneu : action.payload}
        };
        case ADD_VENTE_PNEU_ERROR : {
            return { ...state, responseAddVentePneu : action.payload}
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
        case GET_HISTORIQUE_PNEU : {
            return { ...state}
        }
        case GET_HISTORIQUE_PNEU_SUCCESS : {
            return { historiquePneu : action.payload}
        };
        case GET_HISTORIQUE_PNEU_ERROR : {
            return { ...state, historiquePneu : action.payload}
        };
        case GET_VENTE_PNEU : {
            return { ...state}
        }
        case GET_VENTE_PNEU_SUCCESS : {
            return { historiqueVentePneuToday : action.payload}
        };
        case GET_VENTE_PNEU_ERROR : {
            return { ...state, historiqueVentePneuToday : action.payload}
        };
        default : return state
    }
}