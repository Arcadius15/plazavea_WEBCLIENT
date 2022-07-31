import axiosConfig from "../../axiosConfig";

const instance = axiosConfig.instance

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
    .post("/jwt/authenticate", {
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

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
