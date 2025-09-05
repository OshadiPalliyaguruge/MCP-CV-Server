import express from "express";
import next from "next";
import bodyParser from "body-parser";
import cors from "cors";
import { queryResume } from './tools/resume';
import { sendEmail } from './tools/email';
import dotenv from "dotenv";
dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const frontendDir = dev ? "./mcp-frontend" : "./mcp-frontend/.next";
const nextApp = next({ dev, dir: dev ? frontendDir : "./mcp-frontend" });           
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
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

  app.use((req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server ready on http://localhost:${PORT}`);
  });
});