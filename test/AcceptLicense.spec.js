import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import AcceptLicense from '../components/AcceptLicense'

import { saveLicenseFlag } from '../local-storage'

jest.mock('../local-storage', () => ({
  saveLicenseFlag: jest.fn(() => Promise.resolve()),
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str, options) => {
      return str + (options ? JSON.stringify(options) : '')
    },
  }),
}))

describe('AcceptLicense', () => {
  test('On clicking OK button, the license is accepted', async () => {
    const mockedSetLicense = jest.fn()
    render(<AcceptLicense setLicense={mockedSetLicense} />)

    const okButton = screen.getByText('ok', { exact: false })

    fireEvent(okButton, 'click')

    await expect(saveLicenseFlag).toHaveBeenCalled()
    expect(mockedSetLicense).toHaveBeenCalled()
  })

  test('There is a Cancel button', async () => {
    render(<AcceptLicense setLicense={jest.fn()} />)

    screen.getByText('cancel', { exact: false })
  })
})
