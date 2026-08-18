import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ShipmentMap() {
  const route = [
    [47.3769, 8.5417],   // Zurich
    [50.1109, 8.6821],   // Frankfurt
    [52.2297, 21.0122],  // Warsaw
  ];

  return (
    <div className="h-80 w-full rounded-2xl overflow-hidden border border-gray-200">
      <MapContainer
        center={[50.1109, 8.6821]}
        zoom={5}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={route[0]}>
          <Popup>Origin Hub - Zurich</Popup>
        </Marker>

        <Marker position={route[1]}>
          <Popup>Current Location - Frankfurt</Popup>
        </Marker>

        <Marker position={route[2]}>
          <Popup>Destination Hub - Warsaw</Popup>
        </Marker>

        <Polyline positions={route} color="#2563eb" weight={4} />
      </MapContainer>
    </div>
  );
}

export default ShipmentMap;