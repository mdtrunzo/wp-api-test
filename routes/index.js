'use strict'
require('dotenv').config()
const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('HOLAAAA')
})

router.get('/webhook', (req, res) => {
  try {
    console.log('GET: Someone is pinging me!')

    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']

    if (
      mode &&
      token &&
      mode === 'subscribe' &&
      process.env.VERIFY_TOKEN === token
    ) {
      return res.status(200).send(challenge)
    } else {
      return res.sendStatus(403)
    }
  } catch (error) {
    console.error({ error })
    return res.sendStatus(500)
  }
})

router.post('/webhook', async (req, res) => {
  try {
    console.log('POST: Someone is pinging me!')
    return res.sendStatus(200)
  } catch (error) {
    console.error({ error })
    return res.sendStatus(500)
  }
})
module.exports = router
