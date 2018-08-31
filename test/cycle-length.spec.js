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
  }),

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
  }),

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
  }),

  describe('works for more realistic examples', () => {
    it('1 day difference between shortest and longest period', () => {
      const cycleLengths = [28, 29, 28, 28, 28, 29, 28, 28, 28, 29, 29, 28]
      const result = cycleInfo(cycleLengths)
      const expectedResult = {
        minimum: 28,
        maximum: 29,
        mean: 28.33,
        median: 28,
        stdDeviation: 0.49
      }
      expect(result).to.eql(expectedResult)
    }),
    it('3 days difference between shortest and longest period', () => {
      const cycleLengths = [28, 29, 28, 28, 27, 30, 28, 27, 28, 28, 29, 27]
      const result = cycleInfo(cycleLengths)
      const expectedResult = {
        minimum: 27,
        maximum: 30,
        mean: 28.08,
        median: 28,
        stdDeviation: 0.90
      }
      expect(result).to.eql(expectedResult)
    }),
    it('8 days difference between shortest and longest period', () => {
      const cycleLengths = [28, 32, 29, 27, 28, 26, 33, 28, 29, 34, 27, 29]
      const result = cycleInfo(cycleLengths)
      const expectedResult = {
        minimum: 26,
        maximum: 34,
        mean: 29.17,
        median: 28.5,
        stdDeviation: 2.52
      }
      expect(result).to.eql(expectedResult)
    })
  })

  describe('when args are wrong', () => {
    it('throws when arg object is an empty array', () => {
      const cycleLengths = []
      expect(() => cycleInfo(cycleLengths).to.throw(AssertionError))
    }),
    it('throws when arg object is not in right format', () => {
      const wrongObject = { hello: 'world' }
      expect(() => cycleInfo(wrongObject).to.throw(AssertionError))
    }),
    it('throws when arg array contains a string', () => {
      const wrongElement = [4, 1, 15, '2', 20, 5]
      expect(() => cycleInfo(wrongElement).to.throw(AssertionError))
    }),
    it('throws when arg array contains a NaN', () => {
      const wrongElement = [4, 1, 15, NaN, 20, 5]
      expect(() => cycleInfo(wrongElement).to.throw(AssertionError))
    })
  })
})