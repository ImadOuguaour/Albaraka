import {
  getPneusSuccess,GET_PNEUS,getPneusError,  getPneus,
  getMarquesSuccess, GET_MARQUES, getMarquesError,
  addPneuSuccess, ADD_PNEU, addPneuError,
  updatePneuSuccess, UPDATE_PNEU, updatePneuError
} from './actions/index'
import {call , put, takeLatest} from 'redux-saga/effects'
import axiosGet from 'axios'
import axios from 'axios'
import axiosPost from 'axios'

function* getPneusApi(){
  const requestConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
  const url = "http://localhost:8080/api/pneu";
  try{
      const data = yield call(axiosGet, url, requestConfig)
      yield put(getPneusSuccess(data.data))
    } catch(e){
      yield put(getPneusError());
      console.log("eror when calling api to get data pneu : ",e)
    }
}

function* getMarquesApi(){
  const requestConfig = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  const url = "http://localhost:8080/api/marque";
  try{
    console.log("hani f saga 1")
    const data = yield call(axiosGet, url, requestConfig)
    yield put(getMarquesSuccess(data.data))
    
    console.log("hani f saga 2")
  } catch(e){
      yield put(getMarquesError());
      console.log("eror when calling api to get data marques : ",e)
  }
}

function* addPneuApi(action) {
  // Constitution de la requête
  const data = action.payload
  const url = "http://localhost:8080/api/pneu";
  const apiCall = async () => {
    try {
      const response = await axios.post(url, data)
      return response.data
    }
    catch (err) {
      console.log("erreu :", err)
      throw err
    }
  }
  // Envoi de la requête
  try {
    yield call(apiCall)
    yield put(addPneuSuccess("Votre commande a été ajoutée avec succès"));
  } catch (error) {
    console.log("hani :",error)
    yield put(addPneuError("Erreur.")
    );
  }
}

function* updatePneuApi(action) {
  const data = action.payload
  const url = "http://localhost:8080/api/pneu";
  const apiCall = async () => {
    try {
      const response = await axios.post(url, data)
      return response.data
    }
    catch (err) {
      console.log("erreu :", err)
      throw err
    }
  }
  // Envoi de la requête
  try {
    yield call(apiCall)
    yield put(getPneus());
    yield put(updatePneuSuccess("Votre pneu a été modifié avec succès"));
  } catch (error) {
    console.log("hani :",error)
    yield put(updatePneuError("Erreur.")
    );
  }
}


export default function* mySaga(){
    yield takeLatest(GET_PNEUS, getPneusApi)
    yield takeLatest(GET_MARQUES,getMarquesApi)
    yield takeLatest(ADD_PNEU,addPneuApi)
    yield takeLatest(UPDATE_PNEU,updatePneuApi)
}