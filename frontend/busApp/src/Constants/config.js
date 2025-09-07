
const SERVER_URL = 'http://localhost:3001';
//const SERVER_URL = 'http://localhost:3001';

//Bypass ngrok browser warning will work with localhost as well
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
    }
}

const adminAddress = "shreeshnautiyal3@gmail.com";

export {SERVER_URL, axiosConfig, adminAddress};