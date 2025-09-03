import fs from "fs";
import path from "path";

const resumePath = path.join(process.cwd(), "src", "resume.json");
const resume = JSON.parse(fs.readFileSync(resumePath, "utf-8"));

export function queryResume(question: string): string {
  question = question.toLowerCase();

  if (question.includes("last position") || question.includes("last role")) {
    return `Your last role was ${resume.last_position.title} at ${resume.last_position.company}.`;
  }

  if (question.includes("skills")) {
    return `Your skills include: ${resume.skills.join(", ")}.`;
  }

  if (question.includes("projects")) {
    const projectNames = resume.projects.map((p: any) => p.name);
    return `Your projects include: ${projectNames.join(", ")}.`;
  }

  return "Sorry, I don’t know the answer to that question.";
}
