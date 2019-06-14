#!/usr/bin/env node

const updateVersion = require('../update-version');

(async () => {
  try {
    await updateVersion()
  } catch(err) {
    console.error(err)
    process.exit(1)
  }
})()