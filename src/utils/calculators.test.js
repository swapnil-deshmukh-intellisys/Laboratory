import { describe, it, expect } from 'vitest'
import { calculateBMI, getBMICategory, a1cToGlucose, calculateEGFR } from './calculators'

describe('calculators', () => {
  describe('calculateBMI', () => {
    it('calculates BMI correctly', () => {
      expect(calculateBMI(70, 175)).toBeCloseTo(22.86, 2)
    })

    it('returns null for invalid inputs', () => {
      expect(calculateBMI(-70, 175)).toBeNull()
      expect(calculateBMI('abc', 175)).toBeNull()
    })
  })

  describe('getBMICategory', () => {
    it('maps BMI to category', () => {
      expect(getBMICategory(17)).toBe('Underweight')
      expect(getBMICategory(23)).toBe('Normal')
      expect(getBMICategory(27)).toBe('Overweight')
      expect(getBMICategory(32)).toBe('Obese')
    })

    it('returns Unknown for invalid BMI', () => {
      expect(getBMICategory(NaN)).toBe('Unknown')
      expect(getBMICategory('abc')).toBe('Unknown')
    })
  })

  describe('a1cToGlucose', () => {
    it('estimates glucose from A1c', () => {
      expect(a1cToGlucose(6)).toBeCloseTo(125.5, 1)
    })

    it('returns null for out-of-range values', () => {
      expect(a1cToGlucose(-1)).toBeNull()
      expect(a1cToGlucose(20)).toBeNull()
    })
  })

  describe('calculateEGFR', () => {
    it('calculates eGFR for valid inputs', () => {
      const result = calculateEGFR(1.0, 40, 'male')
      expect(typeof result).toBe('number')
      expect(result).toBeGreaterThan(0)
    })

    it('returns null for invalid inputs', () => {
      expect(calculateEGFR(0, 40, 'male')).toBeNull()
      expect(calculateEGFR(1.0, -5, 'male')).toBeNull()
      expect(calculateEGFR(1.0, 40, 'unknown')).toBeNull()
    })
  })
})
