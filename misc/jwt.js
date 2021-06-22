const jwt = require('jsonwebtoken')

const secret = 'minhachaveprivada'
const payload = {
  //sub: userId,
  name: 'João Gross',
  iat: Math.floor(Date.now() / 1000) - 30, // Issued at
  exp: Math.floor(Date.now() / 1000) + 60, // Expires at
}

const token = jwt.sign(payload, secret)
console.log(token)

const result = jwt.verify(token, secret)
console.log(result)
