import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    Accept: "application/json",
  },
  timeout: 10000,
});

const getUser = () => client.get("/users");

export default getUser;
