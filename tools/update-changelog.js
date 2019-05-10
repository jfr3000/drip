#!/usr/bin/env node

const updateChangelog = require('basic-changelog')

const opts = {
  filterCommitsStartingWith: ['release:']
}

updateChangelog('./CHANGELOG.md', opts, err => {
  if (err) {
    console.error('Something went wrong trying to update the changelog:')
    console.error(err)
    return
  }
  console.log('Changelog successfully updated')
})