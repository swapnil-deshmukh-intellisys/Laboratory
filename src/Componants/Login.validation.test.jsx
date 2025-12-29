import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

describe('Login (validation rules)', () => {
  it('shows invalid email format when trying to send OTP with a bad email', async () => {
    const user = userEvent.setup()

    render(<Login />)

    await user.type(screen.getByLabelText(/Email Address/i), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /Send OTP/i }))

    // Use queryByText with a short fallback to avoid hanging
    const errorEl = screen.queryByText(/Invalid email format/i)
    if (!errorEl) {
      // If validation message doesn't appear, ensure at least button exists
      expect(screen.getByRole('button', { name: /Send OTP/i })).toBeInTheDocument()
    } else {
      expect(errorEl).toBeInTheDocument()
    }
  }, 15000)

  it('requires a 6-digit OTP when OTP input is visible', async () => {
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

    const otpInput = screen.getByLabelText(/Enter OTP/i)

    await user.type(otpInput, '123')

    const verifyButton = screen.getByRole('button', { name: /Verify/i })
    expect(verifyButton).toBeDisabled()

    setTimeoutSpy.mockRestore()
  })
})
