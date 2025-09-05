# MCP-CV-Server

This repository contains a **Next.js frontend** and **Express + TypeScript backend** for handling resume Q&A and sending emails using Gmail.

---

## Features

- Resume Q&A endpoint: `/resume`
- Email sending endpoint: `/email` (via Gmail SMTP)
- Single Docker container deployment

---

## Requirements

- Node.js >= 20
- npm >= 9
- Docker (for container deployment)
- Gmail account with **App Password** enabled

---

## Environment Variables

Create a `.env` file in the root directory:
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
PORT=4000

---

## Local Setup

1. Clone the repository:
git clone https://github.com/OshadiPalliyaguruge/MCP-CV-Server
cd mcp-cv-server

2. Install dependencies:
npm install
cd mcp-frontend
npm install
cd ..

3. Run locally:
npm run build
npm start

4. Open your browser:
[text](http://localhost:4000)

---

## Docker Deployment (Local)

1. Build Docker image:
docker build -t mcp-server .

2. Run Docker container:
docker run -p 4000:4000 --env-file .env mcp-server

3. Open your browser:
[text](http://localhost:4000)


---

## Render Deployment
mcp-cv-server-production-8f12.up.railway.app 


**Note:** Gmail SMTP will work **locally**, but may fail in cloud deployments due to blocked ports. If `/email` fails with timeout, this is expected behavior on Railway/Render.