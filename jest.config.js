require('dotenv-safe/config')

const { execSync } = require('child_process')

process.env.DB_URL = `${process.env.DB_URL}_testdb2?schema=test_schema`

// Create SQL file for test database and migrate to postgres
console.log('Execute db:migrate')
execSync('yarn db:migrate')

console.log('Execute prisma generate')
execSync('yarn prisma generate')

module.exports = {}
