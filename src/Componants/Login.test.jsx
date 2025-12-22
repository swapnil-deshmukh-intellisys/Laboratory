import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

describe('Login', () => {
  it('renders the registration form', () => {
    render(<Login />)

    expect(screen.getByText(/User Registration/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()

    render(<Login />)

    await user.click(screen.getByRole('button', { name: /Submit/i }))

    expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Mobile is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
  })

  it('can send OTP after entering a valid email', async () => {
    const user = userEvent.setup()
    const setTimeoutSpy = vi
      .spyOn(globalThis, 'setTimeout')
      .mockImplementation((fn) => {
        fn()
        return 0
      })

    render(<Login />)

    await user.type(screen.getByLabelText(/Email Address/i), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /Send OTP/i }))

    expect(screen.getByText(/OTP sent to test@example.com/i)).toBeInTheDocument()

    setTimeoutSpy.mockRestore()
  })
})
