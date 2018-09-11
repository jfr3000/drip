// too see stdout / stderr from this process, run
// adb logcat | grep "NODEJS-MOBILE"
const rnBridge = require('rn-bridge')
const bcryptjs = require('bcryptjs')

rnBridge.channel.on('message', (msg) => {
  msg = JSON.parse(msg)
  if (msg.type === 'request-password-hash') {
    const hash = bcryptjs.hashSync(msg.message, 10)
    rnBridge.channel.send(JSON.stringify({
      type: 'hash',
      message: hash
    }))
  } else if (msg.type === 'request-SHA512') {
    // do the thing
  } else if (msg.type === 'check-password') {
    rnBridge.channel.send(JSON.stringify({
      type: 'password-check-result',
      message: bcryptjs.compareSync(msg.message.password, msg.message.hash)
    }))
  }
})