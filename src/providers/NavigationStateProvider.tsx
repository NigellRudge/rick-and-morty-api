import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IconName } from "@/src/components/Icon";
import { Character } from "@/src/types/character";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  useEffect(() => {
    isSideNavOpen && setIsSideNavOpen(false);
  }, [router.asPath]);

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
