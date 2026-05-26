# Agent Coding Lesson

A double-layer web course for learning coding-agent harness engineering.

The site combines two kinds of material:

- **Lab lessons** from `learn-claude-code`: 12 runnable, minimal Python implementations that build an agent harness one mechanism at a time.
- **Production anatomy** from `claude-reviews-claude`: deeper Claude Code subsystem readings, rendered as in-site advanced chapters.

The course map connects each toy mechanism to the real subsystem it prepares you to understand.

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

## Notes

This repository is intended to be standalone. It does not require sibling checkouts of `learn-claude-code` or `claude-reviews-claude` because the required course resources are included under `resources/`.
