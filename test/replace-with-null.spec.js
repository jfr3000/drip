import replaceWithNullIfAllPropertiesAreNull from '../lib/import-export/replace-with-null'
import chai from 'chai'

const expect = chai.expect

describe('replaceWithNullIfAllPropertiesAreNull', () => {
  it('when data object has no null values, data object remains unchanged', () => {
    const initialData = {
      bleeding: { exclude: false, value: 2 },
      date: '2021-10-08',
    }
    const obj = { ...initialData }
    replaceWithNullIfAllPropertiesAreNull(obj)

    expect(obj).to.deep.equal(initialData)
  })

  it('when data object has nested object with all values null, nested object is replaced with null', () => {
    const initialData = {
      bleeding: { exclude: null, value: null },
      date: '2021-10-08',
    }
    const obj = { ...initialData }
    const expectedData = { bleeding: null, date: '2021-10-08' }
    replaceWithNullIfAllPropertiesAreNull(obj)

    expect(obj).to.deep.equal(expectedData)
  })

  it('when data object is empty, data object remains unchanged', () => {
    const obj = {}
    replaceWithNullIfAllPropertiesAreNull(obj)

    expect(obj).to.deep.equal({})
  })
})
