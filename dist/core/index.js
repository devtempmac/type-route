
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./type-route.cjs.production.min.js')
} else {
  module.exports = require('./type-route.cjs.development.js')
}
