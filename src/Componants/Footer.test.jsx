import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer', () => {
  it('renders key sections', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument()
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument()
    expect(screen.getByText(/Follow Us/i)).toBeInTheDocument()
  })

  it('includes the copyright line', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(screen.getByText(/© 2025 Hospital Labs/i)).toBeInTheDocument()
  })
})
