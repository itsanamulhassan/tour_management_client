import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

function isErrorSafe(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function apiErrorHandler(error: unknown) {
  if (isErrorSafe(error)) {
    // TypeScript now knows `error` is FetchBaseQueryError
    const message =
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data
        ? String((error.data as { message: string }).message)
        : "Request failed";

    toast.error(message);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error("Unknown error");
}
