const readline = require('readline')
const updateVersion = require('./update-version')
const createTagForRelease = require('./tag-release')
const makeCommitRelease = require('./commit-release')

process.on('unhandledRejection', err => { throw(err) })

async function leadThroughRelease() {
  console.log("Yay, a release! Let's do this. First, let's update the version everywhere and create a new git tag.")

  await updateVersion()
  await createTagForRelease()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  await makeCommitRelease()

  console.log(`Groovy. We've created a commit for this release that includes the version, as well as a git tag for the release.
Please review it, make any necessary changes, and if it's all good, push the commit and the tag up to 'your-branch' by running:
git push origin 'your-branch'
git push origin ${require('../package.json').version}

Don't forget to also run 'npm run build-android-release' to package the apk and upload it to the app stores!
`)

  process.exit(0)
}

leadThroughRelease()
