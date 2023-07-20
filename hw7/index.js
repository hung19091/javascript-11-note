const fs = require('fs')
const express = require('express')
const engine = require('ejs-locals')
const bodyParser = require('body-parser') // 引入 body-parser

const app = express()

app.engine('ejs', engine)
app.set('views', './hw7')
app.set('view engine', 'ejs')

app.use(express.static('./hw7/public'))
app.use(bodyParser.urlencoded({ extended: false })) // 解析 form 發送的請求

app.get('/', (req, res) => {
  const data = fs.readFileSync('./hw7/posts.json')
  const notes = JSON.parse(data)

  res.render('homepage', {notes})
})

app.get('/view', (req, res) => {
  const data = fs.readFileSync('./hw7/posts.json')
  const notes = JSON.parse(data)
  const index = req.query.index
  const note = notes[index]
  if (!note) {
    res.redirect('/not-found')
  } else {
    res.render('view', {note, index})
  }

})

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/create', (req, res) => {
  const { title, content } = req.body
  const data = fs.readFileSync('./hw7/posts.json')
  const notes = JSON.parse(data)
  notes.push({
    title,
    content
  })
  fs.writeFileSync('./hw7/posts.json', JSON.stringify(notes))
  
  res.redirect('/')
})

app.post('/delete', (req, res) => {
  const data = fs.readFileSync('./hw7/posts.json')
  const notes = JSON.parse(data)
  const index = req.query.index
  notes.splice(index, 1);
  fs.writeFileSync('./hw7/posts.json', JSON.stringify(notes))

  res.redirect('/')
})

app.get('/edit', (req, res) => {
  const data = fs.readFileSync('./hw7/posts.json')
  const notes = JSON.parse(data)
  const index = req.query.index
  const note = notes[index]
  if (!note) {
    res.redirect('/not-found')
  } else {
    res.render('edit', {note, index})
  }

})

app.post('/editing', (req, res) => {
  const { title, content } = req.body
  const data = fs.readFileSync('./hw7/posts.json')
  const notes = JSON.parse(data)
  const index = req.query.index
  notes.splice(index, 1, {
    title: title,
    content: content
  })
  fs.writeFileSync('./hw7/posts.json', JSON.stringify(notes))

  res.redirect('/')
})

app.get('/not-found', (req, res) => {
  res.render('notFound')
})

app.listen(3000)