const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jidhin:jidhin@123@cluster.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db("test");
  console.log("Connected to MongoDB");
});
app.put('/edit/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const db = client.db("test");
  const collection = db.collection("documents");
  collection.updateOne({ _id: new ObjectID(id) }, { $set: data }, (err, result) => {
    if (err) return res.send(500, err);
    res.send("Data updated");
  });
});
app.get('/view/:id', (req, res) => {
  const id = req.params.id;
  const db = client.db("test");
  const collection = db.collection("documents");
  collection.find({ _id: new ObjectID(id) }).toArray((err, result) => {
    if (err) return res.send(500, err);
    res.send(result[0]);
  });
});
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const db = client.db("test");
  const collection = db.collection("documents");
  collection.deleteOne({ _id: new ObjectID(id) }, (err, result) => {
    if (err) return res.send(500, err);
    res.send("Data deleted");
  });
});