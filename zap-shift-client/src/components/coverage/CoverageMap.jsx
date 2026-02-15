import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import warehouses from "../../assets/data/warehouses.json";
import "leaflet/dist/leaflet.css";

// Auto Zoom Component
const AutoZoom = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length === 1) {
      map.setView([data[0].latitude, data[0].longitude], 11);
    }
  }, [data, map]);

  return null;
};

const CoverageMap = ({ search }) => {

  // SAFE FILTER (NO ERROR)
  const filteredData = warehouses.filter((item) => {
    const districtName = item?.district || "";
    const searchText = search || "";

    return districtName
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  return (
    <MapContainer
      center={[23.685, 90.3563]}
      zoom={7}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-2xl shadow-lg"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <AutoZoom data={filteredData} />

      {filteredData.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            <div className="space-y-2">
              <h3 className="font-bold text-lg">
                {location.district}
              </h3>
              <p><strong>Region:</strong> {location.region}</p>
              <p><strong>Status:</strong> {location.status}</p>
              <p>
                <strong>Covered Areas:</strong><br />
                {location.covered_area.join(", ")}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CoverageMap;
