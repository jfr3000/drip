// too see stdout / stderr from this process, run
// adb logcat | grep "NODEJS-MOBILE"
const rnBridge = require('rn-bridge')
const crypto = require('crypto')

rnBridge.channel.on('message', (msg) => {
  msg = JSON.parse(msg)
  if (msg.type === 'request-SHA512') {
    const hash = crypto.createHash('sha512')
    hash.update(msg.message)
    const result = hash.digest('hex')
    rnBridge.channel.send(JSON.stringify({
      type: 'sha512',
      message: result
    }))
  }
})