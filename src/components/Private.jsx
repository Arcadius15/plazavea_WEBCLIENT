import React, { useState, useEffect } from "react";
import PostService from "../services/auth/post.service";
import AuthService from "../services/auth/auth.service";
import Navegador from "../utils/Navegador";

const Private = () => {
  const [privatePosts, setPrivatePosts] = useState([]);

  useEffect( () => {
    const get = async () => {
      await PostService.getAllPrivatePosts().then(
        (response) => {
          console.log(response)
          setPrivatePosts(response.data);
        },
        (error) => {
          console.log("Private page", error.response);
          window.alert(error)
          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            AuthService.logout();
            Navegador("home")
            window.location.reload();
          }
        }
      );
    }
    get()
  }, []);

  return (
    <div>
      <h3>{privatePosts}</h3>
    </div>
  );
};

export default Private;
