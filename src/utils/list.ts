export const removeNullProperties = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null),
  );
