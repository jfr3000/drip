import { expect } from 'chai'
import maybeSetNewCycleStart from '../lib/set-new-cycle-start'

describe('maybeSetNewCycleStart', () => {
  const deletedBleedingValue = null

  const excludedBleedingValue = {
    value: 2,
    exclude: true,
  }

  function getFixtures() {
    const cycleStartDay = {
      date: '2020-01-01',
      isCycleStart: true,
      bleeding: {
        value: 2,
        exclude: false,
      },
    }

    const mensesDaysAfter = [
      {
        date: '2020-01-04',
        isCycleStart: false,
        value: {
          bleeding: {
            value: 2,
            exclude: false,
          },
        },
      },
      {
        date: '2020-01-03',
        isCycleStart: false,
        value: {
          bleeding: {
            value: 2,
            exclude: false,
          },
        },
      },
      {
        date: '2020-01-02',
        isCycleStart: false,
        value: {
          bleeding: {
            value: 2,
            exclude: false,
          },
        },
      },
    ]

    const notCycleStartDay = {
      date: '2020-01-02',
      isCycleStart: false,
      bleeding: {
        value: 2,
        exclude: false,
      },
    }

    return [cycleStartDay, mensesDaysAfter, notCycleStartDay]
  }

  const checkIsMensesStart = (cycleDay) => {
    if (cycleDay.date === '2020-01-02') return true
  }

  it('sets new cycle start when first day of period deleted', () => {
    const [cycleStartDay, mensesDaysAfter] = getFixtures()

    maybeSetNewCycleStart({
      val: deletedBleedingValue,
      cycleDay: cycleStartDay,
      mensesDaysAfter,
      checkIsMensesStart,
    })
    expect(cycleStartDay.isCycleStart).to.be.false
    expect(cycleStartDay.bleeding).to.be.null
    expect(mensesDaysAfter[2].isCycleStart).to.be.true
  })

  it('sets new cycle start when first day of period excluded', () => {
    const [cycleStartDay, mensesDaysAfter] = getFixtures()

    maybeSetNewCycleStart({
      val: excludedBleedingValue,
      cycleDay: cycleStartDay,
      mensesDaysAfter,
      checkIsMensesStart,
    })

    expect(cycleStartDay.isCycleStart).to.be.false
    expect(cycleStartDay.bleeding).to.equal(excludedBleedingValue)
    expect(mensesDaysAfter[2].isCycleStart).to.be.true
  })

  it('does not set new cycle start when other day of period deleted', () => {
    const [cycleStartDay, mensesDaysAfter, notCycleStartDay] = getFixtures()

    maybeSetNewCycleStart({
      val: deletedBleedingValue,
      cycleDay: notCycleStartDay,
      mensesDaysAfter,
      checkIsMensesStart,
    })

    expect(cycleStartDay.isCycleStart).to.be.true
    expect(notCycleStartDay.isCycleStart).to.be.false
    expect(notCycleStartDay.bleeding).to.equal(deletedBleedingValue)
  })
  it('does not set new cycle start when other day of period excluded', () => {
    const excludedBleedingValue = {
      value: 2,
      exclude: true,
    }

    const [cycleStartDay, mensesDaysAfter, notCycleStartDay] = getFixtures()

    maybeSetNewCycleStart({
      val: excludedBleedingValue,
      cycleDay: notCycleStartDay,
      mensesDaysAfter,
      checkIsMensesStart,
    })

    expect(cycleStartDay.isCycleStart).to.be.true
    expect(notCycleStartDay.isCycleStart).to.be.false
    expect(notCycleStartDay.bleeding).to.equal(excludedBleedingValue)
  })
  it('works when there are no following bleeding days', () => {
    const [cycleStartDay] = getFixtures()

    maybeSetNewCycleStart({
      val: deletedBleedingValue,
      cycleDay: cycleStartDay,
      mensesDaysAfter: [],
      checkIsMensesStart,
    })

    expect(cycleStartDay.isCycleStart).to.be.false
    expect(cycleStartDay.bleeding).to.equal(deletedBleedingValue)
  })
})
