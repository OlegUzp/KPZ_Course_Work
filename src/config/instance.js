import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/udodcoursework/europe-west1/api"
});

export default instance;
