/**
 * Flexible address geocoder for Velora Freight.
 *
 * Uses OpenStreetMap Nominatim.
 *
 * The function tries several versions of the address
 * so different address and postal-code formats work.
 */

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const clean = (value) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .replace(/,\s*,/g, ",")
    .trim();

const unique = (items) => [
  ...new Set(
    items
      .map(clean)
      .filter(Boolean)
  ),
];

async function searchNominatim(query) {
  const encoded = encodeURIComponent(query);

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encoded}`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Geocoding service returned ${response.status}`
    );
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    return null;
  }

  const result = data[0];

  const lat = Number(result.lat);
  const lng = Number(result.lon);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng)
  ) {
    return null;
  }

  return {
    lat,
    lng,
    displayName:
      result.display_name || query,
  };
}

export async function geocodeAddress(address) {
  if (!address || !address.trim()) {
    throw new Error(
      "Address is required for geocoding."
    );
  }

  const fullAddress = clean(address);

  const parts = fullAddress
    .split(",")
    .map(clean)
    .filter(Boolean);

  let street ;
  let city = "";
  let country = "";
  let postalCode = "";

  if (parts.length >= 5) {
    postalCode =
      parts[parts.length - 1];

    country =
      parts[parts.length - 2];

    city =
      parts[parts.length - 4];

    street = parts
      .slice(0, parts.length - 4)
      .join(", ");
  } else if (parts.length === 4) {
    street = parts[0];
    city = parts[1];
    country = parts[3];
  } else if (parts.length === 3) {
    street = parts[0];
    city = parts[1];
    country = parts[2];
  } else {
    street = fullAddress;
  }

  const normalizedPostal = postalCode
    .replace(/\s+/g, " ")
    .trim();

  const attempts = unique([
    // Complete address
    fullAddress,

    // Street + city + country + postal code
    [
      street,
      city,
      country,
      normalizedPostal,
    ]
      .filter(Boolean)
      .join(", "),

    // Street + city + country
    [
      street,
      city,
      country,
    ]
      .filter(Boolean)
      .join(", "),

    // Street + country + postal code
    [
      street,
      country,
      normalizedPostal,
    ]
      .filter(Boolean)
      .join(", "),

    // City + country + postal code
    [
      city,
      country,
      normalizedPostal,
    ]
      .filter(Boolean)
      .join(", "),

    // City + country
    [
      city,
      country,
    ]
      .filter(Boolean)
      .join(", "),

    // Postal code + country
    [
      normalizedPostal,
      country,
    ]
      .filter(Boolean)
      .join(", "),

    // Address without the final part
    parts
      .slice(0, -1)
      .join(", "),
  ]);

  let lastError = null;

  for (
    let i = 0;
    i < attempts.length;
    i++
  ) {
    const query = attempts[i];

    try {
      const result =
        await searchNominatim(query);

      if (result) {
        return result;
      }
    } catch (error) {
      console.warn(
        "Geocoding attempt failed:",
        query,
        error
      );

      lastError = error;
    }

    if (i < attempts.length - 1) {
      await wait(1100);
    }
  }

  console.error(
    "All geocoding attempts failed.",
    {
      address: fullAddress,
      attempts,
      lastError,
    }
  );

  throw new Error(
    `Location not found: ${fullAddress}`
  );
}