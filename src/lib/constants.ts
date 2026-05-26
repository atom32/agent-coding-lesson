export const VERSION_ORDER = [
  "s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "s11", "s12"
] as const;

export const LEARNING_PATH = VERSION_ORDER;

export type VersionId = typeof LEARNING_PATH[number];

export const VERSION_META: Record<string, {
  title: string;
  subtitle: string;
  coreAddition: string;
  keyInsight: string;
  layer: "tools" | "planning" | "memory" | "concurrency" | "collaboration";
  prevVersion: string | null;
}> = {
  s01: { title: "The Agent Loop", subtitle: "Bash is All You Need", coreAddition: "Single-tool agent loop", keyInsight: "The minimal agent kernel is a while loop + one tool", layer: "tools", prevVersion: null },
  s02: { title: "Tools", subtitle: "One Handler Per Tool", coreAddition: "Tool dispatch map", keyInsight: "The loop stays the same; new tools register into the dispatch map", layer: "tools", prevVersion: "s01" },
  s03: { title: "TodoWrite", subtitle: "Plan Before You Act", coreAddition: "TodoManager + nag reminder", keyInsight: "An agent without a plan drifts; list the steps first, then execute", layer: "planning", prevVersion: "s02" },
  s04: { title: "Subagents", subtitle: "Clean Context Per Subtask", coreAddition: "Subagent spawn with isolated messages[]", keyInsight: "Subagents use independent messages[], keeping the main conversation clean", layer: "planning", prevVersion: "s03" },
  s05: { title: "Skills", subtitle: "Load on Demand", coreAddition: "SkillLoader + two-layer injection", keyInsight: "Inject knowledge via tool_result when needed, not upfront in the system prompt", layer: "planning", prevVersion: "s04" },
  s06: { title: "Compact", subtitle: "Three-Layer Compression", coreAddition: "micro-compact + auto-compact + archival", keyInsight: "Context will fill up; three-layer compression strategy enables infinite sessions", layer: "memory", prevVersion: "s05" },
  s07: { title: "Tasks", subtitle: "Task Graph + Dependencies", coreAddition: "TaskManager with file-based state + dependency graph", keyInsight: "A file-based task graph with ordering, parallelism, and dependencies -- the coordination backbone for multi-agent work", layer: "planning", prevVersion: "s06" },
  s08: { title: "Background Tasks", subtitle: "Background Threads + Notifications", coreAddition: "BackgroundManager + notification queue", keyInsight: "Run slow operations in the background; the agent keeps thinking ahead", layer: "concurrency", prevVersion: "s07" },
  s09: { title: "Agent Teams", subtitle: "Teammates + Mailboxes", coreAddition: "TeammateManager + file-based mailbox", keyInsight: "When one agent can't finish, delegate to persistent teammates via async mailboxes", layer: "collaboration", prevVersion: "s08" },
  s10: { title: "Team Protocols", subtitle: "Shared Communication Rules", coreAddition: "request_id correlation for two protocols", keyInsight: "One request-response pattern drives all team negotiation", layer: "collaboration", prevVersion: "s09" },
  s11: { title: "Autonomous Agents", subtitle: "Scan Board, Claim Tasks", coreAddition: "Task board polling + timeout-based self-governance", keyInsight: "Teammates scan the board and claim tasks themselves; no need for the lead to assign each one", layer: "collaboration", prevVersion: "s10" },
  s12: { title: "Worktree + Task Isolation", subtitle: "Isolate by Directory", coreAddition: "Composable worktree lifecycle + event stream over a shared task board", keyInsight: "Each works in its own directory; tasks manage goals, worktrees manage directories, bound by ID", layer: "collaboration", prevVersion: "s11" },
};

export const LAYERS = [
  { id: "tools" as const, label: "Tools & Execution", color: "#3B82F6", versions: ["s01", "s02"] },
  { id: "planning" as const, label: "Planning & Coordination", color: "#10B981", versions: ["s03", "s04", "s05", "s07"] },
  { id: "memory" as const, label: "Memory Management", color: "#8B5CF6", versions: ["s06"] },
  { id: "concurrency" as const, label: "Concurrency", color: "#F59E0B", versions: ["s08"] },
  { id: "collaboration" as const, label: "Collaboration", color: "#EF4444", versions: ["s09", "s10", "s11", "s12"] },
] as const;

export const VERSION_META_ZH: Record<string, Partial<(typeof VERSION_META)[string]>> = {
  s01: {
    subtitle: "Bash 就够了",
    coreAddition: "单工具 Agent 循环",
    keyInsight: "最小 Agent 内核就是一个 while 循环加一个工具",
  },
  s02: {
    subtitle: "每个工具一个 Handler",
    coreAddition: "工具分发表",
    keyInsight: "循环保持不变，新工具只需要注册进 dispatch map",
  },
  s03: {
    subtitle: "先计划，再行动",
    coreAddition: "TodoManager + 提醒机制",
    keyInsight: "没有计划的 Agent 会漂移；先列步骤，再执行",
  },
  s04: {
    subtitle: "每个子任务都有干净上下文",
    coreAddition: "带独立 messages[] 的子 Agent",
    keyInsight: "子 Agent 使用独立 messages[]，避免污染主对话",
  },
  s05: {
    subtitle: "按需加载知识",
    coreAddition: "SkillLoader + 两层注入",
    keyInsight: "需要时通过 tool_result 注入知识，而不是提前塞进 system prompt",
  },
  s06: {
    subtitle: "三层上下文压缩",
    coreAddition: "微压缩 + 自动压缩 + 归档",
    keyInsight: "上下文总会满；分层压缩让会话可以持续工作",
  },
  s07: {
    subtitle: "任务图 + 依赖",
    coreAddition: "文件状态任务管理器 + 依赖图",
    keyInsight: "文件化任务图是多 Agent 协作的协调骨架",
  },
  s08: {
    subtitle: "后台线程 + 通知",
    coreAddition: "BackgroundManager + 通知队列",
    keyInsight: "慢操作放到后台，Agent 可以继续思考下一步",
  },
  s09: {
    subtitle: "队友 + 邮箱",
    coreAddition: "TeammateManager + 文件邮箱",
    keyInsight: "一个 Agent 不够时，把任务委派给通过异步邮箱协作的持久队友",
  },
  s10: {
    subtitle: "统一通信规则",
    coreAddition: "带 request_id 关联的两种协议",
    keyInsight: "同一种 request-response 形状可以驱动所有团队协商",
  },
  s11: {
    subtitle: "扫描任务板，自主认领",
    coreAddition: "任务板轮询 + 基于超时的自治",
    keyInsight: "队友自己扫描任务并认领，不需要领导逐个分配",
  },
  s12: {
    subtitle: "按目录隔离执行",
    coreAddition: "任务板上的 worktree 生命周期与事件流",
    keyInsight: "每个任务在自己的目录里工作；任务管理目标，worktree 管理执行环境",
  },
};

export function getVersionMeta(version: string, locale?: string) {
  const base = VERSION_META[version];
  if (locale !== "zh") return base;
  return { ...base, ...VERSION_META_ZH[version] };
}
