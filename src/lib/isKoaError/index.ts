export type KoaError = Error & {
  status?: number;
  message: string;
};

export const isKoaError = (error: unknown): error is KoaError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error
  );
};
