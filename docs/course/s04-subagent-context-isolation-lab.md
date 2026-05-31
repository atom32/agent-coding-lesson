# S04 Subagent / 上下文隔离 学生实验任务单

本实验承接 S01-S03。你已经看到 Agent 可以循环行动、调用工具、维护计划。S04 要解决的问题是：当某个子任务会产生大量中间信息时，如何把它委派出去，同时保护主对话上下文。

## 实验目标

完成后你应该能够：

- 解释父 Agent 与子 Agent 的上下文边界。
- 读懂 `task` 工具如何启动子 Agent。
- 说明为什么子 Agent 不应该继承完整父历史。
- 设计工具过滤规则，限制不同子 Agent 的权限。
- 设计结构化 summary，让父 Agent 能继续决策。

## 实验入口

打开网站：

- `/zh/s04`
- `/zh/slides/s04`
- `/zh/advanced/03-coordinator`
- `/zh/advanced/08-agent-swarms`

建议先复习：

- `/zh/s01`
- `/zh/s02`
- `/zh/s03`

## 任务 1：画出父子 Agent 数据流

阅读 s04 源码，补全流程：

```text
Parent model emits tool_use(task)
  -> run_subagent(prompt)
  -> sub_messages = ?
  -> child loop executes tools
  -> child final text
  -> parent receives tool_result
```

回答：

- 子 Agent 的 `messages` 初始内容是什么？
- 子 Agent 能否看到父 Agent 的完整 messages？
- 子 Agent 的中间工具调用会不会全部进入父 Agent 上下文？

## 任务 2：比较共享上下文与隔离上下文

完成下表：

| 方案 | 好处 | 风险 |
|---|---|---|
| 子 Agent 继承父 Agent 全部 messages |  |  |
| 子 Agent 使用 fresh messages |  |  |
| 子 Agent 只继承父 Agent 摘要 |  |  |

思考：

- 哪种方案最节省 token？
- 哪种方案最不容易丢失背景？
- 实际系统中是否可以混合使用？

## 任务 3：增加 task_type

为 `task` 工具增加一个参数：

```json
{
  "prompt": "string",
  "description": "string",
  "task_type": "explore | write"
}
```

要求：

- `explore` 子 Agent 只能读，不能写。
- `write` 子 Agent 可以使用写工具。
- 未提供 `task_type` 时默认为 `explore`。

建议工具集合：

```text
explore tools = bash + read_file
write tools = bash + read_file + write_file + edit_file
```

验收问题：

- 为什么探索型任务不应该默认拥有写权限？
- bash 是否一定是只读工具？为什么？

## 任务 4：禁止递归委派

确认子 Agent 的工具集合里没有 `task`。

回答：

- 如果子 Agent 也能调用 `task`，可能出现什么问题？
- 是否可以允许递归委派但限制深度？这样做的复杂度在哪里？

设计一个错误信息：

```text
Error: subagents cannot spawn subagents
```

思考：

- 这个错误应该返回给子 Agent，还是直接由父 Agent 处理？

## 任务 5：设计结构化 summary

让子 Agent 返回更适合父 Agent 使用的摘要格式。

建议格式：

```json
{
  "summary": "...",
  "findings": ["..."],
  "files_touched": ["..."],
  "risks": ["..."],
  "next_steps": ["..."]
}
```

要求：

- `explore` 任务的 `files_touched` 应为空。
- 如果发现风险，必须写入 `risks`。
- 不要把所有中间日志塞回 summary。

验收问题：

- 父 Agent 最需要哪些信息继续工作？
- 哪些子 Agent 中间细节应该丢弃？

## 任务 6：增加子任务日志

为每次 `task` 调用写入一行 JSONL 日志：

```json
{"task_id":"...","description":"...","task_type":"explore","status":"started"}
{"task_id":"...","description":"...","task_type":"explore","status":"completed"}
```

要求：

- 每个子任务有唯一 `task_id`。
- 记录 started / completed / failed。
- 不需要记录完整 messages。

思考：

- 为什么日志属于父 Agent 可审计状态？
- 为什么不应该把子 Agent 完整上下文全部写回父 messages？

## 任务 7：连接真实系统

阅读 `/zh/advanced/03-coordinator` 或 `/zh/advanced/08-agent-swarms` 的开头部分，回答：

> 教学版 `run_subagent()` 进入真实系统后，至少需要补上哪些能力？

至少写出 4 项：

- 
- 
- 
- 

参考方向：

- worker backend
- supervision
- permission delegation
- task records
- completion notification
- identity
- cancellation

## 提交内容

提交一份简短实验报告，包含：

- 父子 Agent 数据流图。
- `task_type` 和工具过滤设计。
- 递归委派限制说明。
- 结构化 summary 示例。
- 子任务 JSONL 日志示例。
- 你认为教学版 subagent 与真实 Coordinator / Agent Swarm 最大的三个差距。

## 评分建议

| 项目 | 分值 |
|---|---:|
| 能解释上下文隔离意义 | 20 |
| 能读懂 task -> run_subagent 数据流 | 20 |
| 工具过滤设计合理 | 20 |
| summary 边界设计合理 | 20 |
| 能连接到真实 Coordinator / Swarm | 20 |

