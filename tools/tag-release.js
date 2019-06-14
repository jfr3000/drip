const { exec } = require('child_process')

module.exports = () => {
  return new Promise((resolve, reject) => {
    const version = require('../package.json').version
    exec(`git tag v${version}`, err => {
      if (err) {
        console.error(`There was a problem creating the new tag. Typically, this happens when it already exists, in which case you can delete it with
git tag -d <name of tag>
or you might not have made the file executable yet, which you can do by running
chmod +x ./tools/tag-release`)
        reject(err.message)
      } else {
        resolve()
      }
    })
  })
}