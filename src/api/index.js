import axios from 'axios';

export const getPneusFetch = async () => {
    const requestConfig = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
    const url = "http://localhost:8080/api/pneu";
    let data= {};
    try{
        axios.get(url,requestConfig).then((response)=>{
            console.log("data ", response.data)
            data = response.data
        })
        return data;
    }catch(err){
        console.log("eror when calling api to get data pneu")
    }
}

export const apiCall = async (data) => {
    const url = "http://localhost:8080/api/pneu";
    try {
      const response = await axios.post(url, data)
      return response.data
    }
    catch (err) {
      throw err
    }
}