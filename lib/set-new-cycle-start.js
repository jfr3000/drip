export default function ({
  val, cycleDay, mensesDaysAfter, checkIsMensesStart
}) {
  // if a bleeding value is deleted or excluded, we need to check if
  // there are any following bleeding days and if the
  // next one of them is now a cycle start
  if (bleedingValueDeletedOrExluded(val)) {
    cycleDay.bleeding = val
    cycleDay.isCycleStart = false
    if (!mensesDaysAfter.length) return
    const nextOne = mensesDaysAfter[mensesDaysAfter.length - 1]
    if (checkIsMensesStart(nextOne)) {
      nextOne.isCycleStart = true
    }
  } else if (bleedingValueAddedOrChanged(val)) {
    cycleDay.bleeding = val
    cycleDay.isCycleStart = checkIsMensesStart(cycleDay)
    maybeClearOldCycleStarts(cycleDay)
  }

  function bleedingValueDeletedOrExluded(val) {
    const bleedingDeleted = !val
    const bleedingExcluded = val && val.exclude
    return bleedingDeleted || bleedingExcluded
  }

  function bleedingValueAddedOrChanged(symptom, val) {
    return symptom === 'bleeding' && val
  }

  function maybeClearOldCycleStarts() {
  // if we have a new bleeding day, we need to clear the
  // menses start marker from all following days of this
  // menses that may have been marked as start before
    mensesDaysAfter.forEach(day => day.isCycleStart = false)
  }
}