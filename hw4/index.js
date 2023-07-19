const fs = require('fs')
const express = require('express')
const engine = require('ejs-locals')

const app = express()

app.engine('ejs', engine)
app.set('views', './hw4')
app.set('view engine', 'ejs')

app.use(express.static('./hw4/public'))

app.get('/', (req, res) => {
  const data = fs.readFileSync('./hw4/posts.json')
  const notes = JSON.parse(data)

  res.render('homepage', { notes })
})

app.listen(3000)