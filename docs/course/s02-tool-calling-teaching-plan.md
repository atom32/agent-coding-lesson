# S02 Tool Calling / Dispatch Map 教师授课脚本

面向对象：人工智能专业大三学生

建议时长：60 分钟，可扩展到 120 分钟

课程主题：从一个 bash 工具升级到多个结构化工具，理解 tool calling、schema、dispatch map 和工具契约。

## 课前准备

启动网站：

```powershell
cd D:\learn-agent\agent-coding-lesson
npm run dev
```

推荐打开：

- `http://localhost:3000/zh/s01`
- `http://localhost:3000/zh/s02`
- `http://localhost:3000/zh/slides/s02`
- `http://localhost:3000/zh/advanced/02-tool-system`
- `http://localhost:3000/zh/advanced/07-permission-pipeline`

## 教学目标

学生完成本节课后应能：

- 解释 tool calling 为什么是 Agent 接触真实世界的边界。
- 说明单一 bash 工具与结构化工具集合的差异。
- 读懂 dispatch map：从 tool name 找到对应 handler。
- 为一个新工具设计输入 schema、执行函数、错误返回格式。
- 理解“工具契约”包含名称、输入、权限、执行、输出和错误策略。

## 与 S01 的衔接

S01 解决的问题：

```text
模型如何通过 loop 变成能持续行动的 Agent
```

S02 解决的问题：

```text
Agent 有了 loop 之后，能力如何安全、清晰、可扩展地接入
```

课堂开场可以问：

> 如果所有事情都让模型写 bash 命令完成，会有什么问题？

预期答案：

- 引号、转义和路径容易出错。
- 读文件、写文件、编辑文件的意图不够清晰。
- 难以做权限控制。
- 工具结果格式不稳定。
- 很难在 UI 中渲染不同工具的执行过程。

## 60 分钟课堂节奏

### 0-8 分钟：回顾 S01 的最小循环

用一句话复盘 S01：

```text
while loop + model call + tool_use + tool_result
```

强调本节课不改变 loop 的核心形状，只改变“工具如何进入 harness”。

板书：

```text
S01: one loop + one tool
S02: same loop + multiple tool contracts
```

### 8-18 分钟：为什么不能只用 bash

打开 `/zh/slides/s02` 或 `/zh/s02` 的学习页。

用一个例子说明：

```text
任务：把 hello.py 里的 Hello 改成 Hi
```

如果只用 bash，模型可能生成：

```bash
sed -i 's/Hello/Hi/g' hello.py
```

问题：

- Windows/macOS/Linux 的 `sed -i` 行为不同。
- 字符串中有引号或斜杠时容易坏。
- 很难知道模型是想读文件、覆盖文件，还是局部替换。

然后引入四个教学工具：

- `bash`：执行命令。
- `read_file`：读取文件。
- `write_file`：创建或覆盖文件。
- `edit_file`：精确替换字符串。

### 18-32 分钟：拆 dispatch map

打开 `/zh/s02` 的“源码”标签。

讲解顺序：

1. 工具如何声明名称。
2. 工具输入如何组织成结构化参数。
3. dispatch map 如何把 tool name 映射到 handler。
4. agent loop 如何保持稳定，不因新增工具而重写。
5. handler 如何返回 tool_result。

板书：

```text
tool_use.name -> dispatch_map[name] -> handler(input) -> tool_result
```

课堂提问：

> 新增一个工具时，应该改 loop，还是改工具注册表？

预期答案：

> 改工具注册表。loop 应该尽量稳定，能力通过工具契约扩展。

### 32-42 分钟：讲 schema 和工具契约

把“函数”和“工具契约”区分开：

```text
函数：一段可调用代码
工具契约：模型可见、harness 可验证、系统可执行的能力边界
```

一个工具至少包含：

- name：模型调用时使用的名字。
- description：告诉模型何时使用。
- input schema：允许哪些参数。
- handler：实际执行逻辑。
- result shape：结果如何返回给模型。
- error shape：失败如何表达。
- permission policy：是否需要确认，是否只读。

课堂检查点：

> `read_file(path)` 为什么应该是只读工具？只读属性对权限和并发有什么帮助？

### 42-52 分钟：模拟器走读

打开 `/zh/s02` 的“模拟”标签，逐步播放。

重点观察：

- 模型为什么先选择 `read_file`。
- `read_file` 返回内容后，模型为什么选择 `write_file` 或 `edit_file`。
- 每个工具的 tool_result 如何改变下一步决策。

引导学生比较：

```text
bash cat hello.py
read_file {"path": "hello.py"}
```

讨论：

- 哪一个更容易验证？
- 哪一个更容易做权限控制？
- 哪一个更容易在 UI 中展示？

### 52-60 分钟：桥接真实工具系统

打开 `/zh/advanced/02-tool-system`。

只讲一个生产问题：

> 当工具从 4 个变成 42+ 个时，系统要额外解决什么？

归纳为：

- 工具过滤：不是每轮都暴露全部工具。
- 权限检查：不同工具有不同风险。
- 并发标志：哪些工具可以并行。
- 结果存储：大结果不能无限塞进上下文。
- UI 渲染：不同工具需要不同展示方式。
- Prompt cache 稳定性：工具顺序和描述会影响缓存。

## 120 分钟扩展方案

后 60 分钟做编码实训：

1. 学生实现一个 `list_files(path)` 只读工具。
2. 给它设计 schema：`path`、`recursive`、`pattern`。
3. 接入 dispatch map。
4. 设计错误返回：路径不存在、权限不足、结果过大。
5. 讨论是否允许它并发执行。

## 易错点

- 不要把 tool calling 讲成普通函数调用。模型看见的是协议，不是 Python 函数本身。
- 不要让工具数量无限增加。工具越多，模型选择成本越高。
- 不要忽略错误格式。错误也是 observation，会影响下一轮推理。
- 不要让 loop 承担每个工具的特殊逻辑。特殊逻辑应该留在 handler 或工具契约里。

## 课堂板书

```text
Agent ability = tool contract

Tool contract:
name + description + schema + handler + result + error + permission

Dispatch:
tool_use.name -> handler -> tool_result

Good harness design:
stable loop, extensible tools
```

