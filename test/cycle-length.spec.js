import chai from 'chai'
import { AssertionError } from 'assert'

import {getCycleLengthStats as cycleInfo} from '../lib/cycle-length'

const expect = chai.expect

describe('getCycleLengthStats', () => {
  it('works for a simple odd-numbered array', () => {
    const cycleLengths = [99, 5, 1, 2, 100]
    const result = cycleInfo(cycleLengths)
    const expectedResult = {
      minimum: 1,
      maximum: 100,
      mean: 41.4,
      median: 5,
      stdDeviation: 53.06
    }
    expect(result).to.eql(expectedResult)
  })

  it('works for a simple even-numbered array', () => {
    const cycleLengths = [4, 1, 15, 2, 20, 5]
    const result = cycleInfo(cycleLengths)
    const expectedResult = {
      minimum: 1,
      maximum: 20,
      mean: 7.83,
      median: 4.5,
      stdDeviation: 7.78
    }
    expect(result).to.eql(expectedResult)
  })
  it('works for an one-element array', () => {
    const cycleLengths = [42]
    const result = cycleInfo(cycleLengths)
    const expectedResult = {
      minimum: 42,
      maximum: 42,
      mean: 42,
      median: 42,
      stdDeviation: null
    }
    expect(result).to.eql(expectedResult)
  })
  describe('when args are wrong', () => {
    it('throws when arg object is an empty array', () => {
      const cycleLengths = []
      expect(() => cycleInfo(cycleLengths).to.throw(AssertionError))
    })
    it('throws when arg object is not in right format', () => {
      const wrongObject = { hello: 'world' }
      expect(() => cycleInfo(wrongObject).to.throw(AssertionError))
    })
    it('throws when arg array contains a string', () => {
      const wrongElement = [4, 1, 15, '2', 20, 5]
      expect(() => cycleInfo(wrongElement).to.throw(AssertionError))
    })
    it('throws when arg array contains a NaN', () => {
      const wrongElement = [4, 1, 15, NaN, 20, 5]
      expect(() => cycleInfo(wrongElement).to.throw(AssertionError))
    })
  })
})