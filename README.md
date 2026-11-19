# ufuq

**Ufuq (أفق)** turns PDFs into interactive learning experiences.

A learner uploads a document. Ufuq understands its content, identifies the concepts that matter, chooses a suitable way to teach them, grounds everything in the source pages, and creates an interactive experience the learner can explore and revisit.

Ufuq teaches through exploration, not by replacing reading with summaries. It is not a PDF summarizer, a quiz or flashcard generator, or a document chat interface, and it never executes AI-generated code: AI produces structured data and the app renders it with trusted components.

## What makes it different

- **The right format for the topic** — AI picks a visual and interaction format per concept (diagrams, timelines, process flows, step-throughs, concept maps, and more).
- **Grounded in the source** — every explanation traces back to pages in the uploaded document.
- **PDF-first** — PDF is the only source format in the MVP.
- **Bilingual from day one** — English and Arabic, with proper right-to-left support.
- **All ages** — welcoming and playful without looking childish.
- **Safe rendering** — structured data in, trusted components out. Never executed.

## Status

Early development. The product definition, ordered epics and stories, and reference material live in [`Ufuq_MVP_Plan.md`](./Ufuq_MVP_Plan.md), and the backlog is tracked as GitHub issues: 8 epics (`E1`–`E8`) with stories (`E1-S1` … `E8-S11`), each story gated by its epic.

### Planned delivery order

| Epic | Goal |
|---|---|
| E1 | Platform foundation — deployable skeleton with tokens, i18n, RTL |
| E2 | Accounts, age policy and legal |
| E3 | PDF upload and management |
| E4 | Extraction pipeline — stored PDF becomes a document model |
| E5 | AI understanding and generation |
| E6 | Interactive learning player |
| E7 | Library, progress and feedback |
| E8 | Quality, safety and launch |

## Stack

- **Monorepo:** Nx
- **Frontend:** Angular + TypeScript (standalone components, signals), Transloco for runtime i18n
- **Backend:** TypeScript (NestJS), REST with an OpenAPI contract, JWT auth
- **Shared:** Zod schema as the single source of truth between web and api
- **Testing:** Unit tests and Playwright end-to-end

## Languages

English (LTR) and Arabic (RTL), built in from the start.

## Name

`Ufuq` (أفق, "horizon") is the selected product name; trademark, domain, and handle clearance checks are still pending.
