import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the navbar brand', () => {
    render(<App />)

    expect(screen.getAllByText(/Hospital Labs/i).length).toBeGreaterThan(0)
  })
})
