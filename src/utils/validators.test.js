import { describe, it, expect } from 'vitest'
import {
  isValidMobile,
  isValidEmail,
  isValidDateDMY,
  isValidAge,
  isValidName,
} from './validators'

describe('validators', () => {
  describe('isValidMobile', () => {
    it('accepts 10-digit numbers', () => {
      expect(isValidMobile('9876543210')).toBe(true)
    })

    it('rejects non-numeric or wrong lengths', () => {
      expect(isValidMobile('123')).toBe(false)
      expect(isValidMobile('123456789012')).toBe(false)
      expect(isValidMobile('abc')).toBe(false)
    })
  })

  describe('isValidEmail', () => {
    it('accepts standard email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
    })

    it('rejects malformed emails', () => {
      expect(isValidEmail('bad-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('isValidDateDMY', () => {
    it('accepts dd-mm-yyyy format with valid dates', () => {
      expect(isValidDateDMY('01-12-2024')).toBe(true)
    })

    it('rejects invalid dates and formats', () => {
      expect(isValidDateDMY('31-02-2024')).toBe(false)
      expect(isValidDateDMY('2024-12-01')).toBe(false)
      expect(isValidDateDMY('not-a-date')).toBe(false)
    })
  })

  describe('isValidAge', () => {
    it('accepts ages between 1 and 120', () => {
      expect(isValidAge('25')).toBe(true)
      expect(isValidAge(25)).toBe(true)
    })

    it('rejects ages outside range', () => {
      expect(isValidAge('0')).toBe(false)
      expect(isValidAge('130')).toBe(false)
      expect(isValidAge('abc')).toBe(false)
    })
  })

  describe('isValidName', () => {
    it('accepts letters and spaces, 2–30 chars', () => {
      expect(isValidName('John Doe')).toBe(true)
    })

    it('rejects numbers, symbols, and wrong lengths', () => {
      expect(isValidName('John123')).toBe(false)
      expect(isValidName('J')).toBe(false)
      expect(isValidName('')).toBe(false)
    })
  })
})
