#!/usr/bin/env tsx

/**
 * Slide Generation Script
 *
 * This script automatically generates slide data from Python source files
 * and documentation. It extracts:
 * - Code snippets with annotations
 * - Documentation content (problem, solution)
 * - Session metadata
 *
 * Usage: npx tsx web/scripts/generate-slides.ts [session]
 * Example: npx tsx web/scripts/generate-slides.ts s01
 */

import fs from "fs";
import path from "path";
import { VERSION_META } from "../src/lib/constants";

interface PythonFunction {
  name: string;
  startLine: number;
  endLine: number;
  signature: string;
  docstring?: string;
}

interface ParsedPythonFile {
  filename: string;
  functions: PythonFunction[];
  classes: {
    name: string;
    startLine: number;
    endLine: number;
    methods: PythonFunction[];
  }[];
}

/**
 * Parse a Python file and extract functions and classes
 */
function parsePythonFile(filePath: string): ParsedPythonFile {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const functions: PythonFunction[] = [];
  const classes: ParsedPythonFile["classes"] = [];
  let currentClass: (typeof classes)[0] | null = null;

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // Detect function definitions
    const funcMatch = trimmed.match(/^def\s+(\w+)\s*\((.*)\)\s*:/);
    if (funcMatch && !currentClass) {
      const [, name, params] = funcMatch;
      functions.push({
        name,
        startLine: lineNum,
        endLine: findEndLine(lines, index),
        signature: `def ${name}(${params}):`,
        docstring: extractDocstring(lines, index),
      });
    } else if (funcMatch && currentClass) {
      const [, name, params] = funcMatch;
      currentClass.methods.push({
        name,
        startLine: lineNum,
        endLine: findEndLine(lines, index),
        signature: `def ${name}(${params}):`,
        docstring: extractDocstring(lines, index),
      });
    }

    // Detect class definitions
    const classMatch = trimmed.match(/^class\s+(\w+)\s*(?:\([^)]*\))?\s*:/);
    if (classMatch) {
      if (currentClass) {
        classes.push(currentClass);
      }
      currentClass = {
        name: classMatch[1],
        startLine: lineNum,
        endLine: findEndLine(lines, index),
        methods: [],
      };
    }
  });

  if (currentClass) {
    classes.push(currentClass);
  }

  return {
    filename: path.basename(filePath),
    functions,
    classes,
  };
}

function findEndLine(lines: string[], startIndex: number): number {
  let indentLevel = lines[startIndex].search(/\S/);

  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;

    const currentIndent = line.search(/\S/);
    if (currentIndent <= indentLevel) {
      return i;
    }
  }

  return lines.length;
}

function extractDocstring(lines: string[], startIndex: number): string | undefined {
  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('"""') || line.startsWith("'''")) {
      const quote = line.slice(0, 3);
      if (line.length > 3) {
        return line.slice(3, -3);
      }
      // Multiline docstring
      const docstringLines: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        const docLine = lines[j];
        if (docLine.trim().endsWith(quote)) {
          docstringLines.push(docLine.trim().slice(0, -3));
          break;
        }
        docstringLines.push(docLine);
      }
      return docstringLines.join("\n").trim();
    }
  }
  return undefined;
}

/**
 * Extract code snippet from a function
 */
function extractCodeSnippet(
  filePath: string,
  startLine: number,
  endLine: number
): string {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  return lines.slice(startLine - 1, endLine).join("\n");
}

/**
 * Generate slide data for a session
 */
function generateSlidesForSession(session: string) {
  const meta = VERSION_META[session];
  if (!meta) {
    console.error(`Session ${session} not found`);
    return null;
  }

  const sessionNum = parseInt(session.slice(1));
  const slides = [];

  // Title slide
  slides.push({
    id: `${session}-01`,
    type: "title",
    session,
    locale: "en",
    title: meta.title,
    subtitle: meta.subtitle,
    motto: meta.keyInsight,
    sessionNumber: sessionNum,
    totalSessions: 12,
  });

  // Problem slide (placeholder - would be extracted from docs)
  slides.push({
    id: `${session}-02`,
    type: "problem",
    session,
    locale: "en",
    title: `The Problem: ${meta.title}`,
    problem: `Problem statement for ${meta.title} would be extracted from documentation.`,
    context: [
      "Context point 1",
      "Context point 2",
      "Context point 3",
    ],
  });

  // Solution slide
  slides.push({
    id: `${session}-03`,
    type: "solution",
    session,
    locale: "en",
    title: `The Solution: ${meta.coreAddition}`,
    solution: `Solution explanation for ${meta.coreAddition}.`,
    principles: [
      meta.keyInsight,
      "Principle 2",
      "Principle 3",
    ],
  });

  // Code slides from Python implementation
  const pythonFilePath = path.join(process.cwd(), "agents", `${session}.py`);
  if (fs.existsSync(pythonFilePath)) {
    const parsed = parsePythonFile(pythonFilePath);

    // Add code slides for key functions
    const keyFunctions = parsed.functions.filter(
      (f) => f.name === "agent_loop" || f.name.startsWith("run_")
    );

    keyFunctions.forEach((func, index) => {
      slides.push({
        id: `${session}-0${4 + index}`,
        type: "code",
        session,
        locale: "en",
        title: `Implementation: ${func.name}`,
        code: {
          filename: parsed.filename,
          language: "python",
          startLine: func.startLine,
          endLine: func.endLine,
          snippet: extractCodeSnippet(pythonFilePath, func.startLine, func.endLine),
          annotations: [
            {
              line: func.startLine,
              text: func.docstring || `Function: ${func.name}`,
              type: "explain",
            },
          ],
        },
      });
    });
  }

  // Diagram slide
  slides.push({
    id: `${session}-07`,
    type: "diagram",
    session,
    locale: "en",
    title: "Execution Flow",
    description: `Flow diagram showing ${meta.title}.`,
    flowId: session,
  });

  // Demo slide
  slides.push({
    id: `${session}-08`,
    type: "demo",
    session,
    locale: "en",
    title: "See It In Action",
    description: `Interactive demo of ${meta.title}.`,
    simulatorType: "agent-loop",
    scenarioId: session,
  });

  // Summary slide
  slides.push({
    id: `${session}-09`,
    type: "summary",
    session,
    locale: "en",
    title: "Key Takeaways",
    takeaways: [
      meta.keyInsight,
      `Core addition: ${meta.coreAddition}`,
      "Takeaway 3",
      "Takeaway 4",
    ],
  });

  // Next session slide
  const nextSessionNum = sessionNum + 1;
  if (nextSessionNum <= 12) {
    const nextSession = `s${String(nextSessionNum).padStart(2, "0")}`;
    const nextMeta = VERSION_META[nextSession];

    slides.push({
      id: `${session}-10`,
      type: "next",
      session,
      locale: "en",
      title: "Coming Up Next",
      nextSessionTitle: nextMeta.title,
      nextSessionId: nextSession,
      preview: [
        nextMeta.coreAddition,
        "Preview point 2",
        "Preview point 3",
      ],
    });
  }

  return {
    session,
    locale: "en",
    slides,
    metadata: {
      title: meta.title,
      subtitle: meta.subtitle,
      duration: 15,
      difficulty: sessionNum <= 4 ? "beginner" : sessionNum <= 8 ? "intermediate" : "advanced",
      dependencies: meta.prevVersion ? [meta.prevVersion] : [],
    },
  };
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const session = args[0];

  if (!session) {
    console.error("Usage: npx tsx web/scripts/generate-slides.ts [session]");
    console.error("Example: npx tsx web/scripts/generate-slides.ts s01");
    process.exit(1);
  }

  const slideData = generateSlidesForSession(session);

  if (!slideData) {
    console.error(`Failed to generate slides for session ${session}`);
    process.exit(1);
  }

  // Write to file
  const outputPath = path.join(
    process.cwd(),
    "web/src/data/slides/auto-generated",
    `${session}.json`
  );

  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(slideData, null, 2));
  console.log(`Generated slides for ${session} -> ${outputPath}`);
}

main();
