import { useState } from "react";
import CoverageMap from "../../components/coverage/CoverageMap";
import DistrictSearch from "../../components/coverage/DistrictSearch";

const Coverage = () => {
  const [search, setSearch] = useState(""); // IMPORTANT: default empty string

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h2>

      <DistrictSearch search={search} setSearch={setSearch} />

      <CoverageMap search={search} />
    </div>
  );
};

export default Coverage;
