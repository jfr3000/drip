// when data changes, realm gives us an object with updates
// https://realm.io/docs/javascript/latest/#collection-notifications
// but it sometimes gets fired even though there are no changes
// - we want to check for that and see if all arrays are empty
export default function (dbChanges) {
  return Object.values(dbChanges).every(changeArray => changeArray.length === 0)
}