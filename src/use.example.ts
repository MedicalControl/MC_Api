import axios from 'axios'
import { API_URL } from './config';


export default function main () {
    axios.post(
        API_URL + "/auth/login", {
                correo: "CrsitopherQuintana2@gmail.com",
                contrasena: "Crsitopher123"
        }
    ).then((res) => {
        console.log(res.data.token)
    })
}
