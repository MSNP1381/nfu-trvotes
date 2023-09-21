import {Ax} from axios;
export const base_url="https://localhost:7027"
function get_token(username,password){
    return axios.post(`${base_url}/api/Authenticate/login`,{username,password})
}