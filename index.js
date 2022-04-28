const express = require('express')
const bodyParser = require('body-parser')

const path = require('path') 
const { MongoClient } = require("mongodb");

const PORT = process.env.PORT || 5000
const uri = 'mongodb+srv://sneha:Instragram1!@cluster0.wawja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
console.log(uri)
const client = new MongoClient(uri, { useUnifiedTopology: true });
const database = client.db('EMR');
const emrs = database.collection('emrs');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')


  .get('/emr', async (req, res) => {
    try {
      await client.connect();
      const query = {};

      const cursor = emrs.find({})
      const result = await cursor.toArray();
      res.send(JSON.stringify(result));
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })


  .get('/emr/:id', async (req, res) => {
    try {
      await client.connect();
      const query = { "id": req.params.id };
      const result = await emrs.findOne(query);
      res.send(JSON.stringify(result));
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })


  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post('/emr', async (req, res) => {
    try {
      await client.connect();
      const cursor = emrs.find().sort({ _id: -1 }).limit(1)
      last_record = await cursor.toArray()
      new_id = (Number(last_record[0].id) + 1).toString(10)
      if (new_id.length === 6) {
        new_id = "0" + new_id
      }

      new_record = {
        "name": req.body.name,
        "address": req.body.address,
        "age": req.params.age,
        "gender": req.body.gender,
        "phone": req.body.phone,
        "medicications": req.medicications
      }

      if (new_record.name && new_record.address && new_record.age && new_record.gender && new_record.phone && new_record.medicications ) {
        await emrs.insertOne(new_record)
        res.sendStatus(200)

      } else
        res.sendStatus(400)

    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })
  .delete('/emr/:id', async (req, res) => {
    try {
      await client.connect();
      const query = { "id": req.params.id };
      const emr = await emrs.findOne(query);
      if (emr) {
        const result = await emrs.deleteOne(query);
        res.send(result.acknowledged);
      }
      res.send(false);
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })

  .put('/emr/:id', async (req, res) => {
    try {
      await client.connect();
      const query = { "id": req.params.id };

      //get the record
      const emr = await emrs.findOne(query);
      new_record = {
        "name": req.body.name,
        "address": req.body.address,
        "age": req.params.age,
        "gender": req.body.gender,
        "phone": req.body.phone,
        "medicications": req.medicications
      }

      if (new_record.name && new_record.address && new_record.age && new_record.gender && new_record.phone && new_record.medicications && emr) {
        await emrs.updateOne(query, { '$set': new_record }, { upsert: false })
        res.sendStatus(200)
      } else
        res.sendStatus(400)
    } catch (err) {
      console.log(err);
    }
    finally {
      await client.close();
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))