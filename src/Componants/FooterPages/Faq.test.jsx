import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Faq from './Faq'

describe('Faq', () => {
  it('renders the FAQ heading', () => {
    render(<Faq />)

    expect(screen.getByRole('heading', { name: /FAQs/i })).toBeInTheDocument()
  })

  it('toggles an answer when a question is clicked', () => {
    render(<Faq />)

    const question = screen.getByRole('heading', {
      name: /What does Redcliffe Labs do\?/i,
    })

    fireEvent.click(question)

    expect(
      screen.getByText(/fastest-growing network of diagnostic services/i),
    ).toBeInTheDocument()

    fireEvent.click(question)

    expect(
      screen.queryByText(/fastest-growing network of diagnostic services/i),
    ).not.toBeInTheDocument()
  })
})
