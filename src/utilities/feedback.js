export const alertSuccess = (message) => {
  alert(`✅ ${message}`);
};

export const alertError = (message) => {
  alert(`❌ ${message}`);
};

export const extractErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || "Erreur inconnue";
};
