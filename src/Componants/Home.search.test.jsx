import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

vi.mock('./Home2', () => ({ default: () => <div data-testid="home2-mock" /> }))

describe('Home (search behavior)', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('clears search input and logs when pressing Enter with non-empty text', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const input = screen.getByPlaceholderText(/Search tests/i)

    fireEvent.change(input, { target: { value: 'cbc' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(logSpy).toHaveBeenCalledWith('Searching for:', 'cbc')
    expect(input).toHaveValue('')
  })

  it('does not log when pressing Enter with empty text', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    const input = screen.getByPlaceholderText(/Search tests/i)

    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(logSpy).not.toHaveBeenCalled()
  })
})
