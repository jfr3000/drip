import { expect } from 'chai'

import {getOrdinalSuffix } from '../components/helpers/home'

describe('Home helper: getOrdinalSuffix', () => {
  it('For 1, it returns suffix \'st\'', () => {
    expect(getOrdinalSuffix(1)).to.eql('st')
  })

  it('For 2, it returns suffix \'nd\'', () => {
    expect(getOrdinalSuffix(2)).to.eql('nd')
  })

  it('For 3, it returns suffix \'rd\'', () => {
    expect(getOrdinalSuffix(3)).to.eql('rd')
  })

  it('For 11, it returns suffix \'th\'', () => {
    expect(getOrdinalSuffix(11)).to.eql('th')
  })

  it('For 23, it returns suffix \'rd\'', () => {
    expect(getOrdinalSuffix(23)).to.eql('rd')
  })
})
