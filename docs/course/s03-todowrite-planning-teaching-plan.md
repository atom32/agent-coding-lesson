# S03 TodoWrite / 可见计划 教师授课脚本

面向对象：人工智能专业大三学生

建议时长：60 分钟，可扩展到 120 分钟

课程主题：让 Agent 在多步任务中维持意图。通过 TodoWrite 把计划从不可见推理过程外化为可检查、可更新的状态。

## 课前准备

启动网站：

```powershell
cd D:\learn-agent\agent-coding-lesson
npm run dev
```

推荐打开：

- `http://localhost:3000/zh/s03`
- `http://localhost:3000/zh/slides/s03`
- `http://localhost:3000/zh/advanced/10-context-assembly`
- `http://localhost:3000/zh/advanced/08-agent-swarms`

建议先让学生复习：

- S01：Agentic Loop
- S02：Tool Calling / Dispatch Map

## 教学目标

学生完成本节课后应能：

- 解释为什么多步任务需要显式计划状态。
- 说明 TodoWrite 与普通“让模型先想一想”的区别。
- 读懂 `TodoManager` 的状态结构和校验规则。
- 解释为什么同一时间只允许一个 `in_progress`。
- 说明 reminder 注入如何影响后续模型行为。
- 将 TodoWrite 连接到真实系统中的 context assembly、plan mode 和任务提醒。

## 与前两节的衔接

```text
S01: Agent 能循环行动
S02: Agent 能调用多个结构化工具
S03: Agent 能把多步计划保存为可见状态
```

课堂开场问题：

> 如果让一个 Agent 连续做 10 步重构，它可能在哪些地方失败？

预期答案：

- 忘记已完成的步骤。
- 重复做同一件事。
- 跳过测试或收尾。
- 中途被新的工具结果带偏。
- 用户无法判断它到底在做哪一步。

## 60 分钟课堂节奏

### 0-8 分钟：从“能做事”到“能坚持做完”

回顾 S01/S02：

```text
loop 让模型可以持续行动
tools 让模型可以接触真实世界
```

引出 S03：

```text
planning state 让模型在多步任务中维持意图
```

强调：TodoWrite 不是让模型更聪明，而是让计划变成 harness 可管理的状态。

### 8-18 分钟：为什么内部计划不够

对比两种计划方式：

```text
内部计划：模型在上下文里自己想，用户和工具不可检查
外部计划：TodoWrite 写入结构化状态，用户、开发者、模型都能引用
```

讲清楚三个收益：

- 用户能看到 Agent 打算做什么。
- 开发者能调试 Agent 为什么偏离任务。
- Agent 后续轮次能重新引用计划。

课堂提问：

> 如果计划只存在于模型的一段自然语言输出里，系统能可靠判断哪一步完成了吗？

### 18-32 分钟：拆 TodoManager

打开 `/zh/s03` 的“源码”标签。

讲解顺序：

1. `TodoManager.items` 保存任务数组。
2. 每个 item 有 `id`、`text`、`status`。
3. `status` 只允许 `pending`、`in_progress`、`completed`。
4. 最多 20 个 item。
5. 同一时间最多一个 `in_progress`。
6. `render()` 把状态转成人类和模型都能读的文本。

板书：

```text
Todo item = id + text + status
status = pending | in_progress | completed
```

课堂检查点：

> 为什么 TodoManager 要校验状态，而不是完全相信模型传入的 JSON？

### 32-42 分钟：单一 in_progress 的工程意义

解释约束：

```text
同一时间只允许一个任务处于 in_progress
```

让学生讨论：

- 允许多个 `in_progress` 看起来更灵活。
- 但 LLM 容易在多个未完成目标之间切换，产生半成品。
- 顺序聚焦更适合大多数编码任务。

板书：

```text
多任务并行不是免费能力
LLM 更适合：计划多步，执行聚焦
```

### 42-50 分钟：Reminder 注入

讲 `rounds_since_todo`：

- 如果模型连续几轮没有调用 todo，计数器增加。
- 达到阈值后，harness 注入 `<reminder>Update your todos.</reminder>`。
- reminder 不是用户请求，而是 harness 的行为约束。

课堂提问：

> reminder 应该放进 system prompt、user message，还是 tool_result 附近？不同位置会有什么影响？

引导答案：

- system prompt 太静态，成本高且不适合频繁变化。
- user message 可见但可能混淆用户意图。
- 动态注入到当前上下文中，更适合表达“此刻需要提醒”。

### 50-60 分钟：桥接真实系统

打开 `/zh/advanced/10-context-assembly`。

只讲一个生产问题：

> 真实系统如何决定每一轮给模型看哪些状态？

把 S03 对应到真实系统：

- TodoWrite：计划状态。
- Context Assembly：决定计划、提醒、附件何时进入模型上下文。
- Plan Mode：让规划和执行分阶段。
- Task / Swarm 状态：多人或多 Agent 任务中的共享进度。

总结：

```text
S03 的核心不是 todo list，
而是“把模型容易遗忘的意图变成可管理状态”。
```

## 120 分钟扩展方案

后 60 分钟做编码实训：

1. 给 TodoManager 增加 `blocked` 状态。
2. 增加校验：`completed` 任务不能重新变成 `pending`，除非显式说明原因。
3. 让 reminder 内容包含当前未完成任务摘要。
4. 增加一个 `todo_summary()` 方法，只返回未完成任务。
5. 讨论哪些 todo 应该进入上下文，哪些只保存在状态里。

## 易错点

- 不要把 TodoWrite 讲成普通待办清单。它是 harness 控制平面的一部分。
- 不要把计划和执行混成一段自然语言。计划需要结构化状态。
- 不要让 todo 过细。过细计划会增加上下文负担和更新成本。
- 不要忽略状态迁移规则。状态能不能回退，是工程设计问题。

## 课堂板书

```text
Problem:
long task -> drift, repetition, skipped steps

Solution:
externalize plan into state

Todo state:
id + text + status

Harness responsibilities:
validate todo
render todo
inject reminder
decide when plan enters context
```

