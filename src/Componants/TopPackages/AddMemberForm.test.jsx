import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddMemberForm from './AddMemberForm'

describe('AddMemberForm (validation + submission)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows required field error when Full Name is cleared', async () => {
    const user = userEvent.setup()

    render(<AddMemberForm />)

    const fullNameInput = screen.getByPlaceholderText(/John Doe/i)

    await user.type(fullNameInput, 'John')
    await user.clear(fullNameInput)

    expect(screen.getByText(/This field is required/i)).toBeInTheDocument()
  })

  it('adds a member when required fields are valid', async () => {
    const user = userEvent.setup()
    vi.spyOn(Date, 'now').mockReturnValue(1700000000000)

    render(<AddMemberForm />)

    await user.type(screen.getByPlaceholderText(/John Doe/i), 'John Doe')
    await user.type(screen.getByPlaceholderText(/dd-mm-yyyy/i), '01-01-2000')
    await user.type(screen.getByPlaceholderText(/25/i), '25')

    const [genderSelect, relationSelect] = screen.getAllByRole('combobox')

    await user.selectOptions(
      genderSelect,
      'male'
    )
    await user.selectOptions(
      relationSelect,
      'self'
    )

    await user.click(screen.getByRole('button', { name: /Add Member/i }))

    expect(screen.getByText(/Member added successfully/i)).toBeInTheDocument()

    const saved = JSON.parse(localStorage.getItem('familyMembers') || '[]')
    expect(saved).toHaveLength(1)
    expect(saved[0]).toMatchObject({
      id: 1700000000000,
      fullName: 'John Doe',
      dob: '01-01-2000',
      age: '25',
      gender: 'male',
      relation: 'self',
    })
  })
})
