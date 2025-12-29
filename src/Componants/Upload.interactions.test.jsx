import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Upload from './Upload'

describe('Upload (interactions)', () => {
  it('shows selected file name when choosing a file via browse input', () => {
    render(<Upload />)

    const file = new File(['dummy'], 'report.pdf', { type: 'application/pdf' })
    const input = screen.getByLabelText(/Browse/i)

    fireEvent.change(input, { target: { files: [file] } })

    expect(screen.getByText(/Selected File:/i)).toBeInTheDocument()
    expect(screen.getByText(/report\.pdf/i)).toBeInTheDocument()
  })

  it('accepts a file via drag and drop and displays its name', () => {
    render(<Upload />)

    const file = new File(['abc'], 'drop.png', { type: 'image/png' })

    const dropzone = screen.getByText(/Drag & drop your file here/i).closest('div')

    fireEvent.dragEnter(dropzone, {
      dataTransfer: { files: [file] },
    })

    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    })

    expect(screen.getByText(/drop\.png/i)).toBeInTheDocument()
  })
})
