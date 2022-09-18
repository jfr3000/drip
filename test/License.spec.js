import React from 'react'
import { render, screen } from '@testing-library/react-native'
import License from '../components/settings/License'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str, options) => {
      return str + (options ? JSON.stringify(options) : '')
    },
  }),
}))

describe('License screen', () => {
  test('It should have a correct year', async () => {
    render(<License setLicense={() => {}} />)
    const year = new Date().getFullYear().toString()
    screen.getByText(year, { exact: false })
  })
})
