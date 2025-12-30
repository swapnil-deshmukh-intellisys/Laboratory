/**
 * Simple in-memory cache with TTL support.
 */
class MemoryCache {
  constructor() {
    this.cache = new Map()
  }

  set(key, value, ttlMs = 300000) {
    this.cache.set(key, { value, expires: Date.now() + ttlMs })
  }

  get(key) {
    const entry = this.cache.get(key)
    if (!entry) return null
    if (Date.now() > entry.expires) {
      this.cache.delete(key)
      return null
    }
    return entry.value
  }

  clear() {
    this.cache.clear()
  }
}

const cache = new MemoryCache()

/**
 * Wrapper around fetch with timeout, caching, and error handling.
 * @param {string} url
 * @param {object} options
 * @param {object} config
 * @returns {Promise<object>}
 */
export async function apiFetch(url, options = {}, config = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null,
  } = options

  const {
    timeout = 8000,
    useCache = method === 'GET',
    cacheTtl = 300000,
  } = config

  const cacheKey = `${method}:${url}:${JSON.stringify(body)}`

  if (useCache) {
    const cached = cache.get(cacheKey)
    if (cached) return cached
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (useCache) {
      cache.set(cacheKey, data, cacheTtl)
    }

    return data
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw err
  }
}

/**
 * GET convenience wrapper.
 */
export function get(url, config) {
  return apiFetch(url, {}, config)
}

/**
 * POST convenience wrapper.
 */
export function post(url, body, config) {
  return apiFetch(url, { method: 'POST', body }, config)
}

/**
 * PUT convenience wrapper.
 */
export function put(url, body, config) {
  return apiFetch(url, { method: 'PUT', body }, config)
}

/**
 * DELETE convenience wrapper.
 */
export function del(url, config) {
  return apiFetch(url, { method: 'DELETE' }, config)
}

/**
 * Clear the in-memory cache.
 */
export function clearCache() {
  cache.clear()
}
