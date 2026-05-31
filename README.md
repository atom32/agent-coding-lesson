# Agent Coding Lesson

A double-layer web course for learning coding-agent harness engineering.

The site combines two kinds of material:

- **Lab lessons** from `learn-claude-code`: 12 runnable, minimal Python implementations that build an agent harness one mechanism at a time.
- **Production anatomy** from `claude-reviews-claude`: deeper Claude Code subsystem readings, rendered as in-site advanced chapters.

The course map connects each toy mechanism to the real subsystem it prepares you to understand.

## Acknowledgements

This project references and builds on material from two open-source repositories:

- [`shareAI-lab/learn-claude-code`](https://github.com/shareAI-lab/learn-claude-code), which provides the beginner-friendly Claude Code learning lessons and runnable examples.
- [`openedclaude/claude-reviews-claude`](https://github.com/openedclaude/claude-reviews-claude), which provides the Claude Code architecture review documents used as the advanced reading layer.

Many thanks to the maintainers and contributors of both projects for making these learning resources available.

## Quick Start

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000/en/curriculum
http://localhost:3000/zh/curriculum
```

## Build

```bash
npm run build
npm run start
```

`npm run dev` and `npm run build` both run `npm run extract` first. The extraction script reads bundled source material from `resources/` and generates:

- `src/data/generated/versions.json`
- `src/data/generated/docs.json`
- `src/data/generated/advanced-docs.json`
- `public/advanced-assets/*`

## Repository Layout

```text
resources/
  learn-claude-code/
    agents/          # minimal Python lesson implementations
    docs/            # beginner lesson markdown
  claude-reviews-claude/
    docs/            # advanced Claude Code architecture markdown/assets

src/
  app/               # Next.js app routes
  components/        # UI, visualizations, curriculum bridge components
  data/              # generated data, mappings, scenarios, slide data
  i18n/messages/     # English, Chinese, Japanese UI strings
```

## Key Routes

- `/en/curriculum` and `/zh/curriculum`: double-layer course map
- `/en/s01` through `/en/s12`: beginner lab lessons
- `/en/advanced/01-query-engine`: advanced production chapter pages
- `/en/slides/s01`: slide deck view for each session

## Teaching Materials

The `docs/course/` folder contains classroom-ready material for the first practical lesson:

- `s01-react-loop-teaching-plan.md`: teacher script for a 60-120 minute ReAct / agentic loop class.
- `s01-react-loop-lab.md`: student lab sheet with coding tasks and assessment checkpoints.
- `s02-tool-calling-teaching-plan.md`: teacher script for tool calling, dispatch maps, and tool contracts.
- `s02-tool-calling-lab.md`: student lab sheet for designing and wiring a new tool.
- `s03-todowrite-planning-teaching-plan.md`: teacher script for visible planning state and TodoWrite.
- `s03-todowrite-planning-lab.md`: student lab sheet for extending todo state and reminder injection.
- `s04-subagent-context-isolation-teaching-plan.md`: teacher script for subagents, context isolation, and delegation boundaries.
- `s04-subagent-context-isolation-lab.md`: student lab sheet for task types, tool filtering, and structured subagent summaries.

## Notes

This repository is intended to be standalone. It does not require sibling checkouts of `learn-claude-code` or `claude-reviews-claude` because the required course resources are included under `resources/`.
