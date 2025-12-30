import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DataStore, globalStore } from './dataStore'

describe('DataStore', () => {
  let store

  beforeEach(() => {
    store = new DataStore()
  })

  describe('get/set', () => {
    it('sets and gets a value', () => {
      store.set('foo', 'bar')
      expect(store.get('foo')).toBe('bar')
    })

    it('returns undefined for missing keys', () => {
      expect(store.get('missing')).toBeUndefined()
    })
  })

  describe('subscribe', () => {
    it('notifies listener on set', () => {
      const listener = vi.fn()
      store.subscribe('foo', listener)

      store.set('foo', 'bar')
      expect(listener).toHaveBeenCalledWith('bar')
    })

    it('notifies only relevant listeners', () => {
      const listenerFoo = vi.fn()
      const listenerBaz = vi.fn()
      store.subscribe('foo', listenerFoo)
      store.subscribe('baz', listenerBaz)

      store.set('foo', 'bar')
      expect(listenerFoo).toHaveBeenCalled()
      expect(listenerBaz).not.toHaveBeenCalled()
    })

    it('unsubscribe stops notifications', () => {
      const listener = vi.fn()
      const unsub = store.subscribe('foo', listener)

      unsub()
      store.set('foo', 'bar')
      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('merge', () => {
    it('merges multiple updates', () => {
      store.merge({ a: 1, b: 2 })
      expect(store.get('a')).toBe(1)
      expect(store.get('b')).toBe(2)
    })
  })

  describe('reset', () => {
    it('resets state and clears listeners', () => {
      const listener = vi.fn()
      store.subscribe('foo', listener)
      store.set('foo', 'bar')

      store.reset({ x: 1 })
      expect(store.get('foo')).toBeUndefined()
      expect(store.get('x')).toBe(1)

      // After reset, listeners are cleared, so no further notifications
      store.set('foo', 'baz')
      expect(listener).toHaveBeenCalledTimes(1) // only called before reset
    })
  })
})

describe('globalStore', () => {
  it('has initial state', () => {
    expect(globalStore.get('user')).toBeNull()
    expect(globalStore.get('cart')).toEqual([])
    expect(globalStore.get('notifications')).toEqual([])
  })
})
