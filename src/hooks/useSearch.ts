import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import useDebouncedState from "@/hooks/useDebouncedState";
import { removeNullProperties } from "@/utils/list";

const isCharacterPage = (pathname: string) =>
  pathname.startsWith("/characters");

const useSearchInput = () => {
  const router = useRouter();
  const [inputValue, setInputValue, debouncedValue, setDebouncedState] =
    useDebouncedState<string>((router.query.name as string) ?? "");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const clearQuery = () => {
    router.replace({
      pathname: router.pathname,
      query: removeNullProperties({
        ...router.query,
        name: null,
      }),
    });
    setInputValue("");
    setDebouncedState("");
    setIsFocused(false);
  };

  useEffect(() => {
    if (debouncedValue !== "" && isFocused) {
      if (isCharacterPage(router.pathname)) {
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            name: debouncedValue,
          },
        });
      } else {
        router
          .push({
            pathname: "/characters",
            query: { name: debouncedValue },
          })
          .then(() => window.scrollTo(0, 0));
      }
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (
      debouncedValue === "" &&
      !isFocused &&
      isCharacterPage(router.pathname)
    ) {
      router.replace({
        pathname: router.pathname,
        query: removeNullProperties({
          ...router.query,
          name: null,
        }),
      });
    }
  }, [debouncedValue, isFocused, router.query, router.pathname, router]);

  useEffect(() => {
    if (router.query.name !== debouncedValue) {
      setInputValue(
        router.query.name
          ? decodeURIComponent(router.query.name as string)
          : "",
      );

      if (!isCharacterPage(router.pathname) && !router.query.name) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsFocused(false);
      }
    }

    if (isCharacterPage(router.pathname)) {
      setIsFocused(true);
    }
  }, [router?.query?.name, setInputValue]);

  console.log("called");
  return {
    isFocused,
    showClearButton: inputValue?.length >= 3,
    query: debouncedValue,
    inputValue,
    handleSearch,
    clearQuery,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };
};

export default useSearchInput;
