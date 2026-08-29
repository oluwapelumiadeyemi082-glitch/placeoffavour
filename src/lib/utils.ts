type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

function toValue(input: ClassValue): string {
  if (input == null || input === false || input === "") return "";
  if (typeof input === "string" || typeof input === "number") return String(input);
  if (Array.isArray(input)) return input.map(toValue).filter(Boolean).join(" ");
  if (typeof input === "object")
    return Object.entries(input)
      .filter(([, v]) => Boolean(v))
      .map(([k]) => k)
      .join(" ");
  return "";
}

/** Tiny classnames-compatible helper. Keeps the dependency surface minimal. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.map(toValue).filter(Boolean).join(" ");
}