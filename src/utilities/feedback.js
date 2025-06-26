import Swal from "sweetalert2";

export function extractErrorMessage(error) {
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (typeof data === "string") return data;
    if (data.error) return data.error;
    if (data.message) return data.message;
    return JSON.stringify(data);
  }
  return error.message || "Erreur inconnue";
}

export function alertError(message) {
  Swal.fire("Erreur", message, "error");
}

export function alertSuccess(message) {
  Swal.fire("Succès", message, "success");
}
