import chai from 'chai'
import dirtyChai from 'dirty-chai'
import maybeSetNewCycleStart from '../lib/set-new-cycle-start'

const expect = chai.expect
chai.use(dirtyChai)

describe('maybeSetNewCycleStart', () => {
  function getFixtures() {
    const cycleDay = {
      date: '2020-01-01',
      isCycleStart: true,
      bleeding: {
        value: 2,
        exclude: false
      }
    }

    const mensesDaysAfter = [
      {
        date: '2020-01-04',
        isCycleStart: false,
        value: {
          bleeding: {
            value: 2,
            exclude: false
          }
        }
      },
      {
        date: '2020-01-03',
        isCycleStart: false,
        value: {
          bleeding: {
            value: 2,
            exclude: false
          }
        }
      },
      {
        date: '2020-01-02',
        isCycleStart: false,
        value: {
          bleeding: {
            value: 2,
            exclude: false
          }
        }
      }
    ]
    return [cycleDay, mensesDaysAfter]
  }

  const checkIsMensesStart = cycleDay => {
    if (cycleDay.date === '2020-01-02') return true
  }

  it('sets new cycle start when first day of period deleted', () => {
    const deletedBleedingValue = null

    const [dayWithDeletedBleeding, mensesDaysAfter] = getFixtures()

    maybeSetNewCycleStart({
      val: deletedBleedingValue,
      cycleDay: dayWithDeletedBleeding,
      mensesDaysAfter,
      checkIsMensesStart
    })
    expect(dayWithDeletedBleeding.isCycleStart).to.be.false()
    expect(dayWithDeletedBleeding.bleeding).to.be.null()
    expect(mensesDaysAfter[2].isCycleStart).to.be.true()
  })
  it('sets new cycle start when first day of period excluded', () => {})
  it('does not set new cycle start when other day of period deleted', () => {})
  it('does not set new cycle start when other day of period excluded', () => {})
  it('works when there are no followiing bleeding days', () => {})
  it('works when the following bleeding days are already the start of a new cycle', () => {})
})