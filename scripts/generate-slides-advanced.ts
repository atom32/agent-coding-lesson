#!/usr/bin/env tsx

/**
 * Advanced Slide Generation Script
 *
 * This script generates comprehensive slide data by:
 * - Reading Python source files for code snippets
 * - Extracting documentation content for problem/solution
 * - Creating session-specific slide content
 *
 * Usage: npx tsx web/scripts/generate-slides-advanced.ts [session]
 * Example: npx tsx web/scripts/generate-slides-advanced.ts s01
 */

import fs from "fs";
import path from "path";
import { VERSION_META, VERSION_ORDER } from "../src/lib/constants";

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

interface DocContent {
  problem?: string;
  solution?: string;
  context?: string[];
}

/**
 * Find the correct Python file for a session
 */
function findPythonFile(session: string): string | null {
  const agentsDir = path.join(process.cwd(), "agents");
  const files = fs.readdirSync(agentsDir);

  // Match s01, s02, etc. with various suffixes
  const pattern = new RegExp(`^${session}_.*\\.py$`);
  const matchingFile = files.find(file => pattern.test(file));

  return matchingFile ? path.join(agentsDir, matchingFile) : null;
}

/**
 * Find the documentation file for a session
 */
function findDocFile(session: string): string | null {
  const docsDir = path.join(process.cwd(), "docs", "en");
  const files = fs.readdirSync(docsDir);

  // Match s01-*, s02-*, etc.
  const pattern = new RegExp(`^${session}-.*\\.md$`);
  const matchingFile = files.find(file => pattern.test(file));

  return matchingFile ? path.join(docsDir, matchingFile) : null;
}

/**
 * Parse documentation file to extract problem and solution
 */
function parseDocumentation(docPath: string): DocContent {
  const content = fs.readFileSync(docPath, "utf-8");
  const lines = content.split("\n");

  let problem: string | undefined;
  let solution: string | undefined;
  let context: string[] = [];
  let currentSection = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    // Check for headers
    if (line.startsWith("## ")) {
      const header = line.slice(2).trim().toLowerCase();

      // Save previous section
      if (currentSection === "problem" && currentContent.length > 0) {
        problem = currentContent.join("\n").trim();
      } else if (currentSection === "solution" && currentContent.length > 0) {
        solution = currentContent.join("\n").trim();
      }

      // Start new section
      currentSection = header;
      currentContent = [];
    } else if (line.startsWith("# ")) {
      // Reset for new major section
      currentSection = "";
      currentContent = [];
    } else if (currentSection && !line.startsWith("---")) {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection === "problem" && currentContent.length > 0) {
    problem = currentContent.join("\n").trim();
  } else if (currentSection === "solution" && currentContent.length > 0) {
    solution = currentContent.join("\n").trim();
  }

  return { problem, solution, context };
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

  // Find Python and documentation files
  const pythonFilePath = findPythonFile(session);
  const docFilePath = findDocFile(session);

  // Parse documentation
  let docContent: DocContent = {};
  if (docFilePath) {
    docContent = parseDocumentation(docFilePath);
  }

  // Parse Python file
  let parsedPython: ParsedPythonFile | null = null;
  if (pythonFilePath) {
    parsedPython = parsePythonFile(pythonFilePath);
  }

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

  // Problem slide
  slides.push({
    id: `${session}-02`,
    type: "problem",
    session,
    locale: "en",
    title: `The Problem: ${meta.title}`,
    problem: docContent.problem || `Understanding the challenge: ${meta.title}`,
    context: docContent.context || [
      "What problem does this session address?",
      "Why is this important for agent development?",
      "What are the limitations of previous approaches?",
    ],
  });

  // Solution slide
  slides.push({
    id: `${session}-03`,
    type: "solution",
    session,
    locale: "en",
    title: `The Solution: ${meta.coreAddition}`,
    solution: docContent.solution || `The ${meta.coreAddition} approach to solving this problem.`,
    principles: [
      meta.keyInsight,
      "Key design principle",
      "Implementation best practice",
    ],
  });

  // Code slides from Python implementation
  if (parsedPython && parsedPython.functions.length > 0) {
    const keyFunctions = parsedPython.functions.filter(
      (f) => f.name.includes("agent_loop") ||
             f.name.includes("run_") ||
             f.name === "main" ||
             f.name.startsWith("execute")
    );

    // Add up to 3 key functions as code slides
    const functionsToShow = keyFunctions.slice(0, 3);
    functionsToShow.forEach((func, index) => {
      slides.push({
        id: `${session}-0${4 + index}`,
        type: "code",
        session,
        locale: "en",
        title: `Implementation: ${func.name}`,
        code: {
          filename: parsedPython!.filename,
          language: "python",
          startLine: func.startLine,
          endLine: Math.min(func.endLine, func.startLine + 20), // Limit to 20 lines
          snippet: extractCodeSnippet(pythonFilePath!, func.startLine, Math.min(func.endLine, func.startLine + 20)),
          annotations: [
            {
              line: func.startLine,
              text: func.docstring || `${func.name}: ${meta.coreAddition}`,
              type: "explain",
            },
          ],
        },
      });
    });
  }

  // Calculate next slide ID
  const nextSlideId = slides.length + 1;

  // Diagram slide
  slides.push({
    id: `${session}-0${nextSlideId < 10 ? "0" + nextSlideId : nextSlideId}`,
    type: "diagram",
    session,
    locale: "en",
    title: "Execution Flow",
    description: `Flow diagram showing ${meta.title}.`,
    flowId: session,
  });

  // Demo slide
  slides.push({
    id: `${session}-0${nextSlideId + 1 < 10 ? "0" + (nextSlideId + 1) : nextSlideId + 1}`,
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
    id: `${session}-0${nextSlideId + 2 < 10 ? "0" + (nextSlideId + 2) : nextSlideId + 2}`,
    type: "summary",
    session,
    locale: "en",
    title: "Key Takeaways",
    takeaways: [
      meta.keyInsight,
      `Core addition: ${meta.coreAddition}`,
      "Practical implementation considerations",
      "Next steps for advanced usage",
    ],
  });

  // Next session slide
  const nextSessionNum = sessionNum + 1;
  if (nextSessionNum <= 12) {
    const nextSession = `s${String(nextSessionNum).padStart(2, "0")}`;
    const nextMeta = VERSION_META[nextSession];

    slides.push({
      id: `${session}-0${nextSlideId + 3 < 10 ? "0" + (nextSlideId + 3) : nextSlideId + 3}`,
      type: "next",
      session,
      locale: "en",
      title: "Coming Up Next",
      nextSessionTitle: nextMeta.title,
      nextSessionId: nextSession,
      preview: [
        nextMeta.coreAddition,
        nextMeta.keyInsight,
        `Building on ${meta.title}`,
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
    console.error("Usage: npx tsx web/scripts/generate-slides-advanced.ts [session]");
    console.error("Example: npx tsx web/scripts/generate-slides-advanced.ts s01");
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
