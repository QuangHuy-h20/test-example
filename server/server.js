const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Ticket Model
const Ticket = mongoose.model(
  "Ticket",
  new mongoose.Schema({
    title: { type: String, required: true },
  })
);

// API Routes
app.get("/api/tickets", async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

app.post("/api/tickets", async (req, res) => {
  const newTicket = new Ticket(req.body);
  await newTicket.save();
  res.status(201).json(newTicket);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
