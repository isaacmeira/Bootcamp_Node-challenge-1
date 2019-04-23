const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(
  express.urlencoded({
    extended: false
  })
)

app.set('view engine', 'njk')

const checkParam = (req, res, next) => {
  const { age } = req.query

  if (age === null || age === undefined) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/minor', checkParam, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.get('/major', checkParam, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age != age.match(/\d+/gm)) {
    return res.redirect('/')
  }
  

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
