const express = require('express')
const app = express()
const port = 3333

const DBConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')

const connection = mysql.createConnection(DBConfig)

const insertUser = `INSERT INTO peoples(name) values('Rodolfo')`
const selectUser = `SELECT id, name FROM peoples`


connection.query(insertUser)


app.get('/', (req, res) => {

  connection.query(selectUser, (err, result) => {
    if (err) throw err

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <h2>Total de registros <strong>${result.length}</strong></h2>
      <p>
      ${result.map(user => `
        <span>${user.name}</span>
      `)}
      </p>
    `)

  })
})


app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})