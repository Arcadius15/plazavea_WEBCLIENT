import axios from "axios";
import authHeader from "./auth-header";

const URL = process.env.REACT_APP_API_URL;

const getAllPublicPosts = async () => {
  return await axios.get(URL + '/producto');
};

const getAllPrivatePosts = async () => {
  const data = {
    "email": "diegovic99@hotmail.com",
    "password":"diegovic"
  }
  return await axios.post(URL + "/jwt/getuserdetails",data, { headers: authHeader() });
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
};

export default postService;
