#!/usr/bin/env node

const updateChangelog = require('../update-changelog');

(async () => {
  try {
    await updateChangelog()
  } catch(err) {
    console.error(err)
    process.exit(1)
  }
})()