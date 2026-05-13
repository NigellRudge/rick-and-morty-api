import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { IconName } from "@/src/components/Icon";

export type NavigationLinkItem = {
  url: string;
  label: string;
  iconName?: IconName;
};
type NavigationStateType = {
  isSideNavOpen: boolean;
  setIsSideNavOpen: Dispatch<SetStateAction<boolean>>;
  navigationLinks: NavigationLinkItem[];
};

export const NavigationStateContext = createContext<NavigationStateType>({
  isSideNavOpen: false,
  setIsSideNavOpen: () => {},
  navigationLinks: [],
});

const navigationLinks: NavigationLinkItem[] = [
  { url: "/", label: "Characters" },
  { url: "/discover", label: "Discover" },
  { url: "/episodes", label: "Episode" },
  { url: "/locations", label: "Locations" },
];

const NavigationStateProvider = ({ children }: { children: ReactNode }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <NavigationStateContext.Provider
      value={{ setIsSideNavOpen, isSideNavOpen, navigationLinks }}
    >
      {children}
    </NavigationStateContext.Provider>
  );
};

export default NavigationStateProvider;
