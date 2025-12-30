import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiFetch, get, post, put, del, clearCache } from './apiClient'

// Mock fetch
global.fetch = vi.fn()

describe('apiClient', () => {
  beforeEach(() => {
    fetch.mockClear()
    clearCache()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('apiFetch', () => {
    it('sends GET request and returns JSON', async () => {
      const mockData = { result: 'ok' }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      })

      const result = await apiFetch('https://api.example.com/data')
      expect(result).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: null,
        })
      )
    })

    it('throws on non-2xx responses', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(apiFetch('https://api.example.com/notfound')).rejects.toThrow(
        'API error: 404 Not Found'
      )
    })

    it('caches GET responses by default', async () => {
      const mockData = { result: 'cached' }
      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue(mockData),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: vi.fn().mockResolvedValue(mockData),
        })

      await apiFetch('https://api.example.com/data')
      await apiFetch('https://api.example.com/data')

      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('does not cache POST requests', async () => {
      const mockData = { result: 'post' }
      fetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      })

      await post('https://api.example.com/data', { foo: 'bar' })
      await post('https://api.example.com/data', { foo: 'bar' })

      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('convenience methods', () => {
    it('post sends POST with body', async () => {
      const mockData = { success: true }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      })

      await post('https://api.example.com/data', { foo: 'bar' })

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ foo: 'bar' }),
        })
      )
    })

    it('put sends PUT with body', async () => {
      const mockData = { success: true }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      })

      await put('https://api.example.com/data/1', { foo: 'baz' })

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/data/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ foo: 'baz' }),
        })
      )
    })

    it('del sends DELETE', async () => {
      const mockData = { success: true }
      fetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      })

      await del('https://api.example.com/data/1')

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/data/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      )
    })
  })
})
