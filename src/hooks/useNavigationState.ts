import { useContext } from "react";
import { NavigationStateContext } from "@/src/providers/NavigationStateProvider";

const useNavigationState = () => useContext(NavigationStateContext);

export default useNavigationState;
