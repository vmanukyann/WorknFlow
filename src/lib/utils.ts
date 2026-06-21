type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...values: ClassValue[]): string {
  return values
    .flatMap((value): string[] => {
      if (!value) {
        return [];
      }

      if (Array.isArray(value)) {
        return [cn(...value)];
      }

      if (typeof value === "object") {
        return Object.entries(value)
          .filter(([, enabled]) => Boolean(enabled))
          .map(([className]) => className);
      }

      return [String(value)];
    })
    .filter(Boolean)
    .join(" ");
}
