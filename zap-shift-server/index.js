const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const parcelsCollection = client
      .db("parcelDB")
      .collection("parcels");

    // ✅ Save Parcel
    app.post("/parcels", async (req, res) => {
      const parcel = req.body;
      const result = await parcelsCollection.insertOne(parcel);
      res.send(result);
    });

    // ✅ Get All Parcels
    app.get("/parcels", async (req, res) => {
      const result = await parcelsCollection.find().toArray();
      res.send(result);
    });

    // ✅ Get Parcel by Email (User Specific)
    app.get("/parcels/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const result = await parcelsCollection.find(query).toArray();
      res.send(result);
    });

    // ✅ Get Single Parcel
    app.get("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelsCollection.findOne(query);
      res.send(result);
    });

    // ✅ Update Parcel Status
    app.patch("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;

      const result = await parcelsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      res.send(result);
    });

    // ✅ Delete Parcel
    app.delete("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const result = await parcelsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    console.log("✅ Connected to MongoDB");
  } finally {
  }
}

run().catch(console.dir);

// Root Route
app.get("/", (req, res) => {
  res.send("🚚 Parcel Delivery Server Running...");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
