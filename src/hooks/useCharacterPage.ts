import { useContext } from "react";
import { CharacterPageContext } from "@/src/providers/CharacterPageProvider";

const useCharacterPage = () => useContext(CharacterPageContext);

export default useCharacterPage;
