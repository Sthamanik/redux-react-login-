const connectToMongo= require('./db');
const express = require('express')
const dotenv = require('dotenv')
var cors = require('cors')

dotenv.config();

connectToMongo();
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

// Available routes 
app.use('/api/auth', require('./routes/auth'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})