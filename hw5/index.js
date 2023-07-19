const fs = require('fs')
const express = require('express')
const engine = require('ejs-locals')

const app = express()

app.engine('ejs', engine)
app.set('views', './hw5')
app.set('view engine', 'ejs')

app.use(express.static('./hw5/public'))

app.get('/', (req, res) => {
  const data = fs.readFileSync('./hw5/posts.json')
  const notes = JSON.parse(data)

  res.render('homepage', { notes })
})

app.get('/view', (req, res) => {
  const data = fs.readFileSync('./hw5/posts.json')
  const notes = JSON.parse(data)
  const index = req.query.index
  const note = notes[index]

  res.render('view', { note })
})

app.listen(3000)