import type { AdvancedChapterId } from "@/data/course-map";

const PROMPT_REPO_URL =
  "https://github.com/Piebald-AI/claude-code-system-prompts/blob/main/system-prompts";

export interface PromptReference {
  filename: string;
  title: string;
  role: string;
  reason: string;
}

export interface PromptReferenceGroup {
  chapter: AdvancedChapterId;
  angle: string;
  note: string;
  prompts: PromptReference[];
}

function prompt(
  filename: string,
  title: string,
  role: string,
  reason: string
): PromptReference {
  return { filename, title, role, reason };
}

export const PROMPT_REFERENCE_SOURCE = {
  name: "Piebald AI claude-code-system-prompts",
  repo: "https://github.com/Piebald-AI/claude-code-system-prompts",
  localPath: "D:\\claude-code-system-prompts\\system-prompts",
  caveat:
    "Third-party extracted reference from the Claude Code npm package, useful for study but not official Anthropic documentation.",
};

export const PROMPT_REFERENCES: Record<AdvancedChapterId, PromptReferenceGroup> = {
  "00": {
    chapter: "00",
    angle: "Prompt anatomy overview",
    note:
      "Use these to show that the agent is assembled from many prompt fragments, not one magic system prompt.",
    prompts: [
      prompt(
        "system-prompt-harness-instructions.md",
        "Harness instructions",
        "Core identity",
        "Shows the compact contract between markdown output, permissions, reminders, compaction, and tool use."
      ),
      prompt(
        "system-prompt-doing-tasks-software-engineering-focus.md",
        "Software engineering focus",
        "Task framing",
        "Explains how generic user requests are interpreted as repository work inside the harness."
      ),
      prompt(
        "system-prompt-communication-style.md",
        "Communication style",
        "User-facing layer",
        "Useful for discussing progress updates as a product surface, not just model personality."
      ),
      prompt(
        "tool-description-agent-usage-notes.md",
        "Agent tool usage notes",
        "Subagent contract",
        "Introduces the worker-return boundary and the trust-but-verify rule."
      ),
    ],
  },
  "01": {
    chapter: "01",
    angle: "Loop contract and service pressure",
    note:
      "Pair QueryEngine with prompt fragments that define the agent's outer contract and streaming/tool-use API expectations.",
    prompts: [
      prompt(
        "system-prompt-harness-instructions.md",
        "Harness instructions",
        "Loop contract",
        "Names the responsibilities wrapped around every model turn: tool use, permission mode, reminders, and compaction."
      ),
      prompt(
        "data-tool-use-concepts.md",
        "Tool use concepts",
        "API grounding",
        "Connects the toy loop to the formal model/tool interaction shape."
      ),
      prompt(
        "data-streaming-reference-typescript.md",
        "Streaming reference",
        "Stream handling",
        "Gives a service-layer complement to QueryEngine's streaming and event handling."
      ),
      prompt(
        "system-prompt-tool-execution-denied.md",
        "Tool execution denied",
        "Recovery behavior",
        "Shows that failed or denied tool execution is part of the conversation protocol."
      ),
    ],
  },
  "02": {
    chapter: "02",
    angle: "Tool contracts as prompt-visible API",
    note:
      "These files are the clearest bridge from a Python dispatch map to production-grade tool descriptions.",
    prompts: [
      prompt(
        "tool-description-bash-overview.md",
        "Bash tool overview",
        "Execution tool",
        "Shows how a shell tool is constrained and explained before the model ever calls it."
      ),
      prompt(
        "tool-description-edit.md",
        "Edit tool",
        "Mutation tool",
        "Highlights exact replacement, prior read requirements, and edit safety constraints."
      ),
      prompt(
        "tool-description-readfile.md",
        "Read tool",
        "Observation tool",
        "Pairs with tool_result design and read-window limits."
      ),
      prompt(
        "tool-description-toolsearch-second-part.md",
        "ToolSearch",
        "Dynamic tool discovery",
        "Useful for showing how large tool surfaces become searchable instead of fully injected."
      ),
      prompt(
        "tool-description-agent-usage-notes.md",
        "Agent tool usage notes",
        "Higher-order tool",
        "Shows how a tool can launch another agent and still have a structured result contract."
      ),
    ],
  },
  "03": {
    chapter: "03",
    angle: "Coordination as a prompt protocol",
    note:
      "The coordinator chapter becomes concrete when students see the worker lifecycle and prompt-writing rules.",
    prompts: [
      prompt(
        "system-prompt-coordinator-mode-orchestration.md",
        "Coordinator mode orchestration",
        "Lead agent protocol",
        "Defines research, synthesis, implementation, verification, continuation, and stopping."
      ),
      prompt(
        "system-prompt-coordinator-worker-instructions.md",
        "Coordinator worker instructions",
        "Worker protocol",
        "Shows the worker-side constraints for scoped changes, commits, and summaries."
      ),
      prompt(
        "system-prompt-writing-subagent-prompts.md",
        "Writing subagent prompts",
        "Delegation craft",
        "Good supplement for teaching why subagent prompts must be self-contained."
      ),
      prompt(
        "agent-prompt-workflow-subagent-structured-output.md",
        "Workflow structured output",
        "Machine-readable return",
        "Connects orchestration to schema-valid worker outputs."
      ),
    ],
  },
  "04": {
    chapter: "04",
    angle: "Capabilities packaged as skills and tools",
    note:
      "Use these to separate extension discovery from loading the full capability body.",
    prompts: [
      prompt(
        "tool-description-skill.md",
        "Skill tool",
        "Skill invocation",
        "Shows how skills become explicit callable capability packs."
      ),
      prompt(
        "skill-init-claudemd-and-skill-setup-new-version.md",
        "Skill setup",
        "Skill scaffolding",
        "Useful for explaining package shape and setup expectations."
      ),
      prompt(
        "skill-create-verifier-skills.md",
        "Verifier skills",
        "Specialized skill creation",
        "Shows skills as reusable workflows rather than passive documentation."
      ),
      prompt(
        "system-reminder-previously-invoked-skills.md",
        "Previously invoked skills",
        "Skill state reminder",
        "Shows how the harness remembers capability use across the session."
      ),
    ],
  },
  "05": {
    chapter: "05",
    angle: "Hooks as lifecycle prompt and config surfaces",
    note:
      "These references help explain how hook behavior appears in prompts, reminders, and configuration tooling.",
    prompts: [
      prompt(
        "system-prompt-hooks-configuration.md",
        "Hooks configuration",
        "Config model",
        "Covers hook events, settings shape, and where lifecycle interception is configured."
      ),
      prompt(
        "agent-prompt-hook-condition-evaluator-stop.md",
        "Hook condition evaluator",
        "Hook logic",
        "Shows prompt-mediated evaluation around stop conditions."
      ),
      prompt(
        "system-reminder-hook-blocking-error.md",
        "Hook blocking error",
        "Runtime reminder",
        "Connects hook failures to the model-visible recovery path."
      ),
      prompt(
        "system-reminder-hook-additional-context.md",
        "Hook additional context",
        "Context injection",
        "Shows hooks as a way to add context, not only block execution."
      ),
    ],
  },
  "06": {
    chapter: "06",
    angle: "Shell execution and command safety",
    note:
      "Bash Engine becomes much easier to teach when tool descriptions, command analysis, and sandbox prompts sit beside the runtime code.",
    prompts: [
      prompt(
        "tool-description-bash-overview.md",
        "Bash overview",
        "Shell contract",
        "Defines the user-facing command execution contract."
      ),
      prompt(
        "agent-prompt-bash-command-prefix-detection.md",
        "Bash command prefix detection",
        "Command parsing",
        "Useful for command summarization and injection detection discussions."
      ),
      prompt(
        "agent-prompt-bash-command-description-writer.md",
        "Bash command description writer",
        "Command narration",
        "Shows how the UI can label commands before or while they run."
      ),
      prompt(
        "tool-description-bash-sandbox-user-permission-prompt.md",
        "Bash sandbox permission prompt",
        "Sandbox boundary",
        "Connects sandbox failures and user approval to prompt-visible behavior."
      ),
      prompt(
        "tool-description-powershell.md",
        "PowerShell tool",
        "Windows execution",
        "Adds the Windows-specific counterpart for shell execution."
      ),
    ],
  },
  "07": {
    chapter: "07",
    angle: "Permission and autonomous-action classifiers",
    note:
      "This is the strongest prompt-side companion to the permission pipeline chapter.",
    prompts: [
      prompt(
        "agent-prompt-security-monitor-for-autonomous-agent-actions-first-part.md",
        "Security monitor, first part",
        "Threat model",
        "Defines prompt injection, scope creep, accidental damage, and user-intent rules."
      ),
      prompt(
        "agent-prompt-security-monitor-for-autonomous-agent-actions-second-part.md",
        "Security monitor, second part",
        "Block and allow rules",
        "Complements the classifier threat model with concrete policy sections."
      ),
      prompt(
        "agent-prompt-auto-mode-rule-reviewer.md",
        "Auto mode rule reviewer",
        "Policy authoring",
        "Helps discuss user-customized permission rules and conflicts."
      ),
      prompt(
        "system-prompt-action-safety-and-truthful-reporting.md",
        "Action safety and truthful reporting",
        "Human approval",
        "A compact prompt fragment for reversible versus consequential actions."
      ),
    ],
  },
  "08": {
    chapter: "08",
    angle: "Swarms, workers, and team messaging",
    note:
      "These prompts expose the coordination rules that sit above worker processes and mailboxes.",
    prompts: [
      prompt(
        "system-prompt-coordinator-mode-orchestration.md",
        "Coordinator mode orchestration",
        "Lead-worker loop",
        "Provides the best prompt-level view of worker lifecycle and verification gates."
      ),
      prompt(
        "tool-description-sendmessagetool.md",
        "SendMessage tool",
        "Message transport",
        "Shows how the model is instructed to address and resume agents."
      ),
      prompt(
        "system-reminder-team-coordination.md",
        "Team coordination reminder",
        "Team state",
        "Useful for explaining active teammate names, IDs, and shutdown coordination."
      ),
      prompt(
        "agent-prompt-background-job-agent-instructions.md",
        "Background job agent instructions",
        "Async worker",
        "Connects worker progress narration to long-running background execution."
      ),
    ],
  },
  "09": {
    chapter: "09",
    angle: "Session identity, search, and continuity",
    note:
      "Use these files to show that session persistence also creates prompt utilities around naming, search, and continuation.",
    prompts: [
      prompt(
        "agent-prompt-session-search.md",
        "Session search",
        "Conversation lookup",
        "Direct companion for searchable JSONL session storage."
      ),
      prompt(
        "agent-prompt-session-title-and-branch-generation.md",
        "Session title and branch generation",
        "Session metadata",
        "Shows how sessions gain titles and branch names as usable state."
      ),
      prompt(
        "agent-prompt-rename-auto-generate-session-name.md",
        "Rename auto session name",
        "Naming utility",
        "Useful for discussing lightweight metadata generation."
      ),
      prompt(
        "system-reminder-session-continuation.md",
        "Session continuation reminder",
        "Resume state",
        "Shows the prompt-level marker for resumed work."
      ),
    ],
  },
  "10": {
    chapter: "10",
    angle: "Context assembly and memory selection",
    note:
      "These prompts map directly to what enters a model call and why.",
    prompts: [
      prompt(
        "system-prompt-memory-instructions.md",
        "Memory instructions",
        "Memory loading",
        "Defines how memory and codebase instructions are treated as model context."
      ),
      prompt(
        "agent-prompt-determine-which-memory-files-to-attach.md",
        "Determine memory files to attach",
        "Context selection",
        "A small utility prompt for choosing relevant memory files."
      ),
      prompt(
        "agent-prompt-memory-synthesis.md",
        "Memory synthesis",
        "Memory compression",
        "Shows memory as cited synthesis rather than raw always-on context."
      ),
      prompt(
        "system-reminder-memory-file-contents.md",
        "Memory file contents reminder",
        "Memory injection",
        "Shows how loaded memory becomes visible to the model."
      ),
      prompt(
        "system-reminder-nested-memory-contents.md",
        "Nested memory contents",
        "Included memory",
        "Useful for @include-style memory composition."
      ),
    ],
  },
  "11": {
    chapter: "11",
    angle: "Compaction prompts and summary contracts",
    note:
      "This EP should point students straight at the actual summarization prompt family.",
    prompts: [
      prompt(
        "agent-prompt-conversation-summarization.md",
        "Conversation summarization",
        "Full compact prompt",
        "The clearest prompt reference for preserving intent, files, errors, and current work."
      ),
      prompt(
        "agent-prompt-recent-message-summarization.md",
        "Recent message summarization",
        "Partial summary",
        "Pairs with partial compaction and retained older context."
      ),
      prompt(
        "system-prompt-context-compaction-summary.md",
        "Context compaction summary",
        "SDK compact",
        "A compact system fragment for context compaction summaries."
      ),
      prompt(
        "system-prompt-partial-compaction-instructions.md",
        "Partial compaction instructions",
        "Compaction variant",
        "Shows variant-specific instructions for summarizing only part of a transcript."
      ),
      prompt(
        "system-reminder-compact-file-reference.md",
        "Compact file reference reminder",
        "Post-compact continuity",
        "Connects summaries back to file references and continuation."
      ),
    ],
  },
  "12": {
    chapter: "12",
    angle: "Bootstrap, mode selection, and cacheable prompt data",
    note:
      "Startup is not only imports; prompt fragments and data payloads also shape fast-path initialization.",
    prompts: [
      prompt(
        "system-prompt-git-status.md",
        "Git status",
        "Session bootstrap",
        "Tiny but useful example of startup context injected into the session."
      ),
      prompt(
        "system-prompt-minimal-mode.md",
        "Minimal mode",
        "Fast mode shape",
        "Shows a reduced prompt mode for lighter operation."
      ),
      prompt(
        "system-prompt-scratchpad-directory.md",
        "Scratchpad directory",
        "Runtime paths",
        "Connects initialization to temporary-file policy."
      ),
      prompt(
        "data-prompt-caching-design-optimization.md",
        "Prompt caching design",
        "Cache planning",
        "Useful for explaining cache boundaries and stable prompt prefixes."
      ),
    ],
  },
  "13": {
    chapter: "13",
    angle: "Browser, remote, and user-message bridges",
    note:
      "Bridge System gets concrete when students see bridge-specific prompt fragments and tools.",
    prompts: [
      prompt(
        "system-prompt-claude-in-chrome-browser-automation.md",
        "Claude in Chrome browser automation",
        "Browser bridge",
        "Shows browser automation as a prompt-activated capability."
      ),
      prompt(
        "system-prompt-chrome-browser-mcp-tools.md",
        "Chrome browser MCP tools",
        "MCP bridge",
        "Connects browser automation to dynamic MCP tool loading."
      ),
      prompt(
        "tool-description-senduserfile.md",
        "SendUserFile",
        "User file bridge",
        "A prompt-visible surface for sending files back to the user."
      ),
      prompt(
        "system-prompt-remote-planning-session.md",
        "Remote planning session",
        "Remote control",
        "Helps discuss remote sessions and plan handoff."
      ),
      prompt(
        "tool-description-remotetrigger-prompt.md",
        "RemoteTrigger",
        "Remote execution",
        "Maps bridge transport into a callable tool surface."
      ),
    ],
  },
  "14": {
    chapter: "14",
    angle: "UI copy, status, and rendering constraints",
    note:
      "These prompts show how text output, status lines, and option previews become part of the UI contract.",
    prompts: [
      prompt(
        "system-prompt-communication-style.md",
        "Communication style",
        "Progress UI",
        "Defines when and how the agent sends user-facing updates."
      ),
      prompt(
        "system-prompt-tone-and-style-code-references.md",
        "Code references",
        "Clickable UI affordance",
        "Connects rendered output to clickable file references."
      ),
      prompt(
        "agent-prompt-status-line-setup.md",
        "Status line setup",
        "Terminal UI",
        "Useful for terminal status-line customization and shell integration."
      ),
      prompt(
        "system-prompt-option-previewer.md",
        "Option previewer",
        "Choice UI",
        "Shows prompt support for previewing user-facing options."
      ),
    ],
  },
  "15": {
    chapter: "15",
    angle: "Service references and API tool-use material",
    note:
      "This chapter can use the embedded data prompts as service-layer reading material.",
    prompts: [
      prompt(
        "data-claude-api-reference-typescript.md",
        "Claude API reference TypeScript",
        "SDK reference",
        "Connects service-layer clients to the actual API surface."
      ),
      prompt(
        "data-streaming-reference-typescript.md",
        "Streaming reference TypeScript",
        "Streaming service",
        "Useful for comparing API stream handling with QueryEngine behavior."
      ),
      prompt(
        "data-tool-use-reference-python.md",
        "Tool use reference Python",
        "Tool runner",
        "Grounds tool-use loops in official-style API examples embedded into the package."
      ),
      prompt(
        "data-http-error-codes-reference.md",
        "HTTP error codes reference",
        "Error handling",
        "Complements retries, fallback, and failure surfaces."
      ),
      prompt(
        "data-claude-model-catalog.md",
        "Model catalog",
        "Model routing",
        "Pairs with service boundaries, model selection, and budget discussions."
      ),
    ],
  },
  "16": {
    chapter: "16",
    angle: "Settings, config, memory, and infrastructure policy",
    note:
      "Use these prompts to connect infrastructure state with the config surfaces students can inspect.",
    prompts: [
      prompt(
        "skill-update-claude-code-config.md",
        "Update Claude Code config",
        "Config workflow",
        "Walks through settings changes as a guided skill."
      ),
      prompt(
        "skill-update-config-7-step-verification-flow.md",
        "Update config verification flow",
        "Config safety",
        "Adds a verification lens for config edits."
      ),
      prompt(
        "system-prompt-wsl-managed-settings-double-opt-in.md",
        "WSL managed settings double opt-in",
        "Managed settings",
        "Useful for explaining environment-specific settings safeguards."
      ),
      prompt(
        "system-prompt-hooks-configuration.md",
        "Hooks configuration",
        "Automation config",
        "Shows hooks as infrastructure-like user configuration."
      ),
      prompt(
        "system-prompt-memory-staleness-verification.md",
        "Memory staleness verification",
        "Config freshness",
        "Pairs with stale state, caches, and memory lifecycle."
      ),
    ],
  },
  "17": {
    chapter: "17",
    angle: "Operations, telemetry, budgets, and autonomous monitors",
    note:
      "These prompts support the operational layer: what is monitored, summarized, budgeted, and blocked.",
    prompts: [
      prompt(
        "system-reminder-token-usage.md",
        "Token usage reminder",
        "Usage telemetry",
        "A visible hook for token accounting."
      ),
      prompt(
        "system-reminder-usd-budget.md",
        "USD budget reminder",
        "Budget control",
        "Shows cost as a prompt-visible operational constraint."
      ),
      prompt(
        "agent-prompt-background-agent-state-classifier.md",
        "Background agent state classifier",
        "Operational state",
        "Classifies long-running background sessions as working, blocked, done, or failed."
      ),
      prompt(
        "agent-prompt-security-monitor-for-autonomous-agent-actions-first-part.md",
        "Security monitor, first part",
        "Operational safety",
        "Useful for privacy and operational-control discussions."
      ),
      prompt(
        "system-prompt-insights-at-a-glance-summary.md",
        "Insights at a glance",
        "Usage insight",
        "Connects telemetry-like usage data to user-facing summaries."
      ),
    ],
  },
};

export function getPromptReferenceUrl(filename: string) {
  return `${PROMPT_REPO_URL}/${filename}`;
}

