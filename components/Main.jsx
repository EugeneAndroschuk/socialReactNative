import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import useRoute from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { getStateChange } from "../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
    const stateChange = useSelector(getStateChange);
    
    const dispatch = useDispatch();

    useEffect(() => {
      console.log("useeffect in main");
      dispatch(authStateChangeUser());
    }, []);
    
    const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;