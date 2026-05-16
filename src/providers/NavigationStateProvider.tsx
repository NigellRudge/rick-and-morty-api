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
  { url: "/", label: "Episodes" },
  { url: "/characters", label: "Characters" },
  { url: "/locations", label: "Locations" },
];

const NavigationStateProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedCharacter(null);
      setIsSideNavOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    setIsSideNavOpen(false);
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
