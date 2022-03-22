const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs');

var user = []
const PORT = process.env.PORT || 5000
const fileData = JSON.parse(fs.readFileSync('/Users/sneha/Documents/SchoolWork2022_Sp/415/EMR-415/user/emr.json'))

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/emr', (req, res) => res.send(JSON.stringify(fileData)))
  .get('/emr/:id', (req, res) => {
    const id = req.params.id;
    res.send(JSON.stringify(fileData[id - 1]))
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
     fileData.push(new_record)
      fs.writeFileSync('/Users/sneha/Documents/SchoolWork2022_Sp/415/EMR-415/user/emr.json', JSON.stringify(fileData, null, 2));
      user.push(new_record)
      console.log(new_record)
      res.sendStatus(200)
    } else
      res.sendStatus(400)
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}` + user))

