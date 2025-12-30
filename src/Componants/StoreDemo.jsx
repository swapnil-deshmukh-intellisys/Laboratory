import React, { useState, useEffect } from 'react'
import { globalStore } from '../services/dataStore'
import { post } from '../services/apiClient'

const StoreDemo = () => {
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Sync with global store
  useEffect(() => {
    const unsubUser = globalStore.subscribe('user', setUser)
    const unsubNotifs = globalStore.subscribe('notifications', setNotifications)
    return () => {
      unsubUser()
      unsubNotifs()
    }
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await post('/api/login', { email: 'demo@example.com' })
      globalStore.set('user', { name: 'Demo User', email: 'demo@example.com' })
      globalStore.set('notifications', [
        { id: 1, message: 'Welcome back!', type: 'info' },
      ])
    } catch (err) {
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    globalStore.set('user', null)
    globalStore.set('notifications', [])
  }

  const addNotification = () => {
    const current = globalStore.get('notifications') || []
    globalStore.set('notifications', [
      ...current,
      {
        id: Date.now(),
        message: `Notification at ${new Date().toLocaleTimeString()}`,
        type: 'success',
      },
    ])
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Data Store Demo</h2>

      <section style={{ marginBottom: '2rem' }}>
        <h3>User</h3>
        {user ? (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login Demo'}
          </button>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Notifications</h3>
        <button onClick={addNotification}>Add Notification</button>
        <ul>
          {notifications.map(n => (
            <li key={n.id}>
              {n.message} ({n.type})
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default StoreDemo
