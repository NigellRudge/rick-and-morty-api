export const getEpisodeCode = (
  seasonNumber: number | string,
  episodeNumber: number | string,
) => {
  const seasonCode = String(seasonNumber).padStart(2, "0");
  const episodeCode = String(episodeNumber).padStart(2, "0");
  return `S${seasonCode}E${episodeCode}`;
};

export const parseEpisodeCode = (code: string) => {
  if (!code)
    return {
      seasonNumber: null,
      episodeCode: null,
    };
  const match = code.match(/S(\d+)E(\d+)/);
  if (match) {
    const seasonNumber = Number(match[1]);
    const episodeCode = Number(match[2]);
    return {
      seasonNumber,
      episodeCode,
    };
  }
  return {
    seasonNumber: null,
    episodeCode: null,
  };
};
