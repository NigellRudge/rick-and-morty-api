export const removeNullProperties = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null),
  );

export const getCharacterIdsFromUrls = (urls: string[]) => {
  if (!urls) return [];
  return urls
    .map((resident) =>
      resident.replace(
        `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL}/character/`,
        "",
      ),
    )
    .map((id) => parseInt(id));
};
