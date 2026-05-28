/**
 * Slide type definitions for the learn-claude-code presentation system
 */

export type SlideType =
  | "title"
  | "problem"
  | "solution"
  | "code"
  | "diagram"
  | "demo"
  | "summary"
  | "next";

export interface BaseSlide {
  id: string;
  type: SlideType;
  session: string; // s01, s02, etc.
  locale: "en" | "zh" | "ja";
  speakerNotes?: string[];
}

export interface TitleSlide extends BaseSlide {
  type: "title";
  title: string;
  subtitle: string;
  motto?: string;
  sessionNumber: number;
  totalSessions: number;
}

export interface ProblemSlide extends BaseSlide {
  type: "problem";
  title: string;
  problem: string;
  context?: string[];
}

export interface SolutionSlide extends BaseSlide {
  type: "solution";
  title: string;
  solution: string;
  principles?: string[];
}

export interface CodeSlide extends BaseSlide {
  type: "code";
  title: string;
  code: {
    filename: string;
    language: string;
    snippet: string;
    startLine?: number;
    endLine?: number;
    annotations?: CodeAnnotation[];
  };
}

export interface CodeAnnotation {
  line: number;
  text: string;
  type?: "highlight" | "explain" | "warn";
}

export interface DiagramSlide extends BaseSlide {
  type: "diagram";
  title: string;
  description?: string;
  flowId: string; // References execution-flows.ts
  activeElements?: {
    step: number;
    nodes: string[];
    edges: string[];
  }[];
}

export interface DemoSlide extends BaseSlide {
  type: "demo";
  title: string;
  description?: string;
  simulatorType: "agent-loop" | "subagent" | "skills" | "tasks" | "team";
  scenarioId: string;
}

export interface SummarySlide extends BaseSlide {
  type: "summary";
  title: string;
  takeaways: string[];
  nextSession?: string;
}

export interface NextSlide extends BaseSlide {
  type: "next";
  title: string;
  nextSessionTitle: string;
  nextSessionId: string;
  preview: string[];
}

export type Slide =
  | TitleSlide
  | ProblemSlide
  | SolutionSlide
  | CodeSlide
  | DiagramSlide
  | DemoSlide
  | SummarySlide
  | NextSlide;

export interface SlideDeck {
  session: string;
  locale: "en" | "zh" | "ja";
  slides: Slide[];
  metadata: {
    title: string;
    subtitle: string;
    duration: number; // in minutes
    difficulty: "beginner" | "intermediate" | "advanced";
    dependencies?: string[];
  };
}

export interface SlideNavigationState {
  currentIndex: number;
  isFullscreen: boolean;
  showControls: boolean;
}
