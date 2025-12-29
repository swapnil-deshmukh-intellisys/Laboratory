import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

vi.mock('../assets/logo.png', () => ({ default: 'logo-mock' }))

const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

describe('Navbar (interactions)', () => {
  beforeEach(() => {
    navigateMock.mockReset()
  })

  it('opens and closes the menu dropdown', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    expect(screen.queryByText(/Lab Locations/i)).not.toBeInTheDocument()

    await user.click(screen.getByText(/Menu/i))

    expect(screen.getByText(/Lab Locations/i)).toBeInTheDocument()
    expect(screen.getByText(/Help & Support/i)).toBeInTheDocument()

    await user.click(screen.getByText(/Lab Locations/i))

    expect(screen.queryByText(/Lab Locations/i)).not.toBeInTheDocument()
  })

  it('updates selected city when choosing from location dropdown', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    await user.click(screen.getByText(/Select Location/i))

    await user.click(screen.getByText('Mumbai'))

    expect(screen.getByText(/Mumbai/i)).toBeInTheDocument()
  })

  it('navigates to /login when profile icon is clicked', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )

    await user.click(screen.getByText('👤'))

    expect(navigateMock).toHaveBeenCalledWith('/login')
  })
})
