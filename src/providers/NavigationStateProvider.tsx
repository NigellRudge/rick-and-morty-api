import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type NavigationStateType = {
  isSideNavOpen: boolean;
  setIsSideNavOpen: Dispatch<SetStateAction<boolean>>;
};

const NavigationStateContext = createContext<NavigationStateType>({
  isSideNavOpen: false,
  setIsSideNavOpen: () => {},
});

const NavigationStateProvider = ({ children }: { children: ReactNode }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <NavigationStateContext.Provider
      value={{ setIsSideNavOpen, isSideNavOpen }}
    >
      {children}
    </NavigationStateContext.Provider>
  );
};

export default NavigationStateProvider;
