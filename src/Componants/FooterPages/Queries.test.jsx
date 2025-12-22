import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Queries from './Queries'

describe('Queries', () => {
  it('renders headings and escalation matrix', () => {
    render(<Queries />)

    expect(
      screen.getByRole('heading', {
        name: /Do You Have Any Questions Or Queries\?/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /Excalation Matrix/i })).toBeInTheDocument()
    expect(screen.getByText(/Level 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Level 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Level 3/i)).toBeInTheDocument()
  })

  it('has a query dropdown and submit button', async () => {
    const user = userEvent.setup()

    render(<Queries />)

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'booking')

    expect(select).toHaveValue('booking')

    expect(screen.getByRole('button', { name: /Submit Query/i })).toBeInTheDocument()
  })
})
