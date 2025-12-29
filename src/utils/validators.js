/**
 * Validate Indian mobile number (10 digits, optionally with +91 prefix).
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidMobile = (phone) => {
  if (!phone || typeof phone !== 'string') return false
  const clean = phone.replace(/\D/g, '')
  return clean.length === 10
}

/**
 * Validate email address.
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate date in dd-mm-yyyy format.
 * @param {string} dateStr
 * @returns {boolean}
 */
export const isValidDateDMY = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return false
  const dmyRegex = /^\d{2}-\d{2}-\d{4}$/
  if (!dmyRegex.test(dateStr)) return false
  const [day, month, year] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

/**
 * Validate age (1–120).
 * @param {string|number} age
 * @returns {boolean}
 */
export const isValidAge = (age) => {
  const num = Number(age)
  return !isNaN(num) && num > 0 && num <= 120
}

/**
 * Validate full name (letters and spaces only, 2–30 chars).
 * @param {string} name
 * @returns {boolean}
 */
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false
  const nameRegex = /^[a-zA-Z ]{2,30}$/
  return nameRegex.test(name.trim())
}
