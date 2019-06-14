#!/usr/bin/env node

const makeCommitRelease = require('../commit-release');

(async () => {
  try {
    await makeCommitRelease()
  } catch(err) {
    console.error(err)
    process.exit(1)
  }
})()