/**
 * Calculate BMI from weight (kg) and height (cm).
 * @param {number} weightKg
 * @param {number} heightCm
 * @returns {number | null}
 */
export const calculateBMI = (weightKg, heightCm) => {
  if (typeof weightKg !== 'number' || typeof heightCm !== 'number') return null
  if (weightKg <= 0 || heightCm <= 0) return null
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)
  return Number(bmi.toFixed(2))
}

/**
 * Return BMI category label.
 * @param {number} bmi
 * @returns {string}
 */
export const getBMICategory = (bmi) => {
  if (typeof bmi !== 'number' || isNaN(bmi)) return 'Unknown'
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

/**
 * Calculate estimated blood glucose from A1c (%).
 * @param {number} a1c
 * @returns {number | null}
 */
export const a1cToGlucose = (a1c) => {
  if (typeof a1c !== 'number' || a1c <= 0 || a1c > 15) return null
  const glucose = 28.7 * a1c - 46.7
  return Number(glucose.toFixed(1))
}

/**
 * Calculate estimated GFR (eGFR) using the simplified MDRD formula.
 * @param {number} serumCreatinine - mg/dL
 * @param {number} age - years
 * @param {'male'|'female'|'other'} gender
 * @returns {number | null}
 */
export const calculateEGFR = (serumCreatinine, age, gender) => {
  if (
    typeof serumCreatinine !== 'number' ||
    typeof age !== 'number' ||
    !['male', 'female', 'other'].includes(gender) ||
    serumCreatinine <= 0 ||
    age <= 0
  ) {
    return null
  }
  const isFemale = gender === 'female'
  const factor = isFemale ? 0.742 : 1
  const egfr = 186 * (serumCreatinine ** -1.154) * (age ** -0.203) * factor
  return Math.round(egfr)
}
