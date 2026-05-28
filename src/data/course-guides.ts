import type { VersionId } from "@/lib/constants";

type Locale = "en" | "zh" | "ja";

type Localized = {
  en: string;
  zh: string;
  ja?: string;
};

export interface CourseSummary {
  version: VersionId;
  focus: Localized;
  mentalModel: Localized;
  labMechanism: Localized;
  productionBridge: Localized;
  checkpoint: Localized;
  glossary: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  aliases?: string[];
  definition: Localized;
  whyItMatters: Localized;
  sessions: VersionId[];
}

export function localizeText(value: Localized, locale: string) {
  if (locale === "zh") return value.zh;
  if (locale === "ja" && value.ja) return value.ja;
  return value.en;
}

export const COURSE_SUMMARIES: CourseSummary[] = [
  {
    version: "s01",
    focus: {
      en: "Turn one model call into an agentic loop.",
      zh: "把一次模型调用变成可持续行动的 Agent 循环。",
    },
    mentalModel: {
      en: "The model reasons, the harness acts, and the observation goes back into messages.",
      zh: "模型负责推理，harness 负责行动，观察结果再回到 messages。",
    },
    labMechanism: {
      en: "A while loop that sends messages, executes one bash tool, appends tool_result, and repeats.",
      zh: "一个 while 循环：发送 messages，执行一个 bash 工具，追加 tool_result，然后继续。",
    },
    productionBridge: {
      en: "QueryEngine keeps this loop but adds streaming, usage budgets, retries, fallback, and normalized message state.",
      zh: "QueryEngine 保留这个内核，再加入流式、用量预算、重试、降级和消息状态规范化。",
    },
    checkpoint: {
      en: "Can you point to where Reason, Act, and Observe happen in the code?",
      zh: "你能在代码里指出 Reason、Act、Observe 分别发生在哪里吗？",
    },
    glossary: ["agentic-loop", "react", "tool-result", "harness-engineering"],
  },
  {
    version: "s02",
    focus: {
      en: "Make capabilities extensible without changing the loop.",
      zh: "让新能力可扩展，而不是每加一个工具就重写循环。",
    },
    mentalModel: {
      en: "A tool is a contract between model intent and real-world execution.",
      zh: "工具是模型意图和真实世界执行之间的一份契约。",
    },
    labMechanism: {
      en: "Tool definitions, JSON input schemas, and a dispatch map from tool name to handler.",
      zh: "工具定义、JSON input schema，以及从 tool name 到 handler 的 dispatch map。",
    },
    productionBridge: {
      en: "The Tool System expands handlers into schema validation, permission checks, rendering, concurrency flags, and result storage.",
      zh: "Tool System 会把 handler 扩展成 schema 校验、权限检查、渲染、并发标志和结果存储。",
    },
    checkpoint: {
      en: "Can you add one read-only tool and describe its schema, permission policy, and error shape?",
      zh: "你能新增一个只读工具，并说明它的 schema、权限策略和错误形状吗？",
    },
    glossary: ["tool-calling", "dispatch-map", "schema", "permission-boundary"],
  },
  {
    version: "s03",
    focus: {
      en: "Give the agent an inspectable planning surface.",
      zh: "给 Agent 一个用户可检查的规划表面。",
    },
    mentalModel: {
      en: "Planning should be mutable state, not a private thought that disappears between turns.",
      zh: "计划应该是可更新的状态，而不是一段会在轮次之间消失的私有想法。",
    },
    labMechanism: {
      en: "TodoWrite stores tasks and injects reminders when the conversation drifts.",
      zh: "TodoWrite 存储任务，并在对话开始漂移时注入提醒。",
    },
    productionBridge: {
      en: "Context Assembly can inject plan-mode state, task reminders, and attachments as first-class context.",
      zh: "Context Assembly 可以把计划模式状态、任务提醒和附件作为一等上下文注入。",
    },
    checkpoint: {
      en: "Can you explain when a todo reminder should enter messages, and when it should stay out?",
      zh: "你能解释 todo 提醒什么时候该进入 messages，什么时候不该进入吗？",
    },
    glossary: ["todo-state", "context-assembly", "control-plane"],
  },
  {
    version: "s04",
    focus: {
      en: "Delegate noisy work while keeping the parent context clean.",
      zh: "把嘈杂工作委派出去，同时保持主上下文干净。",
    },
    mentalModel: {
      en: "A subagent is context isolation plus a summary boundary.",
      zh: "子 Agent 本质上是上下文隔离加摘要边界。",
    },
    labMechanism: {
      en: "Spawn a child with fresh messages, shared filesystem tools, and summary-only return.",
      zh: "生成一个 fresh messages 的子进程/子 Agent，共享文件系统工具，只把最终摘要返回给父 Agent。",
    },
    productionBridge: {
      en: "Coordinator and Agent Swarms add worker backends, supervision, permission delegation, task records, and completion notifications.",
      zh: "Coordinator 和 Agent Swarms 会补上 worker 后端、监督、权限委托、任务记录和完成通知。",
    },
    checkpoint: {
      en: "Can you name what information should return to the parent and what should be discarded?",
      zh: "你能说清楚哪些信息该返回父 Agent，哪些应该被丢弃吗？",
    },
    glossary: ["subagent", "summary-layer", "mailbox"],
  },
  {
    version: "s05",
    focus: {
      en: "Load capability knowledge only when it is needed.",
      zh: "只在需要时加载能力知识。",
    },
    mentalModel: {
      en: "Discovery is cheap; full context is expensive.",
      zh: "发现信息很便宜，完整上下文很昂贵。",
    },
    labMechanism: {
      en: "Skill metadata is visible early; full SKILL.md content enters the conversation on demand.",
      zh: "先暴露 skill metadata，只有按需时才把完整 SKILL.md 放进对话。",
    },
    productionBridge: {
      en: "Plugin System combines skills, hooks, slash commands, and MCP servers into installable capability packs.",
      zh: "Plugin System 把 skills、hooks、slash commands 和 MCP servers 组合成可安装的能力包。",
    },
    checkpoint: {
      en: "Can you separate the discovery prompt from the full operational instructions?",
      zh: "你能把发现提示和完整操作说明分开吗？",
    },
    glossary: ["skill", "plugin", "mcp", "hook"],
  },
  {
    version: "s06",
    focus: {
      en: "Keep long work alive when the context window fills up.",
      zh: "当上下文窗口被填满时，让长任务继续活下去。",
    },
    mentalModel: {
      en: "Compact in layers: cheap and precise first, expensive and lossy last.",
      zh: "压缩要分层：先便宜精准，最后才昂贵有损。",
    },
    labMechanism: {
      en: "Micro-compact large tool results, auto-compact older turns, and archive full transcripts.",
      zh: "微压缩大型工具结果，自动压缩旧轮次，并归档完整 transcript。",
    },
    productionBridge: {
      en: "Compact System adds cache-aware edits, summary prompts, failure circuit breakers, and session memory.",
      zh: "Compact System 会加入 cache-aware edits、摘要提示词、失败熔断器和 session memory。",
    },
    checkpoint: {
      en: "Can you choose what to preserve before asking an LLM to summarize?",
      zh: "你能在让 LLM 摘要前先决定哪些信息必须保留吗？",
    },
    glossary: ["context-window", "compaction", "session-memory", "summary-layer"],
  },
  {
    version: "s07",
    focus: {
      en: "Move goals from chat context into durable task state.",
      zh: "把目标从聊天上下文移到持久任务状态里。",
    },
    mentalModel: {
      en: "Long work needs a control plane outside the current prompt.",
      zh: "长任务需要一个独立于当前 prompt 的控制平面。",
    },
    labMechanism: {
      en: "A file-backed task graph records dependencies, status, and next actions.",
      zh: "文件化任务图记录依赖、状态和下一步行动。",
    },
    productionBridge: {
      en: "Session Persistence and Agent Swarms extend this into resumes, forks, task variants, and notifications.",
      zh: "Session Persistence 和 Agent Swarms 会把它扩展成恢复、分叉、任务变体和通知。",
    },
    checkpoint: {
      en: "Can you replay task state after a crash without trusting the model memory?",
      zh: "你能在崩溃后不依赖模型记忆来重放任务状态吗？",
    },
    glossary: ["task-board", "control-plane", "event-log"],
  },
  {
    version: "s08",
    focus: {
      en: "Let slow work finish without blocking the next thought.",
      zh: "让慢操作继续执行，同时不阻塞 Agent 的下一步思考。",
    },
    mentalModel: {
      en: "Background work is useful only if it has a reentry path.",
      zh: "后台工作只有在能重新进入对话流时才有价值。",
    },
    labMechanism: {
      en: "Background threads run commands and send completion notifications back to the foreground loop.",
      zh: "后台线程执行命令，并把完成通知送回前台循环。",
    },
    productionBridge: {
      en: "Production systems add priority, retry policy, cancellation, structured completion payloads, and UI surfacing.",
      zh: "生产系统会补上优先级、重试策略、取消、结构化完成载荷和 UI 呈现。",
    },
    checkpoint: {
      en: "Can you describe how the agent learns that background work is done?",
      zh: "你能描述 Agent 如何知道后台工作已经完成吗？",
    },
    glossary: ["background-task", "notification", "event-log"],
  },
  {
    version: "s09",
    focus: {
      en: "Coordinate multiple agents through durable messages.",
      zh: "通过持久消息协调多个 Agent。",
    },
    mentalModel: {
      en: "Simple persisted mailboxes are often better than clever in-memory IPC.",
      zh: "当 Agent 是独立工作者时，简单持久邮箱常常比聪明的内存 IPC 更可靠。",
    },
    labMechanism: {
      en: "Teammates exchange JSONL mailbox messages and preserve state across turns.",
      zh: "队友通过 JSONL 邮箱交换消息，并跨轮次保留状态。",
    },
    productionBridge: {
      en: "Agent Swarms add locks, identities, backend detection, leader-worker rules, and permission delegation.",
      zh: "Agent Swarms 会加入锁、身份、后端检测、leader-worker 规则和权限委托。",
    },
    checkpoint: {
      en: "Can you prevent two workers from consuming or overwriting the same message?",
      zh: "你能防止两个 worker 消费或覆盖同一条消息吗？",
    },
    glossary: ["mailbox", "agent-swarm", "permission-boundary"],
  },
  {
    version: "s10",
    focus: {
      en: "Make team negotiation structured instead of ad hoc.",
      zh: "把团队协商做成结构化协议，而不是临时话术。",
    },
    mentalModel: {
      en: "Every negotiation needs the same envelope: request, correlation id, response, timeout.",
      zh: "每次协商都需要同一种信封：request、correlation id、response、timeout。",
    },
    labMechanism: {
      en: "Request-response protocols use request_id to connect decisions across teammates.",
      zh: "request-response 协议用 request_id 关联队友之间的决策。",
    },
    productionBridge: {
      en: "Hook System and swarm messaging reuse that envelope for plan approval, shutdown, permission, and review workflows.",
      zh: "Hook System 和 swarm messaging 会把这套信封复用于计划审批、关闭、权限和 review 流程。",
    },
    checkpoint: {
      en: "Can you add a new protocol without changing the transport?",
      zh: "你能在不改 transport 的情况下新增一种协议吗？",
    },
    glossary: ["protocol", "hook", "mailbox"],
  },
  {
    version: "s11",
    focus: {
      en: "Let workers claim work autonomously while staying bounded.",
      zh: "让 worker 自主认领任务，同时保持边界。",
    },
    mentalModel: {
      en: "Autonomy is polling plus ownership plus escape hatches.",
      zh: "自主性 = 轮询 + 所有权 + 逃生通道。",
    },
    labMechanism: {
      en: "Workers scan the board, claim available tasks, execute, and release or complete them.",
      zh: "worker 扫描任务板，认领可用任务，执行，然后释放或完成。",
    },
    productionBridge: {
      en: "Production workers add leases, team context, plan approval, reminders, and leader visibility.",
      zh: "生产 worker 会补上租约、团队上下文、计划审批、提醒和 leader 可见性。",
    },
    checkpoint: {
      en: "Can you recover work when a worker dies after claiming a task?",
      zh: "worker 认领任务后挂掉时，你能恢复这项工作吗？",
    },
    glossary: ["task-board", "lease", "agent-swarm"],
  },
  {
    version: "s12",
    focus: {
      en: "Separate the control plane from isolated execution lanes.",
      zh: "把控制平面和隔离执行通道分开。",
    },
    mentalModel: {
      en: "Tasks describe intent; worktrees provide safe directories to execute that intent.",
      zh: "任务描述意图，worktree 提供安全的执行目录。",
    },
    labMechanism: {
      en: "Each task binds to its own worktree lifecycle and emits events back to the shared board.",
      zh: "每个任务绑定自己的 worktree 生命周期，并把事件发回共享任务板。",
    },
    productionBridge: {
      en: "Coordinator and Infrastructure add backend-specific spawn, cleanup, config propagation, and lifecycle telemetry.",
      zh: "Coordinator 和 Infrastructure 会补上后端特定生成、清理、配置传播和生命周期遥测。",
    },
    checkpoint: {
      en: "Can you identify which state belongs to the task and which belongs to the execution directory?",
      zh: "你能区分哪些状态属于任务，哪些属于执行目录吗？",
    },
    glossary: ["worktree", "control-plane", "event-log"],
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "harness-engineering",
    term: "Harness Engineering",
    aliases: ["agent runtime"],
    definition: {
      en: "The engineering around the model: message structure, tool contracts, execution, permissions, context, retries, logs, tasks, and recovery.",
      zh: "围绕模型搭建可执行系统的工程：messages、工具契约、执行、权限、上下文、重试、日志、任务和恢复。",
    },
    whyItMatters: {
      en: "Most agent quality problems are runtime design problems before they are prompt problems.",
      zh: "许多 Agent 质量问题首先是运行时设计问题，其次才是提示词问题。",
    },
    sessions: ["s01", "s02", "s06", "s12"],
  },
  {
    id: "agentic-loop",
    term: "Agentic Loop",
    aliases: ["agent loop"],
    definition: {
      en: "The repeated cycle where the model chooses an action, the harness executes it, and the result is fed back into context.",
      zh: "模型选择行动、harness 执行动作、结果回到上下文的重复循环。",
    },
    whyItMatters: {
      en: "It is the smallest structure that turns a model into an agent.",
      zh: "这是把模型变成 Agent 的最小结构。",
    },
    sessions: ["s01"],
  },
  {
    id: "react",
    term: "ReAct",
    aliases: ["Reason-Act-Observe"],
    definition: {
      en: "A loop pattern: reason about the next step, act through a tool, observe the result, then repeat.",
      zh: "一种循环模式：先推理下一步，通过工具行动，观察结果，然后继续。",
    },
    whyItMatters: {
      en: "It gives students a vocabulary for reading tool_use and tool_result traces.",
      zh: "它给学生一个阅读 tool_use 和 tool_result 轨迹的基本词汇。",
    },
    sessions: ["s01", "s02"],
  },
  {
    id: "tool-calling",
    term: "Tool Calling",
    aliases: ["tool_use"],
    definition: {
      en: "The protocol where a model emits a structured tool_use request that the harness executes outside the model.",
      zh: "模型发出结构化 tool_use 请求，由 harness 在模型外部执行的协议。",
    },
    whyItMatters: {
      en: "It is the boundary between language reasoning and real-world side effects.",
      zh: "它是语言推理和真实世界副作用之间的边界。",
    },
    sessions: ["s01", "s02"],
  },
  {
    id: "tool-result",
    term: "tool_result",
    definition: {
      en: "The structured observation message that returns a tool's output to the model after execution.",
      zh: "工具执行后，把输出返回给模型的结构化观察消息。",
    },
    whyItMatters: {
      en: "Bad result shape creates bad next actions; the observation is part of the API.",
      zh: "糟糕的结果形状会诱发糟糕的下一步；观察结果本身就是 API 的一部分。",
    },
    sessions: ["s01", "s02", "s08"],
  },
  {
    id: "dispatch-map",
    term: "Dispatch Map",
    definition: {
      en: "A lookup table from tool name to the handler that executes that tool.",
      zh: "从工具名称映射到执行 handler 的查找表。",
    },
    whyItMatters: {
      en: "It lets the loop stay stable while capabilities grow.",
      zh: "它让循环保持稳定，同时能力可以继续增长。",
    },
    sessions: ["s02"],
  },
  {
    id: "schema",
    term: "Schema",
    definition: {
      en: "The structured contract describing a tool's accepted inputs and required fields.",
      zh: "描述工具接受哪些输入、哪些字段必需的结构化契约。",
    },
    whyItMatters: {
      en: "Schemas make tool calls validateable, inspectable, and safer to execute.",
      zh: "Schema 让工具调用可以校验、可以检查，也更安全。",
    },
    sessions: ["s02"],
  },
  {
    id: "permission-boundary",
    term: "Permission Boundary",
    definition: {
      en: "The policy layer that decides whether a requested action may execute.",
      zh: "决定某个请求动作是否允许执行的策略边界。",
    },
    whyItMatters: {
      en: "Agent systems need useful power without giving every model output unrestricted authority.",
      zh: "Agent 系统需要有用的能力，但不能让每个模型输出都拥有无限权限。",
    },
    sessions: ["s02", "s09"],
  },
  {
    id: "todo-state",
    term: "Todo State",
    definition: {
      en: "A visible planning state that tracks current tasks, status, and intent.",
      zh: "记录当前任务、状态和意图的可见规划状态。",
    },
    whyItMatters: {
      en: "It turns vague intention into a surface the model and user can inspect.",
      zh: "它把模糊意图变成模型和用户都能检查的表面。",
    },
    sessions: ["s03"],
  },
  {
    id: "context-assembly",
    term: "Context Assembly",
    definition: {
      en: "The per-turn process of deciding which system prompts, memories, attachments, reminders, and state enter the model call.",
      zh: "每一轮决定哪些 system prompt、记忆、附件、提醒和状态进入模型调用的过程。",
    },
    whyItMatters: {
      en: "The same state can help or distract depending on when it enters context.",
      zh: "同一份状态在不同时间进入上下文，可能是帮助，也可能是干扰。",
    },
    sessions: ["s03", "s05", "s06"],
  },
  {
    id: "subagent",
    term: "Subagent",
    definition: {
      en: "A temporary or persistent worker agent with its own context, tools, and completion boundary.",
      zh: "拥有独立上下文、工具和完成边界的临时或持久 worker Agent。",
    },
    whyItMatters: {
      en: "It keeps exploratory or noisy work from flooding the parent conversation.",
      zh: "它避免探索性或嘈杂工作淹没主对话。",
    },
    sessions: ["s04", "s09"],
  },
  {
    id: "summary-layer",
    term: "Summary Layer",
    definition: {
      en: "A lossy boundary that preserves decisions, findings, and next actions while discarding raw intermediate context.",
      zh: "一种有损边界：保留决策、发现和下一步，同时丢弃原始中间上下文。",
    },
    whyItMatters: {
      en: "It is the difference between delegation that helps and delegation that pollutes the parent context.",
      zh: "它决定委派是帮助主 Agent，还是污染主上下文。",
    },
    sessions: ["s04", "s06"],
  },
  {
    id: "skill",
    term: "Skill",
    definition: {
      en: "A packaged instruction set that can be discovered first and loaded fully only when relevant.",
      zh: "一种可先被发现、只在相关时完整加载的打包说明。",
    },
    whyItMatters: {
      en: "It keeps specialized knowledge available without making every prompt huge.",
      zh: "它让专业知识可用，同时不把每个 prompt 都撑大。",
    },
    sessions: ["s05"],
  },
  {
    id: "plugin",
    term: "Plugin",
    definition: {
      en: "An installable capability bundle that may include skills, hooks, commands, MCP servers, or app integrations.",
      zh: "可安装的能力包，可能包含 skills、hooks、commands、MCP servers 或 app integrations。",
    },
    whyItMatters: {
      en: "It turns local harness features into a shareable extension system.",
      zh: "它把本地 harness 能力变成可共享的扩展系统。",
    },
    sessions: ["s05"],
  },
  {
    id: "mcp",
    term: "MCP",
    aliases: ["Model Context Protocol"],
    definition: {
      en: "A protocol for exposing external tools and resources to model-driven clients.",
      zh: "把外部工具和资源暴露给模型驱动客户端的一种协议。",
    },
    whyItMatters: {
      en: "It makes tool ecosystems portable across clients instead of hard-wired into one app.",
      zh: "它让工具生态可以跨客户端复用，而不是硬编码在某个应用里。",
    },
    sessions: ["s05"],
  },
  {
    id: "hook",
    term: "Hook",
    definition: {
      en: "A lifecycle interception point that runs before, after, or around tools, sessions, or notifications.",
      zh: "在工具、会话或通知之前、之后或周围运行的生命周期拦截点。",
    },
    whyItMatters: {
      en: "Hooks let policy and automation attach to the harness without rewriting the core loop.",
      zh: "Hook 让策略和自动化可以挂到 harness 上，而不用重写核心循环。",
    },
    sessions: ["s05", "s10"],
  },
  {
    id: "context-window",
    term: "Context Window",
    definition: {
      en: "The limited amount of text and structured content that can fit into one model call.",
      zh: "一次模型调用能容纳的文本和结构化内容上限。",
    },
    whyItMatters: {
      en: "Every long-running agent eventually becomes a context management problem.",
      zh: "每个长时间运行的 Agent 最终都会变成上下文管理问题。",
    },
    sessions: ["s06"],
  },
  {
    id: "compaction",
    term: "Compaction",
    definition: {
      en: "Replacing old or bulky context with smaller representations while preserving continuity.",
      zh: "把旧的或庞大的上下文替换成更小表示，同时保留连续性。",
    },
    whyItMatters: {
      en: "It controls token cost and prevents the model from drowning in stale details.",
      zh: "它控制 token 成本，并防止模型淹没在过期细节里。",
    },
    sessions: ["s06"],
  },
  {
    id: "session-memory",
    term: "Session Memory",
    definition: {
      en: "A compact persistent record of what matters across turns or resumed sessions.",
      zh: "跨轮次或恢复会话时保留关键内容的紧凑持久记录。",
    },
    whyItMatters: {
      en: "It helps the agent continue without replaying the entire transcript.",
      zh: "它让 Agent 不必重放完整 transcript 也能继续工作。",
    },
    sessions: ["s06", "s07"],
  },
  {
    id: "task-board",
    term: "Task Board",
    definition: {
      en: "Durable control-plane state that tracks goals, ownership, dependencies, and status.",
      zh: "跟踪目标、所有权、依赖和状态的持久控制平面状态。",
    },
    whyItMatters: {
      en: "It lets long or parallel work survive outside any single model call.",
      zh: "它让长任务或并行工作可以活在任意单次模型调用之外。",
    },
    sessions: ["s07", "s11", "s12"],
  },
  {
    id: "control-plane",
    term: "Control Plane",
    definition: {
      en: "The state and coordination layer that decides what work exists, who owns it, and how progress is recorded.",
      zh: "决定有哪些工作、谁拥有它、进展如何记录的状态与协调层。",
    },
    whyItMatters: {
      en: "It keeps goals stable while execution lanes change or fail.",
      zh: "它让执行通道变化或失败时，目标仍然稳定。",
    },
    sessions: ["s07", "s12"],
  },
  {
    id: "event-log",
    term: "Event Log",
    definition: {
      en: "An append-only record of meaningful state transitions and observations.",
      zh: "以追加方式记录关键状态变化和观察结果的日志。",
    },
    whyItMatters: {
      en: "It supports replay, debugging, audit, and recovery after crashes.",
      zh: "它支撑重放、调试、审计和崩溃恢复。",
    },
    sessions: ["s07", "s08", "s12"],
  },
  {
    id: "background-task",
    term: "Background Task",
    definition: {
      en: "Work that continues outside the foreground agent turn and later reenters through a notification or result.",
      zh: "在前台 Agent 轮次之外继续执行，并通过通知或结果重新进入的工作。",
    },
    whyItMatters: {
      en: "It prevents slow operations from freezing the reasoning loop.",
      zh: "它避免慢操作冻结推理循环。",
    },
    sessions: ["s08"],
  },
  {
    id: "notification",
    term: "Notification",
    definition: {
      en: "A structured signal that tells the agent or UI that external work changed state.",
      zh: "告诉 Agent 或 UI 外部工作状态发生变化的结构化信号。",
    },
    whyItMatters: {
      en: "Without notifications, background work finishes silently and is easy to miss.",
      zh: "没有通知，后台工作会安静地结束，很容易被漏掉。",
    },
    sessions: ["s08"],
  },
  {
    id: "mailbox",
    term: "Mailbox",
    definition: {
      en: "A durable queue or log where agents exchange messages across processes or turns.",
      zh: "Agent 跨进程或跨轮次交换消息的持久队列/日志。",
    },
    whyItMatters: {
      en: "It gives multi-agent systems coordination without requiring shared context.",
      zh: "它让多 Agent 系统无需共享上下文也能协作。",
    },
    sessions: ["s04", "s09", "s10"],
  },
  {
    id: "agent-swarm",
    term: "Agent Swarm",
    definition: {
      en: "A team of agent workers coordinated by shared state, protocols, and supervision.",
      zh: "由共享状态、协议和监督协调的一组 Agent worker。",
    },
    whyItMatters: {
      en: "It is how one assistant becomes multiple bounded work lanes.",
      zh: "它让一个 assistant 变成多个有边界的工作通道。",
    },
    sessions: ["s09", "s11"],
  },
  {
    id: "protocol",
    term: "Protocol",
    definition: {
      en: "A structured message shape and state machine for negotiation between agents or harness components.",
      zh: "Agent 或 harness 组件之间协商用的结构化消息形状与状态机。",
    },
    whyItMatters: {
      en: "It turns team behavior from improvisation into something testable.",
      zh: "它把团队行为从即兴发挥变成可测试机制。",
    },
    sessions: ["s10"],
  },
  {
    id: "lease",
    term: "Lease",
    definition: {
      en: "A time-bounded ownership claim on a task or resource.",
      zh: "对任务或资源的限时所有权声明。",
    },
    whyItMatters: {
      en: "It lets abandoned work become claimable again after a worker disappears.",
      zh: "它让 worker 消失后，被遗弃的工作可以重新被认领。",
    },
    sessions: ["s11"],
  },
  {
    id: "worktree",
    term: "Worktree",
    definition: {
      en: "An isolated checkout or directory lane where one task can modify files without colliding with another lane.",
      zh: "隔离的 checkout 或目录通道，让一个任务可以修改文件而不和另一个通道冲突。",
    },
    whyItMatters: {
      en: "It gives parallel agents filesystem isolation without needing separate repositories.",
      zh: "它让并行 Agent 获得文件系统隔离，而不必复制整个仓库。",
    },
    sessions: ["s12"],
  },
];

export function findGlossaryTerm(id: string) {
  return GLOSSARY_TERMS.find((term) => term.id === id);
}
