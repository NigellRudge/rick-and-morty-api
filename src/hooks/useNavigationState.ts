import { useContext } from "react";
import { NavigationStateContext } from "@/providers/NavigationStateProvider";

const useNavigationState = () => useContext(NavigationStateContext);

export default useNavigationState;
