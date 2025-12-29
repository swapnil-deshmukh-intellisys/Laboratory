import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HealthCalc from './HealthCalc'

describe('HealthCalc', () => {
  it('renders calculator sections', () => {
    render(
      <MemoryRouter>
        <HealthCalc />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Health Calculators/i)).toBeInTheDocument()
    expect(screen.getByText(/BMI/i)).toBeInTheDocument()
    expect(screen.getByText(/A1c → Glucose/i)).toBeInTheDocument()
    expect(screen.getByText(/eGFR/i)).toBeInTheDocument()
  })

  it('calculates and displays BMI when weight and height are entered', async () => {
    render(
      <MemoryRouter>
        <HealthCalc />
      </MemoryRouter>,
    )

    const weightInput = screen.getByPlaceholderText(/Weight \(kg\)/i)
    const heightInput = screen.getByPlaceholderText(/Height \(cm\)/i)

    await fireEvent.change(weightInput, { target: { value: '70' } })
    await fireEvent.change(heightInput, { target: { value: '175' } })

    expect(screen.getByText(/BMI:/i)).toBeInTheDocument()
    expect(screen.getByText(/Normal/i)).toBeInTheDocument()
  })

  it('calculates and displays glucose when A1c is entered', async () => {
    render(
      <MemoryRouter>
        <HealthCalc />
      </MemoryRouter>,
    )

    const a1cInput = screen.getByPlaceholderText(/A1c \(%\)/i)

    await fireEvent.change(a1cInput, { target: { value: '6' } })

    expect(screen.getByText(/Estimated Glucose:/i)).toBeInTheDocument()
    expect(screen.getByText(/mg\/dL/i)).toBeInTheDocument()
  })

  it('calculates and displays eGFR when inputs are provided', async () => {
    render(
      <MemoryRouter>
        <HealthCalc />
      </MemoryRouter>,
    )

    const creatinineInput = screen.getByPlaceholderText(/Serum Creatinine/i)
    const ageInput = screen.getByPlaceholderText(/Age/i)

    await fireEvent.change(creatinineInput, { target: { value: '1' } })
    await fireEvent.change(ageInput, { target: { value: '40' } })

    expect(screen.getByText(/eGFR:/i)).toBeInTheDocument()
  })
})
