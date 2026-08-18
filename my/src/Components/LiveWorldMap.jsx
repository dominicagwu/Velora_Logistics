import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LiveWorldMap() {
  const hubs = [
    { name: "Zurich Hub", coords: [47.3769, 8.5417] },
    { name: "Frankfurt Hub", coords: [50.1109, 8.6821] },
    { name: "Warsaw Hub", coords: [52.2297, 21.0122] },
    { name: "Paris Hub", coords: [48.8566, 2.3522] },
    { name: "London Hub", coords: [51.5074, -0.1278] },
  ];

  const route = hubs.map((hub) => hub.coords);

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden border border-blue-800/40 shadow-2xl">
      <MapContainer
        center={[50.5, 10]}
        zoom={4}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {hubs.map((hub) => (
          <Marker key={hub.name} position={hub.coords}>
            <Popup>{hub.name}</Popup>
          </Marker>
        ))}

        <Polyline
          positions={route}
          pathOptions={{
            color: "#60a5fa",
            weight: 4,
            opacity: 0.9,
          }}
        />
      </MapContainer>
    </div>
  );
}

export default LiveWorldMap;