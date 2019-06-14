const updateChangelog = require('basic-changelog')

const opts = {
  filterCommitsStartingWith: ['release:']
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    updateChangelog('./CHANGELOG.md', opts, err => {
      if (err) {
        console.error('Something went wrong trying to update the changelog:')
        reject(err)
        return
      }
      console.log('Changelog successfully updated')
      resolve()
    })
  })
}