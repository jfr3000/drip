import chai from 'chai'
import periodInfo from '../lib/period-length'

const expect = chai.expect

describe('it calculates the median correctly', () => {
  it('works for an odd-numbered array', () => {
    const periodLengths = [1, 2, 5, 99, 100]
    const result = periodInfo(periodLengths).median
    expect(result).to.eql(5)
  })

  /* it('works for an even-numbered array', () => {

  }) */
})