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

  app.listen( process.env.PORT || PORT, ()=> {
    console.log(`Server is running on port = ${ process.env.PORT || PORT }`)
  })