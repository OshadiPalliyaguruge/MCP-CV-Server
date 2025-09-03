import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";
import { queryResume } from './tools/resume';
import { sendEmail } from './tools/email';

async function main() {
  const server = new McpServer(
    { name: "cv-email-mcp", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  // Tool: resume.query
  server.registerTool(
    "resume.query",
    {
      title: "Query Resume",
      description: "Ask questions about the resume",
      inputSchema: {
        question: z.string()
      },
    },
    async (input) => {
      const answer = queryResume(input.question);
      return {
        content: [
          { type: "text", text: answer }
        ]
      };
    }
  );

  // Tool: email.send
  server.registerTool(
    "email.send",
    {
      title: "Send Email",
      description: "Send an email notification",
      inputSchema: {
        to: z.string(),
        subject: z.string(),
        body: z.string()
      },
    },
    async (input) => {
      const result = await sendEmail(input.to, input.subject, input.body);
      return {
        content: [
          { type: "text", text: result }
        ]
      };
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server running...");
}

main().catch(console.error);