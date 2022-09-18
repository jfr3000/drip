import * as React from 'react'
import { render, screen } from '@testing-library/react-native'
import Logo from '../components/header/logo'

describe('Logo', () => {
  test('It works', async () => {
    render(<Logo />)
    screen.getByText('drip.')
  })
})
