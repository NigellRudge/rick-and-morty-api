const SearchBar = ({
  showNavigationOverContent = false,
}: {
  showNavigationOverContent?: boolean;
}) => {
  return (
    <div className="flex flex-1 relative w-full items-center">
      <div
        className={`flex flex-row h-10 w-full rounded-3xl px-4 items-center ${showNavigationOverContent ? "border-gray-200 " : "border-gray-500 "}border gap-3`}
      >
        <input
          type="text"
          className={`w-full ${showNavigationOverContent ? "placeholder-gray-200 " : "placeholder-gray-500  "} text-gray-200 outline-none h-full`}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
