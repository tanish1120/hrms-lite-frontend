import axios from "axios";

export const api = axios.create({
  baseURL: "https://hrms-lite-backend-yz3g.onrender.com/",
});

// Normalize error responses
export function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail
      .map((d) => d?.msg || (typeof d === "string" ? d : JSON.stringify(d)))
      .join(" | ");
  }

  if (detail) {
    return typeof detail === "string" ? detail : JSON.stringify(detail);
  }

  return err?.message || "Something went wrong";
}
