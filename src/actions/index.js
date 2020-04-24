export const GET_PNEUS= 'GET_PNEUS';
export const GET_PNEUS_SUCCESS= 'GET_PNEUS_SUCCESS';
export const GET_PNEUS_ERROR= 'GET_PNEUS_SUCCESS';

export const GET_MARQUES= 'GET_MARQUES';
export const GET_MARQUES_SUCCESS= 'GET_MARQUES_SUCCESS';
export const GET_MARQUES_ERROR= 'GET_MARQUES_ERROR';

export const ADD_PNEU= 'ADD_PNEU';
export const ADD_PNEU_SUCCESS= 'ADD_PNEU_SUCCESS';
export const ADD_PNEU_ERROR= 'ADD_PNEU_ERROR';

export const UPDATE_PNEU= 'UPDATE_PNEU';
export const UPDATE_PNEU_SUCCESS= 'UPDATE_PNEU_SUCCESS';
export const UPDATE_PNEU_ERROR= 'UPDATE_PNEU_SUCCESS';

export const getPneus = () => ({
    type: GET_PNEUS,
})

export const getPneusSuccess = (data) => ({
    type: GET_PNEUS_SUCCESS,
    payload : data
})

export const getPneusError = () => ({
    type: GET_PNEUS_ERROR,
    payload : []
})

export const getMarques = () => ({
    type: GET_MARQUES,
})

export const getMarquesSuccess = (data) => ({
    type: GET_MARQUES_SUCCESS,
    payload : data
})

export const getMarquesError = () => ({
    type: GET_MARQUES_ERROR,
    payload : []
})

export const addPneu = (data) => ({
    type: ADD_PNEU,
    payload: data
})

export const addPneuSuccess = (responseAddPneu) => ({
    type: ADD_PNEU_SUCCESS,
    payload: responseAddPneu
})

export const addPneuError = (responseAddPneu) => ({
    type: ADD_PNEU_ERROR,
    payload: responseAddPneu
})

export const updatePneu = (id) => ({
    type: UPDATE_PNEU,
    payload: id
})

export const updatePneuSuccess = (responseUpdatePneu) => ({
    type: UPDATE_PNEU_SUCCESS,
    payload: responseUpdatePneu
})

export const updatePneuError = (responseUpdatePneu) => ({
    type: UPDATE_PNEU_ERROR,
    payload: responseUpdatePneu
})