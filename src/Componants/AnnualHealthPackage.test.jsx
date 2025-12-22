import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('../assets/logo.png', () => ({ default: 'logo.png' }))
vi.mock('../assets/hero1.jpg', () => ({ default: 'hero1.jpg' }))

import AnnualHealthPackage from './AnnualHealthPackage'

describe('AnnualHealthPackage', () => {
  it('renders core headings and CTAs', () => {
    render(<AnnualHealthPackage />)

    expect(
      screen.getByRole('heading', {
        name: /Annual Health Checkup- Advance with Free HsCRP/i,
        level: 1,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/Home Sample Collection Available/i),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('button', { name: /Book Now/i }).length).toBeGreaterThan(0)
    expect(
      screen.getByRole('button', { name: /\+ Add To Cart/i }),
    ).toBeInTheDocument()
  })

  it('shows the tests included section', () => {
    render(<AnnualHealthPackage />)

    expect(
      screen.getByRole('heading', {
        name: /Annual Health Checkup- Advance with Free HSCRP/i,
        level: 2,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText(/Lipid Profile/i)).toBeInTheDocument()
    expect(screen.getByText(/Kidney Function Test/i)).toBeInTheDocument()
  })
})
