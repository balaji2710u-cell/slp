/**
 * UUID v4 regex pattern for ID validation.
 * Example: 550e8400-e29b-41d4-a716-446655440000
 */
export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Returns true if the supplied string is a valid UUID v4.
 *
 * @param {string} id
 * @returns {boolean}
 */
export function isValidUUID(id) {
  return typeof id === "string" && UUID_REGEX.test(id);
}

export default isValidUUID;
