const readline = require('readline')
const updateVersion = require('./update-version')
const createTagForRelease = require('./tag-release')
const updateChangelog = require('./update-changelog')
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
  const shouldUpdateChangelog = await new Promise(resolve => {
    rl.question('Would you like to update the changelog (y/n)?', yn => {
      yn === 'y' || yn === 'Y' ? resolve(true) : resolve(false)
    })
  })

  if (shouldUpdateChangelog) {
    await updateChangelog()
    await new Promise(resolve => {
      rl.question("Awesome. We've added all commits for this release to the changelog file. Please review, edit and summarize where necessary so it's useful for the app's users. Then come back here and press enter.", () => resolve())
    })
  }

  await makeCommitRelease()

  console.log(`Groovy. We've created a commit for this release that includes the version and changelog updates, as well as a git tag for the release.
Please review it, make any necessary changes, and if it's all good, push the commit and the tag up to master by running:
git push origin master
git push origin ${require('../package.json').version}

Don't forget to also run 'npm run build-android-release' to package the apk and upload it to the app stores!
`)

  process.exit(0)
}

leadThroughRelease()
