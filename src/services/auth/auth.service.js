import axiosConfig from "../../axiosConfig";

const instance = axiosConfig.instance
const URL = '/jwt'

const signup = (email, password) => {
  return instance
    .post("/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return instance
    .post(URL + "/authenticate", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        axiosConfig.setAuthToken()
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  axiosConfig.setAuthToken(undefined)
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const changePassword = (body) => {
  return instance.put(URL+"/editpassword",body)
}

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  changePassword
};

export default authService;
