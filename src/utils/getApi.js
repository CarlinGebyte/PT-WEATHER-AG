import axios from "axios";
let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "OPTIONS");
export const getApi = (url) => {
  const result = axios("https://cors-anywhere.herokuapp.com/" + url);
  return result.then((res) => {
    return res.data;
  });
};
