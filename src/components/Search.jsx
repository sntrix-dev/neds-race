const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      placeholder="Search..."
      className="w-full max-w-md px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
