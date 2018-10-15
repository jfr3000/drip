export default function (dbChanges) {
  return Object.values(dbChanges).every(changeArray => changeArray.length === 0)
}