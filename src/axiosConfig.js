import axios from "axios";

const instance = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.patch['Content-Type'] = 'application/json';
instance.defaults.headers.put['Content-Type'] = 'application/json';

const setAuthToken =() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
        console.log(instance.defaults)
    }
    else
    {
        delete instance.defaults.headers.common["Authorization"];
        delete instance.defaults.headers.common["Content-Type"];
    } 
}

const axiosConfig = {
    instance,
    setAuthToken
}

export default axiosConfig