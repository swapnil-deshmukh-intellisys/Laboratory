import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddMemberForm from './AddMemberForm'

describe('AddMemberForm (validation edge cases)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows phone validation error for non-10-digit value', async () => {
    const user = userEvent.setup()

    render(<AddMemberForm />)

    const phoneInput = screen.getByPlaceholderText(/1234567890/i)

    await user.type(phoneInput, '123')

    expect(screen.getByText(/Invalid phone/i)).toBeInTheDocument()
  })

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup()

    render(<AddMemberForm />)

    const emailInput = screen.getByPlaceholderText(/john@example.com/i)

    await user.type(emailInput, 'bad-email')

    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()
  })
})
