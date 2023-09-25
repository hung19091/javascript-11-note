const express = require('express')
const engine = require('ejs-locals')

const app = express()

app.engine('ejs', engine)
app.set('views', './hw2')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('homepage')
})

app.listen(3000)
