import { getOrdinalSuffix } from '../components/helpers/home'

describe('Home helper: getOrdinalSuffix', () => {
  test("For 1, it returns suffix 'st'", () => {
    expect(getOrdinalSuffix(1)).toEqual('st')
  })

  test("For 2, it returns suffix 'nd'", () => {
    expect(getOrdinalSuffix(2)).toEqual('nd')
  })

  test("For 3, it returns suffix 'rd'", () => {
    expect(getOrdinalSuffix(3)).toEqual('rd')
  })

  test("For 11, it returns suffix 'th'", () => {
    expect(getOrdinalSuffix(11)).toEqual('th')
  })

  test("For 23, it returns suffix 'rd'", () => {
    expect(getOrdinalSuffix(23)).toEqual('rd')
  })
})
