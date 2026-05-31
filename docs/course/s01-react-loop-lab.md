# S01 ReAct / Agentic Loop 学生实验任务单

本实验围绕 `s01` 的最小 Agent 循环展开。目标不是实现完整 Claude Code，而是看清楚一个智能体最小可运行结构。

## 实验目标

完成后你应该能够：

- 解释 `messages` 在 agentic loop 中的作用。
- 指出模型生成 `tool_use` 后，harness 做了哪些事。
- 修改循环控制逻辑，避免 Agent 无限执行工具。
- 把工具失败作为 observation 返回给模型。

## 实验入口

打开网站：

- `/zh/s01`
- `/zh/slides/s01`
- `/zh/advanced/01-query-engine`

在 `/zh/s01` 中依次查看：

1. 学习
2. 模拟
3. 源码
4. 生产桥接

## 任务 1：标注 ReAct 三阶段

阅读 s01 源码，完成下表：

| ReAct 阶段 | 代码位置 | 说明 |
|---|---|---|
| Reason |  | 模型在这里决定下一步行动 |
| Act |  | harness 在这里执行工具 |
| Observe |  | 工具结果在这里回到 messages |

检查问题：

- Reason 是否一定等于显式思维链？
- Observe 为什么必须进入下一轮模型调用？

## 任务 2：观察 messages 增长

在模拟器中逐步播放 s01 场景，记录每一步后 messages 中新增的内容：

| 步骤 | 新增消息类型 | 新增内容摘要 | 下一轮模型会看到吗 |
|---|---|---|---|
| 1 | user |  |  |
| 2 | assistant/tool_use |  |  |
| 3 | tool_result |  |  |
| 4 | assistant/tool_use |  |  |
| 5 | tool_result |  |  |
| 6 | assistant/end_turn |  |  |

思考：

- 如果删除一次 `tool_result`，下一轮模型会缺少什么信息？
- 如果 `tool_result` 非常长，会带来什么问题？

## 任务 3：增加 max_rounds

给 s01 的 agent loop 增加最大轮数限制，例如：

```python
def agent_loop(task, max_rounds=8):
    rounds = 0
    while rounds < max_rounds:
        rounds += 1
        ...
```

要求：

- 到达最大轮数时停止循环。
- 返回一个清晰的错误或终止消息。
- 不要让模型无限调用工具。

验收问题：

- 为什么最大轮数限制属于 harness，而不是模型自己负责？
- 如果 max_rounds 太小，会影响什么？
- 如果 max_rounds 太大，会带来什么风险？

## 任务 4：把工具失败写回 tool_result

修改 bash 工具执行逻辑，使失败也能作为 observation 返回给模型。

建议返回结构：

```text
exit_code: 1
stdout: ...
stderr: ...
```

要求：

- 命令执行成功时，正常返回 stdout。
- 命令执行失败时，不要直接让程序崩溃。
- 把失败信息作为 `tool_result` 追加回 messages。

验收问题：

- 工具失败后，模型是否有机会自我修复？
- 什么错误应该返回给模型，什么错误应该直接停止执行？

## 任务 5：连接真实系统

阅读 `/zh/advanced/01-query-engine` 的开头部分，只回答一个问题：

> 教学版 s01 循环进入真实系统后，至少需要补上哪些生产责任？

至少写出 3 项：

- 
- 
- 

参考方向：

- streaming
- retry
- token budget
- model fallback
- message normalization
- permission boundary

## 提交内容

提交一份简短实验报告，包含：

- ReAct 三阶段标注表。
- max_rounds 修改说明。
- 工具失败处理说明。
- 你认为 s01 与真实 QueryEngine 最大的三个差距。

## 评分建议

| 项目 | 分值 |
|---|---:|
| 能准确解释 ReAct 三阶段 | 20 |
| 能指出代码中的 loop、tool_use、tool_result | 20 |
| max_rounds 实现合理 | 20 |
| 工具失败处理合理 | 20 |
| 能连接到真实 QueryEngine 的生产复杂度 | 20 |

