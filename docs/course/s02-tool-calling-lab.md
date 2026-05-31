# S02 Tool Calling / Dispatch Map 学生实验任务单

本实验承接 S01。S01 中 Agent 已经能通过循环执行一个 bash 工具；S02 要解决的问题是：如何把更多能力以结构化、可验证、可扩展的方式接入 Agent。

## 实验目标

完成后你应该能够：

- 解释 tool calling 和普通函数调用的区别。
- 读懂 dispatch map 的作用。
- 设计一个新工具的输入 schema 和错误返回格式。
- 把新工具接入 Agent loop，而不改写 loop 主体。
- 说明为什么工具数量和工具边界会影响模型行为。

## 实验入口

打开网站：

- `/zh/s02`
- `/zh/slides/s02`
- `/zh/advanced/02-tool-system`

建议先复习：

- `/zh/s01`

## 任务 1：画出工具调用链路

阅读 s02 源码，补全下图：

```text
model output
  -> tool_use.name = ?
  -> dispatch_map[?]
  -> handler(input)
  -> tool_result
  -> messages
```

回答：

- dispatch map 的 key 是什么？
- handler 的输入来自哪里？
- handler 的输出如何影响下一轮模型调用？

## 任务 2：比较 bash 与专用文件工具

完成下表：

| 操作 | bash 写法 | 专用工具写法 | 哪个更适合 Agent，为什么 |
|---|---|---|---|
| 读取文件 | `cat hello.py` | `read_file(path)` |  |
| 覆盖文件 | `echo ... > hello.py` | `write_file(path, content)` |  |
| 局部替换 | `sed ...` | `edit_file(path, old, new)` |  |

思考：

- 哪种方式更容易校验输入？
- 哪种方式更容易判断权限？
- 哪种方式更容易生成稳定的 tool_result？

## 任务 3：设计一个新工具

设计一个只读工具：`list_files`

建议 schema：

```json
{
  "path": "string",
  "recursive": "boolean",
  "pattern": "string | optional"
}
```

请写出：

- tool name：
- description：
- input schema：
- result shape：
- error shape：
- 是否只读：
- 是否允许并发：

要求：

- 路径不存在时返回结构化错误。
- 结果过多时要截断或提示。
- 不要直接把异常堆栈暴露给模型。

## 任务 4：接入 dispatch map

把 `list_files` 接入工具分发表。

伪代码示例：

```python
tools = {
    "bash": bash,
    "read_file": read_file,
    "write_file": write_file,
    "edit_file": edit_file,
    "list_files": list_files,
}
```

要求：

- 不改写 agent loop 的主体结构。
- 只通过注册新工具扩展能力。
- 调用未知工具时返回清晰错误。

验收问题：

- 为什么新增工具不应该导致 loop 主体越来越复杂？
- 如果模型调用了不存在的工具，harness 应该怎么处理？

## 任务 5：错误也是 observation

设计三种错误，并写出返回给模型的 tool_result：

| 错误情况 | tool_result 应如何表达 |
|---|---|
| 路径不存在 |  |
| 没有权限 |  |
| 返回结果过大 |  |

思考：

- 哪些错误可以让模型自行修复？
- 哪些错误应该直接要求用户确认？

## 任务 6：连接真实系统

阅读 `/zh/advanced/02-tool-system` 的开头部分，回答：

> 教学版 4 个工具进入真实系统后，会多出哪些生产级责任？

至少写出 4 项：

- 
- 
- 
- 

参考方向：

- schema validation
- permission check
- read-only 判断
- concurrency safe 判断
- result storage
- UI rendering
- tool filtering

## 提交内容

提交一份简短实验报告，包含：

- 工具调用链路图。
- `list_files` 工具契约设计。
- dispatch map 修改说明。
- 三种错误 tool_result 设计。
- 你认为教学版工具系统与真实 Tool System 最大的三个差距。

## 评分建议

| 项目 | 分值 |
|---|---:|
| 能解释 tool calling 与函数调用的区别 | 20 |
| 能读懂 dispatch map | 20 |
| 新工具契约设计完整 | 25 |
| 错误返回设计合理 | 20 |
| 能连接到真实 Tool System 的生产复杂度 | 15 |

