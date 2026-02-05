import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const api = axios.create({
  baseURL: BASE,
});

// Normalize error responses (e.g. FastAPI / Pydantic validation errors)
export function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;

  if (Array.isArray(detail)) {
    // Only return human-friendly messages (avoid exposing internal locations like "body > email")
    return detail
      .map((d) => d?.msg || (typeof d === "string" ? d : JSON.stringify(d)))
      .join(" | ");
  }

  if (detail) {
    return typeof detail === "string" ? detail : JSON.stringify(detail);
  }

  return err?.message || "Something went wrong";
}
