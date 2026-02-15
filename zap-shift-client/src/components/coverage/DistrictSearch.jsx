import { FaSearch } from "react-icons/fa";

const DistrictSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-md">

        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search district..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-primary
                     shadow-sm"
        />
      </div>
    </div>
  );
};

export default DistrictSearch;
