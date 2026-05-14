import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { IconName } from "@/src/components/Icon";
import { Character } from "@/src/types/character";

export type NavigationLinkItem = {
  url: string;
  label: string;
  iconName?: IconName;
};
type NavigationStateType = {
  isSideNavOpen: boolean;
  setIsSideNavOpen: Dispatch<SetStateAction<boolean>>;
  navigationLinks: NavigationLinkItem[];
  selectedCharacter: Character | null;
  setSelectedCharacter: Dispatch<SetStateAction<Character | null>>;
};

export const NavigationStateContext = createContext<NavigationStateType>({
  isSideNavOpen: false,
  setIsSideNavOpen: () => {},
  navigationLinks: [],
  selectedCharacter: null,
  setSelectedCharacter: () => {},
});

const navigationLinks: NavigationLinkItem[] = [
  { url: "/", label: "Characters" },
  { url: "/discover", label: "Discover" },
  { url: "/episodes", label: "Episode" },
  { url: "/locations", label: "Locations" },
];

const NavigationStateProvider = ({ children }: { children: ReactNode }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  return (
    <NavigationStateContext.Provider
      value={{
        setIsSideNavOpen,
        isSideNavOpen,
        navigationLinks,
        selectedCharacter,
        setSelectedCharacter,
      }}
    >
      {children}
    </NavigationStateContext.Provider>
  );
};

export default NavigationStateProvider;
