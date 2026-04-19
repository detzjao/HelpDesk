const db = require('../database/db')

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO tickets (title, description, status, user_id) VALUES (?, ?, ?, ?)',
      [data.title, data.description, 'aberto', data.userId],
      function (err) {
        if (err) reject(err)
        resolve({ id: this.lastID })
      }
    )
  })
}

exports.findAll = ({ status, limit, offset }) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM tickets WHERE 1=1'
    const params = []

    if (status) {
      query += ' AND status = ?'
      params.push(status)
    }

    query += ' LIMIT ? OFFSET ?'
    params.push(limit, offset)

    db.all(query, params, (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

exports.updateStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE tickets SET status = ? WHERE id = ?',
      [status, id],
      (err) => {
        if (err) reject(err)
        resolve()
      }
    )
  })
}

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tickets WHERE id = ?', [id], (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}