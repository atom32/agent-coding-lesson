import type { VersionId } from "@/lib/constants";

export type AdvancedChapterId =
  | "00"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17";

export interface AdvancedChapter {
  id: AdvancedChapterId;
  title: string;
  focus: string;
  path: string;
}

export interface CourseBridge {
  version: VersionId;
  labQuestion: string;
  productionQuestion: string;
  chapters: AdvancedChapterId[];
  bridge: string;
  practice: string;
  pattern: string;
}

export interface LocalizedCourseBridgeText {
  labQuestion: string;
  productionQuestion: string;
  bridge: string;
  practice: string;
  pattern: string;
}

export const ADVANCED_CHAPTERS: Record<AdvancedChapterId, AdvancedChapter> = {
  "00": {
    id: "00",
    title: "Architecture Overview",
    focus: "Six pillars of Claude Code as a production harness",
    path: "00-overview",
  },
  "01": {
    id: "01",
    title: "QueryEngine",
    focus: "The real while-loop: streaming, budgets, retries, and state",
    path: "01-query-engine",
  },
  "02": {
    id: "02",
    title: "Tool System",
    focus: "One tool contract for files, shell, web, MCP, and agents",
    path: "02-tool-system",
  },
  "03": {
    id: "03",
    title: "Coordinator",
    focus: "Spawning and supervising parallel work lanes",
    path: "03-coordinator",
  },
  "04": {
    id: "04",
    title: "Plugin System",
    focus: "Skills, hooks, and MCP servers as installable capability packs",
    path: "04-plugin-system",
  },
  "05": {
    id: "05",
    title: "Hook System",
    focus: "Lifecycle interception around tools, sessions, and notifications",
    path: "05-hook-system",
  },
  "06": {
    id: "06",
    title: "Bash Engine",
    focus: "Command execution with parsing, sandboxing, and output control",
    path: "06-bash-engine",
  },
  "07": {
    id: "07",
    title: "Permission Pipeline",
    focus: "Defense in depth from rules to AST checks to sandbox boundaries",
    path: "07-permission-pipeline",
  },
  "08": {
    id: "08",
    title: "Agent Swarms",
    focus: "Teams, mailboxes, permission delegation, and worker backends",
    path: "08-agent-swarms",
  },
  "09": {
    id: "09",
    title: "Session Persistence",
    focus: "Append-only conversation storage, resume, fork, and search",
    path: "09-session-persistence",
  },
  "10": {
    id: "10",
    title: "Context Assembly",
    focus: "System prompt, memory, attachments, and per-turn context",
    path: "10-context-assembly",
  },
  "11": {
    id: "11",
    title: "Compact System",
    focus: "Microcompact, session memory, full summaries, and circuit breakers",
    path: "11-compact-system",
  },
  "12": {
    id: "12",
    title: "Startup & Bootstrap",
    focus: "Fast paths, dynamic imports, and initialization state",
    path: "12-startup-bootstrap",
  },
  "13": {
    id: "13",
    title: "Bridge System",
    focus: "CLI to IDE/browser bridges and remote-control transport",
    path: "13-bridge-system",
  },
  "14": {
    id: "14",
    title: "UI State & Rendering",
    focus: "Terminal UI, React/Ink state, input modes, and rendering",
    path: "14-ui-state-management",
  },
  "15": {
    id: "15",
    title: "Services & API Layer",
    focus: "Model clients, streams, retries, providers, and service boundaries",
    path: "15-services-api-layer",
  },
  "16": {
    id: "16",
    title: "Infrastructure & Config",
    focus: "Settings, feature flags, caches, telemetry, and shared state",
    path: "16-infrastructure-config",
  },
  "17": {
    id: "17",
    title: "Telemetry & Operations",
    focus: "Privacy, operational control, model routing, and observability",
    path: "17-telemetry-privacy-operations",
  },
};

export const ADVANCED_CHAPTERS_ZH: Record<AdvancedChapterId, Pick<AdvancedChapter, "title" | "focus">> = {
  "00": { title: "架构总览", focus: "作为生产级 harness 的 Claude Code 六大支柱" },
  "01": { title: "查询引擎", focus: "真实 while 循环：流式、预算、重试与状态" },
  "02": { title: "工具系统", focus: "用一个工具契约统一文件、Shell、Web、MCP 和 Agent" },
  "03": { title: "协调器", focus: "生成并监督并行工作通道" },
  "04": { title: "插件系统", focus: "把技能、Hook 和 MCP 服务器打包成可安装能力" },
  "05": { title: "Hook 系统", focus: "围绕工具、会话和通知拦截生命周期事件" },
  "06": { title: "Bash 引擎", focus: "带解析、沙箱和输出控制的命令执行" },
  "07": { title: "权限流水线", focus: "从规则到 AST 检查再到沙箱边界的纵深防御" },
  "08": { title: "Agent Swarm", focus: "团队、邮箱、权限委托和 worker 后端" },
  "09": { title: "会话持久化", focus: "追加式会话存储、恢复、分叉和搜索" },
  "10": { title: "上下文装配", focus: "系统提示词、记忆、附件和每轮上下文" },
  "11": { title: "压缩系统", focus: "微压缩、会话记忆、完整摘要和熔断器" },
  "12": { title: "启动与引导", focus: "快速路径、动态导入和初始化状态" },
  "13": { title: "桥接系统", focus: "CLI 到 IDE/浏览器的桥接和远程控制传输" },
  "14": { title: "UI 状态与渲染", focus: "终端 UI、React/Ink 状态、输入模式和渲染" },
  "15": { title: "服务与 API 层", focus: "模型客户端、流、重试、提供商和服务边界" },
  "16": { title: "基础设施与配置", focus: "设置、功能开关、缓存、遥测和共享状态" },
  "17": { title: "遥测与运营", focus: "隐私、运营控制、模型路由和可观测性" },
};

export const COURSE_BRIDGES: CourseBridge[] = [
  {
    version: "s01",
    labQuestion: "How does a model become an agent with one loop and one tool?",
    productionQuestion: "What does that loop need before it can survive real users?",
    chapters: ["01", "15"],
    bridge:
      "The lab loop teaches tool_use and tool_result. QueryEngine keeps that kernel but adds streaming, usage accounting, retries, model fallback, and message normalization.",
    practice:
      "Add a max-round limit and a tiny retry wrapper to s01, then compare the shape to QueryEngine's recovery matrix.",
    pattern: "Keep the loop simple; put production obligations around it.",
  },
  {
    version: "s02",
    labQuestion: "How do new abilities enter the harness without rewriting the loop?",
    productionQuestion: "How do 42+ tools stay safe, searchable, cache-stable, and UI-ready?",
    chapters: ["02", "06", "07"],
    bridge:
      "The dispatch map becomes a full Tool contract: schema validation, permission checks, concurrency flags, rendering, result storage, and sandboxed execution.",
    practice:
      "Turn one s02 handler into a small object with schema, read-only status, and validation before it executes.",
    pattern: "A tool is a contract, not just a function.",
  },
  {
    version: "s03",
    labQuestion: "How can the harness help the model maintain intent over many steps?",
    productionQuestion: "Where do reminders, plans, and task state appear in a real conversation?",
    chapters: ["10", "08"],
    bridge:
      "TodoWrite is a visible planning surface. In Claude Code, similar nudges arrive as attachments, plan-mode context, task reminders, and team coordination state.",
    practice:
      "Make the todo reminder configurable by turn count and show when it is injected into messages.",
    pattern: "Planning belongs in state the model can update and the user can inspect.",
  },
  {
    version: "s04",
    labQuestion: "How does a subagent keep noisy work out of the main context?",
    productionQuestion: "How are real workers spawned, isolated, supervised, and summarized?",
    chapters: ["03", "08"],
    bridge:
      "The toy subagent uses independent messages. Production workers add backends, identity, task records, permission delegation, and completion notifications.",
    practice:
      "Log every subagent request and final summary to a small JSONL file so the main agent can audit delegated work.",
    pattern: "Delegation is context isolation plus lifecycle control.",
  },
  {
    version: "s05",
    labQuestion: "How can knowledge load only when the model needs it?",
    productionQuestion: "How do skills, plugins, MCP tools, and slash commands form an extension system?",
    chapters: ["04", "05", "10"],
    bridge:
      "SKILL.md loading becomes a layered extension architecture: discovery, command conversion, hook integration, plugin packaging, and dynamic context deltas.",
    practice:
      "Add skill metadata and a simple search hint, then make the model request the skill before seeing the full body.",
    pattern: "Discovery first, full context only on demand.",
  },
  {
    version: "s06",
    labQuestion: "How does an agent keep working when context fills up?",
    productionQuestion: "How does a real system reclaim tokens without destroying continuity or cache value?",
    chapters: ["11", "01", "10"],
    bridge:
      "The lab's three layers map to microcompact, session-memory compact, and full LLM summaries, with API invariants, cache edits, thresholds, and circuit breakers.",
    practice:
      "Record the before and after token estimate for each compact layer and show what was replaced.",
    pattern: "Compress in layers: cheap and precise before expensive and lossy.",
  },
  {
    version: "s07",
    labQuestion: "How do goals survive outside the current chat turn?",
    productionQuestion: "How are sessions, tasks, resumes, forks, and durable state represented?",
    chapters: ["09", "08"],
    bridge:
      "The task board is durable control-plane state. Claude Code extends that idea with JSONL sessions, parent chains, task variants, and background notifications.",
    practice:
      "Add a task history log so every state transition can be replayed after a crash.",
    pattern: "Long work needs durable state, not just long context.",
  },
  {
    version: "s08",
    labQuestion: "How can slow work finish without blocking the agent's next thought?",
    productionQuestion: "How does background work get prioritized, retried, and reintroduced?",
    chapters: ["08", "15"],
    bridge:
      "A background thread and notification queue become task-state variants, completion XML, API priority rules, and foreground/background retry differences.",
    practice:
      "Add status, started_at, ended_at, and failure output to background task notifications.",
    pattern: "Async work needs a reentry path back into the conversation.",
  },
  {
    version: "s09",
    labQuestion: "How do multiple agents coordinate with only files?",
    productionQuestion: "Why would a real swarm still use file mailboxes and locks?",
    chapters: ["08", "03"],
    bridge:
      "The JSONL inbox grows into a crash-safe mailbox with locks, team config, backend detection, leader-worker rules, and permission delegation.",
    practice:
      "Add message IDs and lock-protected append/read operations to the toy mailbox.",
    pattern: "Simple persistence can beat clever IPC when agents are separate processes.",
  },
  {
    version: "s10",
    labQuestion: "How do teammates negotiate decisions without ad hoc messages?",
    productionQuestion: "How do plan approval, shutdown, and permission requests share one protocol shape?",
    chapters: ["08", "05"],
    bridge:
      "The request-response pattern becomes structured control messages routed through SendMessage and reinforced by lifecycle hooks.",
    practice:
      "Implement one new protocol, such as review_request/review_response, using the same request_id correlation.",
    pattern: "Protocols scale when every negotiation has the same envelope.",
  },
  {
    version: "s11",
    labQuestion: "How does a teammate decide what to do without being assigned?",
    productionQuestion: "How do autonomous workers stay bounded by team state, reminders, and leadership?",
    chapters: ["08", "10"],
    bridge:
      "Idle polling and task claiming become an autonomous worker loop backed by team context, mailbox polling, plan approval, and task notifications.",
    practice:
      "Add lease expiry to claimed tasks so abandoned work can be reclaimed safely.",
    pattern: "Autonomy is polling plus ownership plus escape hatches.",
  },
  {
    version: "s12",
    labQuestion: "How do parallel agents avoid stepping on the same files?",
    productionQuestion: "How does production coordinate worktrees, cleanup, settings, and recovery?",
    chapters: ["03", "08", "16"],
    bridge:
      "Task/worktree binding turns intent into an isolated execution lane. Production adds backend-specific spawning, cleanup hooks, config propagation, and lifecycle telemetry.",
    practice:
      "Add an event replay view that reconstructs active worktrees from tasks plus events.jsonl.",
    pattern: "Separate the control plane from the execution plane.",
  },
];

export const ADVANCED_CHAPTER_LIST: AdvancedChapter[] = Object.values(
  ADVANCED_CHAPTERS
).sort((a, b) => a.id.localeCompare(b.id));

export const COURSE_BRIDGE_ZH: Record<string, LocalizedCourseBridgeText> = {
  s01: {
    labQuestion: "一个模型如何靠一个循环和一个工具变成 Agent？",
    productionQuestion: "这个循环要面对真实用户，还需要补上什么？",
    bridge: "实验室循环讲清 tool_use 和 tool_result。QueryEngine 保留这个内核，同时加入流式、用量统计、重试、模型降级和消息规范化。",
    practice: "给 s01 加一个最大轮次限制和一个极简重试包装，再对照 QueryEngine 的恢复矩阵。",
    pattern: "循环保持简单，把生产责任放在循环周围。",
  },
  s02: {
    labQuestion: "新能力如何进入 harness，而不用重写循环？",
    productionQuestion: "42+ 个工具如何保持安全、可搜索、缓存稳定并能渲染 UI？",
    bridge: "dispatch map 在真实系统里会长成完整 Tool 契约：schema 校验、权限检查、并发标志、结果存储和沙箱执行。",
    practice: "把 s02 的一个 handler 改成带 schema、只读状态和执行前校验的小对象。",
    pattern: "工具不是函数，而是一份契约。",
  },
  s03: {
    labQuestion: "Harness 如何帮助模型在多步骤任务里保持意图？",
    productionQuestion: "提醒、计划和任务状态在真实对话里如何出现？",
    bridge: "TodoWrite 是可见的规划表面。Claude Code 中类似信号会通过附件、计划模式上下文、任务提醒和团队状态注入。",
    practice: "让 todo 提醒的轮次阈值可配置，并显示它何时被注入 messages。",
    pattern: "规划应该存在于模型可更新、用户可检查的状态里。",
  },
  s04: {
    labQuestion: "子 Agent 如何把嘈杂工作隔离出主上下文？",
    productionQuestion: "真实 worker 如何生成、隔离、监督和汇总？",
    bridge: "玩具子 Agent 使用独立 messages。生产 worker 还需要后端、身份、任务记录、权限委托和完成通知。",
    practice: "把每次子 Agent 请求和最终摘要写入 JSONL，让主 Agent 可以审计委派工作。",
    pattern: "委派 = 上下文隔离 + 生命周期控制。",
  },
  s05: {
    labQuestion: "知识如何只在模型需要时加载？",
    productionQuestion: "Skill、Plugin、MCP 工具和斜杠命令如何组成扩展系统？",
    bridge: "SKILL.md 加载在真实系统里会变成分层扩展架构：发现、命令转换、Hook 集成、插件打包和动态上下文增量。",
    practice: "给 skill 加 metadata 和 search hint，让模型先发现 skill，再读取完整正文。",
    pattern: "先发现，完整上下文按需加载。",
  },
  s06: {
    labQuestion: "上下文满了以后，Agent 如何继续工作？",
    productionQuestion: "真实系统如何回收 token，同时尽量不破坏连续性和缓存价值？",
    bridge: "实验室三层压缩对应微压缩、会话记忆压缩和完整 LLM 摘要，并进一步加入 API 不变量、cache edits、阈值和熔断器。",
    practice: "记录每一层压缩前后的 token 估算，并展示哪些内容被替换。",
    pattern: "分层压缩：先便宜精准，再昂贵有损。",
  },
  s07: {
    labQuestion: "目标如何活过当前聊天轮次？",
    productionQuestion: "会话、任务、恢复、分叉和持久状态如何表达？",
    bridge: "任务板是持久控制平面。Claude Code 把这个想法扩展到 JSONL 会话、父链、任务变体和后台通知。",
    practice: "给任务加历史日志，让崩溃后可以重放每次状态变化。",
    pattern: "长任务需要持久状态，不只是更长上下文。",
  },
  s08: {
    labQuestion: "慢操作如何不阻塞 Agent 的下一步思考？",
    productionQuestion: "后台工作如何区分优先级、重试并重新进入对话？",
    bridge: "后台线程和通知队列会扩展为任务状态变体、完成 XML、API 优先级规则，以及前台/后台不同的重试策略。",
    practice: "给后台任务通知增加 status、started_at、ended_at 和失败输出。",
    pattern: "异步工作必须有回到对话流的入口。",
  },
  s09: {
    labQuestion: "多个 Agent 只靠文件如何协作？",
    productionQuestion: "真实 Swarm 为什么仍然可以选择文件邮箱和锁？",
    bridge: "JSONL inbox 会长成带锁的崩溃安全邮箱、团队配置、后端检测、领导-工人规则和权限委托。",
    practice: "给玩具邮箱增加 message id 和带锁的 append/read 操作。",
    pattern: "当 Agent 是独立进程时，简单持久化可能比复杂 IPC 更可靠。",
  },
  s10: {
    labQuestion: "队友如何不用临时话术协商决策？",
    productionQuestion: "计划审批、关闭和权限请求如何共享一种协议形状？",
    bridge: "request-response 模式在真实系统中会变成结构化控制消息，由 SendMessage 路由，并由生命周期 Hook 强化。",
    practice: "用相同的 request_id 关联方式实现一个 review_request/review_response 协议。",
    pattern: "当所有协商都有同一种信封，协议才容易扩展。",
  },
  s11: {
    labQuestion: "队友如何在无人分配时自己决定做什么？",
    productionQuestion: "自主 worker 如何仍受团队状态、提醒和领导约束？",
    bridge: "idle polling 和 task claiming 会变成由团队上下文、邮箱轮询、计划审批和任务通知支撑的 worker 循环。",
    practice: "给已认领任务增加租约过期，让 abandoned work 可以安全回收。",
    pattern: "自主性 = 轮询 + 所有权 + 逃生通道。",
  },
  s12: {
    labQuestion: "并行 Agent 如何避免踩到同一批文件？",
    productionQuestion: "生产系统如何协调 worktree、清理、设置和恢复？",
    bridge: "task/worktree 绑定把意图变成隔离执行通道。生产系统还会加入后端生成、清理 Hook、配置传播和生命周期遥测。",
    practice: "增加一个事件重放视图，用 tasks 加 events.jsonl 还原当前活跃 worktree。",
    pattern: "把控制平面和执行平面分开。",
  },
};

export function getCourseBridge(version: string) {
  return COURSE_BRIDGES.find((item) => item.version === version);
}

export function localizeBridge(bridge: CourseBridge, locale: string): CourseBridge {
  if (locale !== "zh") return bridge;
  const translated = COURSE_BRIDGE_ZH[bridge.version];
  return translated ? { ...bridge, ...translated } : bridge;
}

export function localizeChapter(chapter: AdvancedChapter, locale: string): AdvancedChapter {
  if (locale !== "zh") return chapter;
  const translated = ADVANCED_CHAPTERS_ZH[chapter.id];
  return translated ? { ...chapter, ...translated } : chapter;
}

export function getAdvancedChapterUrl(locale: string, chapter: AdvancedChapter) {
  return `/${locale}/advanced/${chapter.path}`;
}
