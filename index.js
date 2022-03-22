const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs');

var user = [
  {
    "id": 1,
    "name": "Sneha",
    "age": "20",
    "gender": "Female",
    "address": "5560 Rock Rd",
    "phone": "109-650-8849"
  },
  {
    "id": 2,
    "name": "Sam",
    "age": "28",
    "gender": "Male",
    "address": "5334 Hill Rd",
    "phone": "546-650-8849"
  },
  {
    "id": 3,
    "name": "Sona",
    "age": "17",
    "gender": "Female",
    "address": "2234 Dog Rd",
    "phone": "109-879-8849"
  }
]
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/emr', (req, res) => res.send(JSON.stringify(user)))
  .get('/emr/:id', (req, res) => {
    const id = req.params.id;
    res.send(JSON.stringify(user[id - 1]))
  })
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post('/emr', (req, res) => {


    new_record = {
      "id": user.length + 1,
      "name": req.body.name,
      "age": req.body.age,
      "gender": req.body.gender,
      "address": req.body.address,
      "phone": req.body.phone
    }


    if (new_record.name && new_record.age && new_record.gender && new_record.address && new_record.phone) {
      const fileData = JSON.parse(fs.readFileSync('/Users/sneha/Documents/SchoolWork2022_Sp/415/node-js-getting-started/user/emr.json'))
      fileData.push(new_record)
      fs.writeFileSync('/Users/sneha/Documents/SchoolWork2022_Sp/415/node-js-getting-started/user/emr.json', JSON.stringify(fileData, null, 2));
      user.push(new_record)
      console.log(new_record)
      res.sendStatus(200)
    } else
      res.sendStatus(400)
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}` + user))

