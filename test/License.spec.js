import React from 'react'
import License from '../components/settings/License'
import { render, screen } from './test-utils'

describe('License screen', () => {
  test('should display license text with correct year', async () => {
    render(<License />)
    const year = new Date().getFullYear().toString()

    screen.getByText(year, { exact: false })
  })

  test('should match the snapshot', async () => {
    const licenseScreen = render(<License />)

    expect(licenseScreen).toMatchSnapshot()
  })
})
