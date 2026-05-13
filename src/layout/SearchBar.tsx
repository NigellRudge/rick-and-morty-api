const SearchBar = () => {
  return (
    <div className="flex flex-1 relative w-full lg:w-[800px]">
      <div className="flex flex-row h-10 w-full rounded-xl px-2 items-center border-gray-500 border gap-3">
        <input
          type="text"
          className="w-full placeholder-gray-500 text-gray-200 outline-none h-full"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
