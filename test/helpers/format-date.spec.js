import { humanizeDate } from '../../components/helpers/format-date'

describe('humanizeDate', () => {
  test('if receives null, returns empty string', () => {
    const result = humanizeDate(null)

    expect(result).toEqual('')
  })

  test('if receives undefined, returns empty string', () => {
    const result = humanizeDate(undefined)

    expect(result).toEqual('')
  })

  test('if receives incorrectly formatted date, returns empty string', () => {
    const result = humanizeDate('abc')

    expect(result).toEqual('')
  })

  test('if receives correct date string, returns date in humanized format', () => {
    const result = humanizeDate('2022-01-07')

    expect(result).toEqual('07. Jan 22')
  })
})
