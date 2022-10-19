import React from 'react'
import AcceptLicense from '../components/AcceptLicense'

import { saveLicenseFlag } from '../local-storage'
import { render, screen, fireEvent } from './test-utils'

jest.mock('../local-storage', () => ({
  saveLicenseFlag: jest.fn(() => Promise.resolve()),
}))

describe('AcceptLicense', () => {
  test('should accept license when clicking ok button', async () => {
    const mockedSetLicense = jest.fn()
    render(<AcceptLicense setLicense={mockedSetLicense} />)

    const okButton = screen.getByText('OK')

    fireEvent(okButton, 'click')

    await expect(saveLicenseFlag).toHaveBeenCalled()
    expect(mockedSetLicense).toHaveBeenCalled()
  })

  test('should render cancel button', async () => {
    render(<AcceptLicense setLicense={jest.fn()} />)

    screen.getByText('Cancel')
  })
})
