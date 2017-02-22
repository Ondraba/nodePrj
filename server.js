const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())

var db

MongoClient.connect('mongodb://Archie:Clovek789@ds157559.mlab.com:57559/nodecrudproject', (err, database) => {
    if (err) return console.log(err)
     db = database
     app.listen(3000, () => {
     console.log('listening on 3000')
   })
  })

//
// app.listen(3000, function() {
//      console.log('listening on 3000')
//    })


app.get('/', (req, res) => {
     db.collection('quotes').find().toArray((err, result) => {
       if (err) return console.log(err)
       // renders index.ejs
       res.render('index.ejs', {quotes: result})
     })
   })

app.post('/quotes', (req, res) => {
       db.collection('quotes').save(req.body, (err, result) => {
         if (err) return console.log(err)
         console.log('saved to database')
         res.redirect('/')
       })
     })

     app.post('/trigger', (req, res) => {
            db.collection('quotes').save(req.body, (err, result) => {
              if (err) return console.log(err)
              console.log('saved to database')
              res.redirect('/')
            })
          })

app.put('/quotes', (req, res) => {
       db.collection('quotes')
       .findOneAndUpdate({name: 'Yoda'}, { //key pair filter under collection
         $set: { //mongodb set, inc, push
           name: req.body.name,
           quote: req.body.quote
         }
       }, {
         sort: {_id: -1}, //optiona sort parameter
         upsert: true
       }, (err, result) => {
         if (err) return res.send(err)
         res.send(result) //call back send result to fetch request
       })
     })

     app.put('/triggerPut', (req, res) => {
            db.collection('quotes')
            .findOneAndUpdate({name: 'Glokta'}, { //key pair filter under collection
              $set: { //mongodb set, inc, push
                name: req.body.name
              }
            }, {
              sort: {_id: -1}, //optiona sort parameter
              upsert: true
            }, (err, result) => {
              if (err) return res.send(err)
              res.send(result) //call back send result to fetch request
            })
          })
  //
  //    query,
  // update,
  // options,
  // callback
// res.render(view, locals)





// nodemon restart server automaticly

  //npm run dev
  //body-parser - middlewere pro pristup k html propertam


  //mongodb://<dbuser>:<dbpassword>@ds157559.mlab.com:57559/nodecrudproject
  //mongo ds157559.mlab.com:57559/nodecrudproject -u <dbuser> -p <dbpassword>
  //Archie789 L..
