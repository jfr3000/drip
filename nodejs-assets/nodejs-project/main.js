const rnBridge = require('rn-bridge')
try {
  const bcryptjs = require('bcryptjs')

  rnBridge.channel.on('message', (msg) => {
    msg = JSON.parse(msg)
    if (msg.type === 'request-hash') {
      const hash = bcryptjs.hashSync(msg.message, 10)
      rnBridge.channel.send(JSON.stringify({
        type: 'hash',
        message: hash
      }))
    }
  })
} catch (err) {
  rnBridge.channel.send(JSON.stringify(err.message))
}