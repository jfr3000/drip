// too see stdout / stderr from this process, run
// adb logcat | grep "NODEJS-MOBILE"
const rnBridge = require('rn-bridge')
const crypto = require('crypto')

rnBridge.channel.on('request-SHA512', (msg) => {
  msg = JSON.parse(msg)
  const hash = crypto.createHash('sha512')
  hash.update(msg.message)
  const result = hash.digest('hex')
  rnBridge.channel.post(msg.type, result)
})