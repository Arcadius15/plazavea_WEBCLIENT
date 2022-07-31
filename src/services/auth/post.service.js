import axiosConfig from "../../axiosConfig";
import authHeader from "./auth-header";

const instance = axiosConfig.instance

const getAllPublicPosts = async () => {
  return await instance.get('/producto');
};

const getAllPrivatePosts = async () => {
  const data = {
    "email": "diegovic99@hotmail.com",
    "password":"diegovic"
  }
  return await instance.post("/jwt/getuserdetails",data, { headers: authHeader() });
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
};

export default postService;
