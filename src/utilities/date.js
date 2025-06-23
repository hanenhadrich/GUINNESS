/**
 * Parse une date au format "YYYY-MM-DD" en Date locale à minuit
 * @param {string} dateString - la date au format "YYYY-MM-DD"
 * @returns {Date|null} une instance de Date ou null si dateString est falsy
 */
export function parseDateLocal(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Mois est indexé à partir de 0
}

/**
 * Formate une instance de Date en une string au format "YYYY-MM-DD"
 * @param {Date} date - une instance de Date
 * @returns {string} une string au format "YYYY-MM-DD"
 */
export function formatDateLocal(date) {
  if (!(date instanceof Date) || isNaN(date)) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Ajoute un certain nombre de jours à une date
 * @param {Date|string} date - Date ou string au format "YYYY-MM-DD"
 * @param {number} days - Nombre de jours à ajouter
 * @returns {Date|null}
 */
export function addDays(date, days) {
  if (!date) return null;
  const d = typeof date === 'string' ? parseDateLocal(date) : new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
