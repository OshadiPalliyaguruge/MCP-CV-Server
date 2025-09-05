"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [email, setEmail] = useState({ to: "", subject: "", body: "" });
  const [emailResult, setEmailResult] = useState("");

  async function askResume() {
    try {
      const res = await fetch("/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch {
      setAnswer("Error contacting backend");
    }
  }

  async function sendEmail() {
    try {
      const res = await fetch("/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });
      const data = await res.json();
      setEmailResult(data.result || data.error);
    } catch {
      setEmailResult("Error sending email");
    }
  }

  return (
    <main className="page">
      {/* Resume Q&A Section */}
      <section className="main">
        <h1>Resume Q&A</h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your resume..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={askResume}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Ask
          </button>
        </div>

        {answer && (
          <p className="text-base text-gray-700 text-center">
            <span className="font-semibold">Answer:</span> {answer}
          </p>
        )}
      </section>

      {/* Send Email Section */}
      <section className="main mt-12">  
        <h1>Send Email</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Recipient"
            value={email.to}
            onChange={(e) => setEmail({ ...email, to: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Subject"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            placeholder="Body"
            value={email.body}
            onChange={(e) => setEmail({ ...email, body: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
            rows={6}
          />
          <button
            onClick={sendEmail}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Send
          </button>
        </div>

        {emailResult && (
          <p className="text-base text-gray-700 text-center">{emailResult}</p>
        )}
      </section>
    </main>
  );
}
