import { sendEmail } from "./tools/email";
import 'dotenv/config';


(async () => {
  const result = await sendEmail(
    "someone@example.com",
    "Test Subject",
    "Hello from MCP server!"
  );
  console.log(result);
})();
