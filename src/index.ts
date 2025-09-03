import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { queryResume } from './tools/resume';
import { sendEmail } from './tools/email';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

// Resume query endpoint
app.post("/resume", (req, res) => {
  const { question } = req.body;
  const answer = queryResume(question);
  res.json({ answer });
});

// Email sending endpoint
app.post("/email", async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    const result = await sendEmail(to, subject, body);
    res.json({ result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("MCP server is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`MCP server running on http://localhost:${PORT}`);
});