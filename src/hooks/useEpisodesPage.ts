import { useContext } from "react";
import { EpisodePageContext } from "@/providers/EpisodePageProvider";

const useEpisodePage = () => useContext(EpisodePageContext);

export default useEpisodePage;
