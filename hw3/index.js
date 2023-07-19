const fs = require('fs')
const express = require('express')
const engine = require('ejs-locals')

const app = express()

app.engine('ejs', engine)
app.set('views', './hw3')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const data = fs.readFileSync('./hw3/posts.json')
  const notes = JSON.parse(data)

  res.render('homepage', { notes })
})

app.listen(3000)