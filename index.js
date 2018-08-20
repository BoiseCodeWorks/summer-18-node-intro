let express = require('express')
let bodyParser = require('body-parser')
let server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true
}))

//^^^^ ABOVE IS ALWAYS THE SAME


server.get('/', (req, res, next) => {
  res.send("<h1>Hello</h1>")
})

let cats = ['garfield', 'felix', 'frits', 'tony']

server.get('/cats', (req, res, next) => {
  res.send(cats)
})


server.get('/api/*', (req, res, next) => {
  if (req.host.includes('localhost')) {
    req.body.blarg = "some text"
    return next()
  }
  res.status(401).send('NO AUTH SORRY')
})


server.get('/api/cats/:id', (req, res, next) => {
  res.send(cats[req.params.id])
})

server.get('/api/dogs', (req, res, next) => {
  res.send(['fido'])
})


server.get('*', (req, res, next) => {
  res.status(404).send("NOPE 404 PAGE")
})

server.listen(3000, () => {
  console.log("The server is alive and running on port 3000")
})