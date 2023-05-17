const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Mongo DB COnnections

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.b8fg4md.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const appointmentsCollection = client
      .db("doctorsPortals")
      .collection("appointmentsOptions");

    app.get("/appointments", async (req, res) => {
      const query = {};
      const options = await appointmentsCollection.find(query).toArray();

      res.send(options);
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Doctors Portal Server Running");
});

app.listen(port, () =>
  console.log(`Doctors Portal Server Running on port ${port}`)
);
