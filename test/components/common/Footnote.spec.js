import React from 'react'
import { render } from '@testing-library/react-native'

import Footnote from '../../../components/common/Footnote'

describe('Footnote component', () => {
  test('when children are present, renders them', () => {
    const text = 'Some footnote text'
    const { toJSON } = render(<Footnote>{text}</Footnote>)

    expect(toJSON()).toMatchSnapshot()
  })

  test('when no children, renders nothing', () => {
    const { toJSON } = render(<Footnote></Footnote>)

    expect(toJSON()).toMatchSnapshot()
  })
})
