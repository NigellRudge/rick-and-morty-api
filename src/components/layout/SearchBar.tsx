import useSearch from "@/src/hooks/useSearch";
import Icon from "@/src/components/Icon";

const SearchBar = ({
  showNavigationOverContent = false,
}: {
  showNavigationOverContent?: boolean;
}) => {
  const {
    inputValue,
    handleSearch,
    onBlur,
    onFocus,
    showClearButton,
    clearQuery,
  } = useSearch();
  return (
    <div className="flex flex-1 relative w-full items-center">
      <div
        className={`flex flex-row h-10 w-full rounded-3xl pl-4 pr-2 items-center ${showNavigationOverContent ? "border-gray-200 " : "border-gray-500 "}border gap-3`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleSearch}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`w-full ${showNavigationOverContent ? "placeholder-gray-200 " : "placeholder-gray-500  "} text-gray-200 outline-none h-full`}
          placeholder="Search..."
        />
        {showClearButton && (
          <button
            className="px-2.5 py-1 bg-emerald-950/70 rounded-full cursor-pointer"
            onClick={clearQuery}
          >
            <Icon iconName="close" size={18} className="text-gray-300 " />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
