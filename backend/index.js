//connection to  mongoDB
const connect_to_mongo = require('./db');
const express = require('express')
const authRouter  =require("./routes/auth")
// const notesRouter =require("./routes/notes")
connect_to_mongo();
const app = express()
const port = 5000

// Available Routes
// app.use('/api/auth', require("./routes/auth"))
// app.use('/api/notes', require("./routes/notes"))
app.use(express.json()); // when we use req.body then we have to use this middleware
app.use(authRouter)
// app.use(notesRouter) 


app.get('/', (req, res) => {
    res.send('Hello Ritesh!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })