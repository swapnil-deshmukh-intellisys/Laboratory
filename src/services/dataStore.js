/**
 * Simple reactive data store using event emitter pattern.
 */
export class DataStore {
  constructor(initialState = {}) {
    this.state = { ...initialState }
    this.listeners = new Map()
  }

  /**
   * Subscribe to state changes for a key.
   * @param {string} key
   * @param {function} listener
   * @returns {function} Unsubscribe function
   */
  subscribe(key, listener) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set())
    }
    this.listeners.get(key).add(listener)

    // Return unsubscribe
    return () => {
      const set = this.listeners.get(key)
      if (set) {
        set.delete(listener)
        if (set.size === 0) this.listeners.delete(key)
      }
    }
  }

  /**
   * Get a value from state.
   * @param {string} key
   * @returns {any}
   */
  get(key) {
    return this.state[key]
  }

  /**
   * Set a value in state and notify listeners.
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    this.state[key] = value
    const listeners = this.listeners.get(key)
    if (listeners) {
      listeners.forEach(fn => fn(value))
    }
  }

  /**
   * Merge an object into state.
   * @param {object} updates
   */
  merge(updates) {
    for (const [key, value] of Object.entries(updates)) {
      this.set(key, value)
    }
  }

  /**
   * Reset state to initial or provided.
   * @param {object} newState
   */
  reset(newState = {}) {
    this.state = { ...newState }
    this.listeners.clear()
  }
}

/**
 * Global store instance.
 */
export const globalStore = new DataStore({
  user: null,
  cart: [],
  notifications: [],
})

/**
 * Higher-order component helper to subscribe a React component to store keys.
 * @param {React.Component} Component
 * @param {string[]} keys
 * @returns {React.Component}
 */
export function withStore(Component, keys = []) {
  return function WrappedComponent(props) {
    const [, forceUpdate] = React.useReducer(x => x + 1, 0)

    React.useEffect(() => {
      const unsubscribes = keys.map(key =>
        globalStore.subscribe(key, forceUpdate)
      )
      return () => unsubscribes.forEach(fn => fn())
    }, [keys])

    const storeProps = {}
    keys.forEach(key => {
      storeProps[key] = globalStore.get(key)
    })

    return React.createElement(Component, { ...props, ...storeProps })
  }
}
