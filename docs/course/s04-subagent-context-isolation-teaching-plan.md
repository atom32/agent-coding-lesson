# S04 Subagent / 上下文隔离 教师授课脚本

面向对象：人工智能专业大三学生

建议时长：60 分钟，可扩展到 120 分钟

课程主题：通过子 Agent 学习上下文隔离、任务委派、工具过滤和摘要边界。让学生理解多 Agent 不是简单“多开几个模型”，而是对上下文、权限和生命周期的工程管理。

## 课前准备

启动网站：

```powershell
cd D:\learn-agent\agent-coding-lesson
npm run dev
```

推荐打开：

- `http://localhost:3000/zh/s04`
- `http://localhost:3000/zh/slides/s04`
- `http://localhost:3000/zh/advanced/03-coordinator`
- `http://localhost:3000/zh/advanced/08-agent-swarms`

建议先复习：

- S01：Agentic Loop
- S02：Tool Calling
- S03：TodoWrite / 可见计划

## 教学目标

学生完成本节课后应能：

- 解释为什么长任务需要上下文隔离。
- 说明父 Agent 与子 Agent 的 messages 为什么不应该直接共享。
- 读懂 `task` 工具如何启动子 Agent。
- 解释子 Agent 为什么不能继续调用 `task` 生成孙 Agent。
- 说明“summary-only return”如何保护父上下文。
- 将教学版 subagent 连接到真实系统中的 coordinator、worker backend 和 Agent Swarm。

## 与前三节的衔接

```text
S01: 单个 Agent 能循环行动
S02: 单个 Agent 能调用多个工具
S03: 单个 Agent 能维护计划状态
S04: Agent 能把子任务委派给隔离上下文中的子 Agent
```

课堂开场问题：

> 如果父 Agent 让另一个 Agent 去“阅读所有测试文件并总结测试框架”，子 Agent 是否需要看到父 Agent 的全部历史对话？

预期答案：

- 不需要全部历史。
- 需要任务描述、系统约束和必要工具。
- 父上下文太长会浪费 token，并干扰子任务。

## 60 分钟课堂节奏

### 0-8 分钟：从计划到委派

复盘 S03：

```text
TodoWrite 把多步计划变成可见状态
```

引出 S04：

```text
当某个子任务会产生大量中间信息时，不应该把所有细节塞回主对话。
```

强调：子 Agent 的价值首先是上下文隔离，其次才是并行或分工。

### 8-18 分钟：为什么要 fresh messages

打开 `/zh/slides/s04`。

讲父 Agent 和子 Agent 的上下文差异：

```text
Parent messages = 用户目标、计划、主线决策、最终结果
Subagent messages = 子任务描述、子任务工具调用、子任务观察结果
```

说明：

- 子 Agent 不继承父 Agent 的完整对话。
- 子 Agent 共享文件系统和工具，但不共享消息历史。
- 子 Agent 完成后只把摘要返回给父 Agent。

课堂提问：

> 如果子 Agent 继承父 Agent 的全部 messages，会有什么坏处？

预期答案：

- token 浪费。
- 子任务注意力被无关信息干扰。
- 子 Agent 自己产生的工具结果没有空间。
- 父 Agent 的隐含决策可能误导子 Agent。

### 18-34 分钟：拆 `run_subagent`

打开 `/zh/s04` 的“源码”标签。

讲解顺序：

1. 父 Agent 拥有 `task` 工具。
2. `task` 工具调用 `run_subagent(prompt)`。
3. `run_subagent` 创建新的 `sub_messages`。
4. 子 Agent 使用 `CHILD_TOOLS`，不包含 `task`。
5. 子 Agent 独立循环调用工具。
6. 子 Agent 结束后，只返回最终文本摘要。
7. 父 Agent 把摘要作为普通 `tool_result` 接收。

板书：

```text
task(prompt) -> run_subagent(prompt)
sub_messages = [{"role": "user", "content": prompt}]
child loop -> final summary -> parent tool_result
```

课堂检查点：

> 子 Agent 跑了 30 轮工具调用，父 Agent 的 messages 增加了多少？

预期答案：

> 通常只增加一条 task 的 tool_result。中间过程被压缩在子 Agent 的上下文里，完成后丢弃。

### 34-44 分钟：工具过滤与递归限制

讲两个关键约束：

```text
子 Agent 没有 task 工具
不同类型子 Agent 可以拿到不同工具集合
```

讨论：

- 如果子 Agent 还能创建子 Agent，可能出现无限委派。
- 如果探索型子 Agent 有写权限，可能在搜索过程中误改文件。
- 工具过滤是最小权限原则的一种实现。

板书：

```text
Parent tools = base tools + task
Child tools = base tools
Explore child tools = read-only tools
```

课堂提问：

> “查找某函数所有调用位置”的子 Agent 需要 write_file 吗？

### 44-52 分钟：summary-only return

讲摘要边界：

```text
子 Agent 内部可以产生大量工具结果，
但父 Agent 只需要“结论、证据、下一步建议”。
```

给出一个好的子 Agent 返回格式：

```text
结论：项目使用 pytest。
证据：tests/test_calc.py 中存在 pytest 风格断言。
相关文件：tests/test_calc.py, pyproject.toml。
建议：后续新增测试应沿用 pytest。
```

强调：摘要不是随便压缩，而是父 Agent 后续决策需要的信息边界。

### 52-60 分钟：桥接真实系统

打开 `/zh/advanced/03-coordinator` 或 `/zh/advanced/08-agent-swarms`。

只讲一个生产问题：

> 教学版 run_subagent 进入真实系统后，需要补哪些工程能力？

归纳：

- worker backend：tmux、iTerm2、进程内 worker。
- supervision：启动、停止、超时、失败恢复。
- identity：知道哪个 worker 做了什么。
- permission delegation：子 Agent 的权限不能默认等于父 Agent。
- task record：子任务需要可追踪。
- completion notification：子 Agent 完成后要可靠通知父 Agent。

## 120 分钟扩展方案

后 60 分钟做编码实训：

1. 增加 `task_type`：`explore` / `write`。
2. `explore` 子 Agent 只能使用 read-only tools。
3. 给 `run_subagent` 增加 `max_rounds` 和超时错误。
4. 让子 Agent 返回结构化 summary：`findings`、`files`、`risks`、`next_steps`。
5. 给每次子任务写入 JSONL 日志，便于父 Agent 审计。

## 易错点

- 不要把子 Agent 讲成“另一个聊天窗口”。它是有边界的执行上下文。
- 不要让子 Agent 继承全部父历史。上下文隔离是本节核心。
- 不要让子 Agent 无限递归生成下一层子 Agent。
- 不要只返回“完成了”。父 Agent 需要结论、证据和后续建议。
- 不要默认子 Agent 拥有全部权限。委派应该伴随权限收缩。

## 课堂板书

```text
Delegation = context isolation + summary boundary + lifecycle control

Parent:
messages = main task history
tools = base + task

Subagent:
messages = fresh
tools = filtered
return = summary only

Production adds:
backend + supervision + identity + permissions + task records
```

