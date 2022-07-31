import { useNavigate } from "react-router-dom";

const useCustomNav = () => {
    const navigation = useNavigate();
  
    const goTo = to => navigation.navigate(to);
  
    return {goTo};
  };

export default useCustomNav