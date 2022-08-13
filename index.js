const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bwe3hjc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const billCollection = client.db("Bills").collection("Bill");

async function run() {
  try {
    await client.connect();

    app.get("/bill", async (req, res) => {
      const result = await billCollection.find({}).toArray();
      res.send(result);
    });
    app.post("/userLoan", async (req, res) => {
      const loanData = req.body;
      const result = await billCollection.insertOne(loanData);
      res.send(result);
    });
  } finally {
    //
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("loanSystem connect db");
});

app.listen(port, () => {
  console.log("listen db to", port);
});
