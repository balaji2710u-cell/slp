/**
 * Normalize a duration value to a non-negative integer of seconds.
 * Supports:
 *   - Numbers or numeric strings: 300 → 300
 *   - Legacy format strings: "15m", "1h 30m", "1h 30m 15s"
 *   - Empty / null / undefined → 0
 */
export function parseDurationToSeconds(val) {
  if (val === undefined || val === null || val === "") return 0;
  if (typeof val === "number") return val >= 0 ? Math.floor(val) : 0;
  if (typeof val === "string") {
    const num = Number(val);
    if (!isNaN(num)) return num >= 0 ? Math.floor(num) : 0;

    let totalSeconds = 0;
    const hourMatch = val.match(/(\d+)\s*h/i);
    const minMatch = val.match(/(\d+)\s*m/i);
    const secMatch = val.match(/(\d+)\s*s/i);

    if (hourMatch) totalSeconds += parseInt(hourMatch[1], 10) * 3600;
    if (minMatch) totalSeconds += parseInt(minMatch[1], 10) * 60;
    if (secMatch) totalSeconds += parseInt(secMatch[1], 10);

    return totalSeconds;
  }
  return 0;
}

export default parseDurationToSeconds;
