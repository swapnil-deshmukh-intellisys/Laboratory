import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CollectionCentres from './CollectionCentres'

describe('CollectionCentres', () => {
  it('renders hero and pagination', () => {
    render(<CollectionCentres />)

    expect(
      screen.getByRole('heading', { name: /Healthy India Ki Trusted Lab/i }),
    ).toBeInTheDocument()

    expect(screen.getByText(/Page\s+1\s+of/i)).toBeInTheDocument()
  })

  it('moves to next page when Next is clicked', async () => {
    const user = userEvent.setup()

    render(<CollectionCentres />)

    const next = screen.getByRole('button', { name: /Next/i })
    await user.click(next)

    expect(screen.getByText(/Page\s+2\s+of/i)).toBeInTheDocument()
  })
})
