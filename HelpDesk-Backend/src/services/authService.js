const db = require('../database/db')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

exports.register = (email, password) => {
  return new Promise(async (resolve, reject) => {
    const hash = await bcrypt.hash(password, 10)

    db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hash],
      function (err) {
        if (err) reject(err)
        resolve({ id: this.lastID })
      }
    )
  })
}

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, user) => {
        if (err) return reject(err)
        if (!user) return reject(new Error('Usuário não encontrado'))

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return reject(new Error('Senha inválida'))

        const token = generateToken(user.id)
        resolve({ token })
      }
    )
  })
}