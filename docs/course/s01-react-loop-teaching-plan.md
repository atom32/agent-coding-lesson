# S01 ReAct / Agentic Loop 教师授课脚本

面向对象：人工智能专业大三学生

建议时长：60 分钟，可扩展到 120 分钟

课程主题：理解 ReAct loop / agentic loop，并通过一个最小代码项目拆解智能体的基本结构。

## 课前准备

启动网站：

```powershell
cd D:\learn-agent\agent-coding-lesson
npm run dev
```

推荐打开：

- `http://localhost:3000/zh/curriculum`
- `http://localhost:3000/zh/s01`
- `http://localhost:3000/zh/slides/s01`
- `http://localhost:3000/zh/advanced/01-query-engine`

## 教学目标

学生完成本节课后应能：

- 用自己的话解释 ReAct 的 Reason、Act、Observe 三个阶段。
- 说明 agentic loop 与普通单次 LLM 调用的区别。
- 在 s01 源码中指出模型调用、工具调用、tool_result 追加和循环退出的位置。
- 解释 harness 在智能体系统中的职责：组织消息、执行工具、回写观察结果、决定是否继续循环。
- 说出教学版 agent loop 与真实 QueryEngine 之间的差距。

## 60 分钟课堂节奏

### 0-5 分钟：设定问题

打开 `/zh/curriculum`，先给出本节课的核心问题：

> 一个语言模型为什么不是天然的 Agent？它缺少什么结构，才能从“回答问题”变成“持续行动”？

引导学生区分：

- 模型：负责生成下一步意图。
- 工具：负责对真实环境产生作用。
- Harness：负责把模型和工具连接成可循环执行的系统。

### 5-15 分钟：讲 ReAct / Agentic Loop

打开 `/zh/slides/s01`，讲清楚循环结构：

```text
Reason -> Act -> Observe -> Reason ...
```

对应到代码 Agent：

```text
messages -> model call -> tool_use -> execute tool -> tool_result -> messages
```

强调两点：

- Reason 不一定需要展示为显式思维链；课堂上关注的是模型选择下一步行动的结果。
- Observe 不是自然语言总结，而是结构化的 tool_result，会影响下一次模型调用。

课堂提问：

> 如果工具执行失败，下一轮 Reason 会看到什么？如果 tool_result 格式很差，会发生什么？

### 15-30 分钟：拆 s01 源码

打开 `/zh/s01` 的“源码”标签。

按照数据流读代码，不按文件顺序逐行读：

1. 用户输入如何进入 `messages`。
2. `agent_loop` 如何调用模型。
3. 如何判断模型是否返回 `tool_use`。
4. Bash 工具如何执行。
5. `tool_result` 如何追加回 `messages`。
6. 什么条件下循环结束。

板书或口头总结：

```text
LLM 只负责“决定下一步”
Harness 负责“执行下一步并保存观察”
循环让一次调用变成持续行动
```

课堂检查点：

> 请在代码里标出 Reason、Act、Observe 三个阶段分别对应哪几行或哪几个函数。

### 30-40 分钟：用模拟器观察 messages 增长

打开 `/zh/s01` 的“模拟”标签。

逐步播放，不要自动快速播放。每一步都追问：

- 当前 messages 里新增了什么？
- 新增内容是 user、assistant、tool_call 还是 tool_result？
- 下一次模型调用会看到哪些历史？
- 如果没有把 tool_result 放回 messages，循环还能继续吗？

重点让学生看到：Agent 的“记忆”首先来自消息历史，而不是某种神秘能力。

### 40-50 分钟：桥接到真实系统

打开 `/zh/s01` 的“生产桥接”，再进入 `/zh/advanced/01-query-engine`。

只讲高级文档中的一个问题：

> 教学版 while loop 到真实 QueryEngine 之间增加了哪些生产责任？

归纳为五类：

- Streaming：边生成边处理，降低等待感。
- Budget：控制 token 和工具结果大小。
- Retry：处理网络和 API 失败。
- Fallback：模型不可用时降级。
- Message normalization：保证发给 API 的消息满足协议要求。

不要展开高级文档全部内容；本节课只让学生知道真实系统会把简单循环变成状态机。

### 50-60 分钟：课堂练习说明

布置课堂小练习：

1. 给 s01 的循环加 `max_rounds`，避免无限调用工具。
2. 当 bash 返回非零退出码时，把错误也作为 tool_result 放回 messages。
3. 在每轮循环前打印当前 messages 长度。

验收问题：

- 为什么 `max_rounds` 是 harness 的责任？
- 错误应该作为异常中断，还是作为 observation 回给模型？
- messages 变长会带来什么问题？

## 120 分钟扩展方案

前 60 分钟按上面执行。后 60 分钟增加：

- 20 分钟：进入 s02，讲工具从单个 bash 变成 dispatch map。
- 20 分钟：让学生实现一个只读工具，例如 `read_file(path)`。
- 20 分钟：讨论 schema、权限和错误返回格式。

扩展后的主线：

```text
s01: 循环让模型成为 Agent
s02: 工具协议让 Agent 接触真实世界
s03: 可见计划让 Agent 维持多步意图
s06: 上下文管理让 Agent 能处理长任务
```

## 易错点

- 不要把 ReAct 讲成必须暴露完整思维链。课堂关注可观察的行动轨迹。
- 不要把 tool calling 讲成普通函数调用。它是模型与 harness 之间的协议。
- 不要让学生误以为 Agent 能力主要来自 prompt。prompt 重要，但本节重点是运行时结构。
- 不要一开始就展开所有高级章节。s01 只对接 QueryEngine 即可。

## 课堂板书

```text
Agent = Model + Harness + Tools + State

ReAct in code:
Reason  = model chooses next action
Act     = harness executes tool_use
Observe = harness appends tool_result

Loop stops when:
stop_reason != tool_use
or max_rounds reached
or policy/error boundary stops execution
```

