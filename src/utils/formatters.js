/**
 * Format a date string to a readable format.
 * @param {string} iso - ISO date string
 * @returns {string}
 */
export const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

/**
 * Format a currency amount in INR.
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Capitalize the first letter of each word.
 * @param {string} str
 * @returns {string}
 */
export const capitalizeWords = (str) => {
  if (!str || typeof str !== 'string') return ''
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Truncate a string to a max length with ellipsis.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export const truncate = (str, maxLen = 30) => {
  if (!str || typeof str !== 'string') return ''
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen - 3) + '...'
}
