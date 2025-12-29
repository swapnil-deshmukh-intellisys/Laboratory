import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency, capitalizeWords, truncate } from './formatters'

describe('formatters', () => {
  describe('formatDate', () => {
    it('formats valid ISO date to dd-mm-yyyy', () => {
      expect(formatDate('2024-12-01T00:00:00Z')).toBe('01-12-2024')
    })

    it('returns empty string for invalid input', () => {
      expect(formatDate('not-a-date')).toBe('')
      expect(formatDate('')).toBe('')
    })
  })

  describe('formatCurrency', () => {
    it('formats number as INR currency', () => {
      expect(formatCurrency(1599)).toBe('₹1,599')
    })

    it('handles zero and invalid input', () => {
      expect(formatCurrency(0)).toBe('₹0')
      expect(formatCurrency(NaN)).toBe('₹0')
      expect(formatCurrency('abc')).toBe('₹0')
    })
  })

  describe('capitalizeWords', () => {
    it('capitalizes each word', () => {
      expect(capitalizeWords('john doe')).toBe('John Doe')
    })

    it('handles empty and non-string input', () => {
      expect(capitalizeWords('')).toBe('')
      expect(capitalizeWords(null)).toBe('')
      expect(capitalizeWords(123)).toBe('')
    })
  })

  describe('truncate', () => {
    it('truncates long strings with ellipsis', () => {
      expect(truncate('This is a very long string', 11)).toBe('This is ...')
    })

    it('returns short strings unchanged', () => {
      expect(truncate('short', 10)).toBe('short')
    })

    it('handles empty and non-string input', () => {
      expect(truncate('', 10)).toBe('')
      expect(truncate(null, 10)).toBe('')
    })
  })
})
