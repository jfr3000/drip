#!/usr/bin/env node

const tagRelease = require('../tag-release');

(async () => {
  try {
    await tagRelease()
  } catch(err) {
    console.error(err)
    process.exit(1)
  }
})()