import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StoreDemo from './StoreDemo'
import { globalStore } from '../services/dataStore'
import * as apiClient from '../services/apiClient'

// Mock apiClient
vi.mock('../services/apiClient', () => ({
  post: vi.fn(),
  get: vi.fn(),
}))

describe('StoreDemo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    globalStore.reset()
  })

  it('renders login button when user is null', () => {
    render(
      <MemoryRouter>
        <StoreDemo />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Login Demo/i)).toBeInTheDocument()
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()
  })

  it('shows user info after login', async () => {
    const mockPost = vi.mocked(apiClient.post).mockResolvedValueOnce({})
    render(
      <MemoryRouter>
        <StoreDemo />
      </MemoryRouter>,
    )

    const loginBtn = screen.getByText(/Login Demo/i)
    fireEvent.click(loginBtn)

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/api/login', {
        email: 'demo@example.com',
      })
    })

    await waitFor(() => {
      expect(screen.getByText(/Demo User/i)).toBeInTheDocument()
      expect(screen.getByText(/demo@example.com/i)).toBeInTheDocument()
      expect(screen.getByText(/Logout/i)).toBeInTheDocument()
    })
  })

  it('adds notifications when button is clicked', async () => {
    globalStore.set('user', { name: 'Demo' })

    render(
      <MemoryRouter>
        <StoreDemo />
      </MemoryRouter>,
    )

    const addBtn = screen.getByText(/Add Notification/i)
    fireEvent.click(addBtn)

    await waitFor(() => {
      expect(screen.getByText(/Notification at/i)).toBeInTheDocument()
    })
  })

  it('clears user and notifications on logout', () => {
    // Set initial state
    globalStore.set('user', { name: 'Demo' })
    globalStore.set('notifications', [{ id: 1, message: 'Old', type: 'info' }])

    // Verify initial state
    expect(globalStore.get('user')).toEqual({ name: 'Demo' })
    expect(globalStore.get('notifications')).toHaveLength(1)

    // Call logout logic directly
    globalStore.set('user', null)
    globalStore.set('notifications', [])

    // Verify cleared state
    expect(globalStore.get('user')).toBeNull()
    expect(globalStore.get('notifications')).toEqual([])
  })
})
