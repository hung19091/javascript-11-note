const fs = require('fs')
const express = require('express')
const engine = require('ejs-locals')
const bodyParser = require('body-parser') // 引入 body-parser

const app = express()

app.engine('ejs', engine)
app.set('views', './hw6')
app.set('view engine', 'ejs')

app.use(express.static('./hw6/public'))
app.use(bodyParser.urlencoded({ extended: false })) // 解析 form 發送的請求

app.get('/', (req, res) => {
  const data = fs.readFileSync('./hw6/posts.json')
  const notes = JSON.parse(data)

  res.render('homepage', { notes })
})

app.get('/view', (req, res) => {
  const data = fs.readFileSync('./hw6/posts.json')
  const notes = JSON.parse(data)
  const index = req.query.index
  const note = notes[index]

  res.render('view', { note })
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/create', (req, res) => {
  const { title, content } = req.body
  const data = fs.readFileSync('./hw6/posts.json')
  const notes = JSON.parse(data)
  notes.push({
    title,
    content
  })
  fs.writeFileSync('./hw6/posts.json', JSON.stringify(notes))

  res.redirect('/')
})

app.listen(3000)