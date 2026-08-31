import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ==========================================
// FIX LEAFLET DEFAULT MARKER ICONS
// ==========================================
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ==========================================
// FIT MAP TO ROUTE
// ==========================================
function FitMap({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [points, map]);

  return null;
}

// ==========================================
// LIVE CURRENT LOCATION MARKER
// ==========================================
function CurrentLocationMarker({ shipment }) {
  const map = useMap();

  useEffect(() => {
    if (
      shipment?.current_lat == null ||
      shipment?.current_lng == null
    ) {
      return;
    }

    map.panTo([
      Number(shipment.current_lat),
      Number(shipment.current_lng),
    ]);
  }, [
    shipment?.current_lat,
    shipment?.current_lng,
    map,
  ]);

  if (
    shipment?.current_lat == null ||
    shipment?.current_lng == null
  ) {
    return null;
  }

  return (
    <Marker
      position={[
        Number(shipment.current_lat),
        Number(shipment.current_lng),
      ]}
    >
      <Popup>
        <div>
          <strong>📍 Current Shipment Location</strong>

          <br />

          <span className="text-sm">
            {shipment.location ||
              "Current location"}
          </span>

          <br />

          <span className="text-xs text-gray-500">
            Live location
          </span>
        </div>
      </Popup>
    </Marker>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
function CustomerShipmentMap({ shipment }) {
  // ==========================================
  // CHECK COORDINATES
  // ==========================================
  const hasOrigin =
    shipment?.origin_lat != null &&
    shipment?.origin_lng != null;

  const hasDestination =
    shipment?.destination_lat != null &&
    shipment?.destination_lng != null;

  const hasCurrentLocation =
    shipment?.current_lat != null &&
    shipment?.current_lng != null;

  // ==========================================
  // MAP POINTS
  // ==========================================
  const points = [];

  if (hasOrigin) {
    points.push([
      Number(shipment.origin_lat),
      Number(shipment.origin_lng),
    ]);
  }

  if (hasDestination) {
    points.push([
      Number(shipment.destination_lat),
      Number(shipment.destination_lng),
    ]);
  }

  if (hasCurrentLocation) {
    points.push([
      Number(shipment.current_lat),
      Number(shipment.current_lng),
    ]);
  }

  // ==========================================
  // ROUTE
  // ==========================================
  const route = [];

  if (hasOrigin) {
    route.push([
      Number(shipment.origin_lat),
      Number(shipment.origin_lng),
    ]);
  }

  if (hasCurrentLocation) {
    route.push([
      Number(shipment.current_lat),
      Number(shipment.current_lng),
    ]);
  }

  if (hasDestination) {
    route.push([
      Number(shipment.destination_lat),
      Number(shipment.destination_lng),
    ]);
  }

  // ==========================================
  // NO COORDINATES
  // ==========================================
  if (points.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-gray-100">
          <p className="text-sm font-medium text-indigo-600">
            Shipment Tracking
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Live Shipment Location
          </h2>
        </div>

        <div className="h-[450px] flex items-center justify-center bg-gray-100">

          <div className="text-center px-6">

            <div className="text-4xl mb-3">
              📍
            </div>

            <h3 className="font-semibold text-slate-900">
              Location not available yet
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              The shipment coordinates have not
              been added yet.
            </p>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // MAP CENTER
  // ==========================================
  const mapCenter = hasCurrentLocation
    ? [
        Number(shipment.current_lat),
        Number(shipment.current_lng),
      ]
    : points[0];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* ========================================
          MAP HEADER
      ======================================== */}
      <div className="p-6 border-b border-gray-100">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <div>

            <p className="text-sm font-medium text-indigo-600">
              Shipment Tracking
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Live Shipment Location
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Track your shipment from origin to destination
            </p>

          </div>

          <div className="flex items-center gap-2">

            <span
              className={`relative flex h-3 w-3 ${
                hasCurrentLocation
                  ? ""
                  : "opacity-40"
              }`}
            >

              {hasCurrentLocation && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              )}

              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />

            </span>

            <span className="text-sm font-medium text-green-600">
              {hasCurrentLocation
                ? "Live Location"
                : "Location Pending"}
            </span>

          </div>

        </div>

      </div>

      {/* ========================================
          MAP
      ======================================== */}
      <div className="h-[450px] w-full">

        <MapContainer
          center={mapCenter}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ====================================
              ORIGIN
          ==================================== */}
          {hasOrigin && (
            <Marker
              position={[
                Number(shipment.origin_lat),
                Number(shipment.origin_lng),
              ]}
            >
              <Popup>

                <div>

                  <strong>
                    📦 Shipment Origin
                  </strong>

                  <br />

                  {shipment.sender_address && (
                    <>
                      {shipment.sender_address}
                      <br />
                    </>
                  )}

                  {shipment.sender_city},{" "}
                  {shipment.sender_country}

                </div>

              </Popup>
            </Marker>
          )}

          {/* ====================================
              CURRENT LOCATION
          ==================================== */}
          <CurrentLocationMarker
            shipment={shipment}
          />

          {/* ====================================
              DESTINATION
          ==================================== */}
          {hasDestination && (
            <Marker
              position={[
                Number(shipment.destination_lat),
                Number(shipment.destination_lng),
              ]}
            >
              <Popup>

                <div>

                  <strong>
                    🏁 Delivery Destination
                  </strong>

                  <br />

                  {shipment.receiver_address && (
                    <>
                      {shipment.receiver_address}
                      <br />
                    </>
                  )}

                  {shipment.receiver_city},{" "}
                  {shipment.receiver_country}

                </div>

              </Popup>
            </Marker>
          )}

          {/* ====================================
              ROUTE
          ==================================== */}
          {route.length >= 2 && (
            <Polyline
              positions={route}
              pathOptions={{
                color: "#2563eb",
                weight: 5,
              }}
            />
          )}

          {/* ====================================
              AUTO FIT
          ==================================== */}
          <FitMap points={points} />

        </MapContainer>

      </div>

      {/* ========================================
          LOCATION DETAILS
      ======================================== */}
      <div className="p-6 border-t border-gray-100">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ORIGIN */}
          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs font-semibold text-gray-500 uppercase">
              From
            </p>

            <p className="font-semibold text-slate-900 mt-1">
              {shipment.sender_city || "Origin"},{" "}
              {shipment.sender_country || ""}
            </p>

          </div>

          {/* CURRENT */}
          <div className="bg-green-50 rounded-xl p-4">

            <p className="text-xs font-semibold text-green-600 uppercase">
              Current Location
            </p>

            <p className="font-semibold text-slate-900 mt-1">
              {shipment.location ||
                (hasCurrentLocation
                  ? "Live position"
                  : "Not available")}
            </p>

            {hasCurrentLocation && (
              <p className="text-xs text-green-600 mt-1">
                ● Live tracking active
              </p>
            )}

          </div>

          {/* DESTINATION */}
          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-xs font-semibold text-gray-500 uppercase">
              To
            </p>

            <p className="font-semibold text-slate-900 mt-1">
              {shipment.receiver_city ||
                "Destination"},{" "}
              {shipment.receiver_country || ""}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerShipmentMap;