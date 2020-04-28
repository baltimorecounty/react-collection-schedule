const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Format an address to a friendly format
 */
const FormatAddress = (address = {}) =>
  address
    ? `${address.StreetAddress}, ${address.City}, ${address.Zip}`
        .split(" ")
        .map((item) => capitalizeFirstLetter(item))
        .join(" ")
    : "";

export { FormatAddress };
