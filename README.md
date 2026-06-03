# Agent Coding Lesson - 智能体编程课程

一个双层 Web 课程，用于学习编码智能体（coding-agent）的驾驭工程。

本课程结合两种教学材料：

- **实验课程**来自 `learn-claude-code`：12 个可运行的最小化 Python 实现，逐个机制构建智能体驾驭系统。
- **生产级解剖**来自 `claude-reviews-claude`：更深入的 Claude Code 子系统阅读材料，呈现为站内高级章节。

课程图谱将每个玩具机制连接到它为你准备理解的真实子系统。

## 课程概述

本课程采用"双层桥接"教学法：

1. **基础层（实验室课程）**：通过最小化的 Python 代码实现，逐个掌握智能体核心机制
2. **高级层（生产解剖）**：理解真实 Claude Code 系统中对应机制的工程实现

### 12 个实验课程

- **S01**：ReAct / Agentic Loop - 理解智能体的基本循环结构
- **S02**：Tool Calling - 工具调用、分发映射和工具契约
- **S03**：TodoWrite - 可见规划状态和任务管理
- **S04**：Subagent - 子智能体、上下文隔离和委托边界
- **S05**：Skill Loading - 技能加载和动态扩展
- **S06**：Context Compact - 上下文压缩和长任务处理
- **S07**：Task System - 任务系统和状态管理
- **S08**：Background Tasks - 后台任务和异步执行
- **S09**：Agent Teams - 智能体团队协作
- **S10**：Team Protocols - 团队协议和通信
- **S11**：Autonomous Agents - 自主智能体
- **S12**：Worktree Task Isolation - 工作树任务隔离

## 致谢

本项目参考并基于两个开源仓库的材料：

- [`shareAI-lab/learn-claude-code`](https://github.com/shareAI-lab/learn-claude-code)，提供初学者友好的 Claude Code 学习课程和可运行示例。
- [`openedclaude/claude-reviews-claude`](https://github.com/openedclaude/claude-reviews-claude)，提供用作高级阅读层的 Claude Code 架构评审文档。

感谢这两个项目的维护者和贡献者提供这些学习资源。

## 快速开始

```bash
npm install
npm run dev
```

打开浏览器访问：

- 中文课程：`http://localhost:3000/zh/curriculum`
- 英文课程：`http://localhost:3000/en/curriculum`

## 构建

```bash
npm run build
npm run start
```

`npm run dev` 和 `npm run build` 都会先运行 `npm run extract`。提取脚本从 `resources/` 读取捆绑的源材料并生成：

- `src/data/generated/versions.json` - 版本信息
- `src/data/generated/docs.json` - 基础课程文档
- `src/data/generated/advanced-docs.json` - 高级课程文档
- `public/advanced-assets/*` - 高级课程资源文件

## 仓库结构

```text
resources/
  learn-claude-code/
    agents/          # 最小化 Python 课程实现（12个示例智能体）
    docs/            # 初学者课程 Markdown 文档
  claude-reviews-claude/
    docs/            # 高级 Claude Code 架构 Markdown/资源

src/
  app/               # Next.js 应用路由（支持多语言）
  components/        # UI 组件、可视化、课程桥接组件
  data/              # 生成数据、映射、场景、幻灯片数据
  i18n/messages/     # 英语、中文、日语 UI 字符串
```

## 主要路由

- `/zh/curriculum` 和 `/en/curriculum`：双层课程图谱
- `/zh/s01` 至 `/zh/s12`：基础实验课程页面
- `/zh/advanced/01-query-engine`：高级生产章节页面
- `/zh/slides/s01`：每节课的幻灯片视图

## 教学材料

`docs/course/` 文件夹包含前四个实践课程的课堂就绪材料：

### S01 - ReAct / Agentic Loop
- `s01-react-loop-teaching-plan.md`：教师授课脚本（60-120分钟）
- `s01-react-loop-lab.md`：学生实验手册，包含编码任务和评估检查点

### S02 - Tool Calling
- `s02-tool-calling-teaching-plan.md`：工具调用、分发映射和工具契约的教师脚本
- `s02-tool-calling-lab.md`：设计和连接新工具的学生实验手册

### S03 - TodoWrite Planning
- `s03-todowrite-planning-teaching-plan.md`：可见规划状态和 TodoWrite 的教师脚本
- `s03-todowrite-planning-lab.md`：扩展 todo 状态和提醒注入的学生实验手册

### S04 - Subagent Context Isolation
- `s04-subagent-context-isolation-teaching-plan.md`：子智能体、上下文隔离和委托边界的教师脚本
- `s04-subagent-context-isolation-lab.md`：任务类型、工具过滤和结构化子智能体摘要的学生实验手册

## 技术栈

- **框架**：Next.js 16.1.6（React 19.2.3）
- **样式**：Tailwind CSS 4
- **动画**：Framer Motion 12.34.0
- **图标**：Lucide React 0.564.0
- **Markdown 处理**：Unified + Remark + Rehype
- **语言**：TypeScript 5
- **工具**：tsx（用于内容提取脚本）

## 学习路径建议

1. **初学者路径**：从 S01 开始，按顺序完成所有实验课程
2. **快速上手**：查看 `/zh/curriculum` 课程图谱，选择感兴趣的主题
3. **深度学习**：完成每个基础课程后，阅读对应的"生产桥接"高级章节
4. **实践教学**：使用 `docs/course/` 中的教学材料进行课堂教学或自学

## 课程特色

- **理论与实践结合**：每个机制都有可运行的代码示例
- **渐进式学习**：从简单的循环开始，逐步构建复杂系统
- **生产桥接**：理解教学代码与真实系统之间的差距
- **交互式演示**：内置模拟器观察智能体内部状态变化
- **多语言支持**：中文、英文、日语界面

## 说明

本仓库旨在独立运行。不需要同时检出 `learn-claude-code` 或 `claude-reviews-claude`，因为所需的课程资源已包含在 `resources/` 下。

## 许可

本项目遵循原项目的许可协议。详见各子项目的许可文件。
