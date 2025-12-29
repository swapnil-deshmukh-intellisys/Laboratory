import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

vi.mock('./Home2', () => ({ default: () => <div data-testid="home2-mock" /> }))

describe('Home (lifecycle effects)', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('registers and unregisters scroll listener on mount/unmount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('cleans up the package slider interval on unmount', () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')

    const { unmount } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(setIntervalSpy).toHaveBeenCalled()

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
