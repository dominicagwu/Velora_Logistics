export function generateTrackingNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `VL${random}`;
}