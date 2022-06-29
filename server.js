const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


let db,
  dbconnectionString = process.env.DB_STRING,
  dbName = 'breaking-bad-quotes', //update this in future projects 
  collection

MongoClient.connect(dbconnectionString)
  .then(client => {
    console.log('Connected to DB YO!')
    db = client.db(dbName)
    collection = db.collection('quotes')  //this is a unique collection name to the breaking-bad DB (ie update this to match future projects)
  })

//Middleware
app.set('view engine', 'ejs') //This is for dynamically populating html (don't have to use)
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {  //not sure why Mayan is using an async now here
  try {
    res.render('index.ejs')
  }
  catch(error) {
    res.status(500).send({message: error.message})
  }
})

app.listen( process.env.PORT || PORT, ()=> {
    console.log(`Server is running on port = ${ process.env.PORT || PORT }`)
})