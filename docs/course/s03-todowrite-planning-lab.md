# S03 TodoWrite / 可见计划 学生实验任务单

本实验承接 S01 和 S02。S01 让 Agent 能循环行动，S02 让 Agent 能调用多个工具；S03 要解决的问题是：多步任务中，Agent 如何维持计划、进度和意图。

## 实验目标

完成后你应该能够：

- 解释为什么计划应该成为结构化状态。
- 读懂 TodoManager 的校验逻辑。
- 修改 todo 状态机，增加新的状态或规则。
- 解释 reminder 注入如何影响模型后续行为。
- 将 TodoWrite 与真实系统中的 context assembly 联系起来。

## 实验入口

打开网站：

- `/zh/s03`
- `/zh/slides/s03`
- `/zh/advanced/10-context-assembly`

建议先复习：

- `/zh/s01`
- `/zh/s02`

## 任务 1：画出 TodoWrite 数据流

阅读 s03 源码，补全数据流：

```text
model emits tool_use(todo)
  -> TODO.update(items)
  -> validate items
  -> TODO.items = validated
  -> TODO.render()
  -> tool_result
  -> messages
```

回答：

- Todo 状态保存在哪里？
- Todo 结果如何返回给模型？
- 用户如何观察 Agent 的计划？

## 任务 2：分析 Todo item 结构

完成下表：

| 字段 | 类型 | 作用 | 如果缺失会怎样 |
|---|---|---|---|
| id |  |  |  |
| text |  |  |  |
| status |  |  |  |

当前允许的 status：

```text
pending
in_progress
completed
```

思考：

- 为什么不能让 status 是任意字符串？
- 为什么 `text` 不能为空？

## 任务 3：增加 blocked 状态

给 TodoManager 增加一个新状态：

```text
blocked
```

含义：任务暂时无法继续，需要用户输入、权限、依赖或外部信息。

要求：

- `status` 校验允许 `blocked`。
- `render()` 能显示 blocked，例如 `[!]`。
- 同一时间仍然最多只有一个 `in_progress`。
- blocked 不计入 completed。

示例渲染：

```text
[x] #1: Create project structure
[!] #2: Get API key from user
[ ] #3: Add integration test

(1/3 completed)
```

验收问题：

- blocked 与 pending 有什么区别？
- blocked 是否应该触发用户提问？

## 任务 4：改进 reminder

当前 reminder 只是提醒模型更新 todo。请把 reminder 改成包含未完成任务摘要。

示例：

```text
<reminder>
Update your todos. Unfinished tasks:
- #2 Implement divide
- #3 Add error handling
</reminder>
```

要求：

- 只列出 `pending`、`in_progress`、`blocked`。
- 不列出 `completed`。
- 如果没有 todo，不注入任务摘要。

思考：

- reminder 太长会有什么问题？
- reminder 应该每轮都注入吗？

## 任务 5：设计状态迁移规则

为 TodoWrite 设计状态迁移表：

| from | to | 是否允许 | 原因 |
|---|---|---|---|
| pending | in_progress |  |  |
| in_progress | completed |  |  |
| in_progress | blocked |  |  |
| completed | pending |  |  |
| blocked | in_progress |  |  |

思考：

- 已完成任务能不能回退？
- 如果允许回退，是否需要记录原因？

## 任务 6：连接真实系统

阅读 `/zh/advanced/10-context-assembly` 的开头部分，回答：

> 真实系统为什么需要决定“哪些状态进入本轮上下文”？

至少写出 3 个原因：

- 
- 
- 

参考方向：

- 上下文窗口有限。
- 状态太多会干扰模型。
- 某些提醒只在特定轮次有意义。
- 不同模式下需要不同上下文。

## 提交内容

提交一份简短实验报告，包含：

- TodoWrite 数据流图。
- `blocked` 状态实现说明。
- reminder 改进说明。
- 状态迁移表。
- 你认为 TodoWrite 与真实 Context Assembly 最大的三个差距。

## 评分建议

| 项目 | 分值 |
|---|---:|
| 能解释计划状态外化的意义 | 20 |
| 能读懂 TodoManager 校验逻辑 | 20 |
| blocked 状态设计合理 | 20 |
| reminder 改进合理 | 20 |
| 能连接到真实 Context Assembly | 20 |

