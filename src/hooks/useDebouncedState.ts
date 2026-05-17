import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useDebouncedState<T>(
  initialState: T,
  delay: number = 300,
): [
  state: T,
  setState: Dispatch<SetStateAction<T>>,
  debouncedState: T,
  setDebouncedState: Dispatch<SetStateAction<T>>,
] {
  const [state, setState] = useState<T>(initialState);
  const [debouncedState, setDebouncedState] = useState<T>(initialState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedState(state);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [state, delay]);

  return [state, setState, debouncedState, setDebouncedState];
}
