# Research: candidate AI models and providers — pricing, limits, data terms

**Task:** wayfinder ticket #115 (map: #112) — facts for the E5 (Generation, provider-independent AI service) model/provider decision and per-experience cost ceiling.
**Access date for all sources:** 2026-11-19. Prices are USD per 1M tokens (input / output), standard (not Batch) tier, global endpoint, unless noted. "Cached" = cached input read.
**Scope:** desk research only. No benchmarks, no provider accounts. Arabic+English quality is NOT covered here — it needs the evaluation harness (#116 grilling / E5-S14).

---

## 1. Headline pricing table (standard tier, global)

### Anthropic (Claude) — official: https://platform.claude.com/docs/en/about-claude/pricing and /models/overview

| Model (API ID) | Context | Max output | Input | Cached | Output | Batch (in/out) |
|---|---|---|---|---|---|---|
| Claude Sonnet 5.5 (`claude-sonnet-5-5`) | 1M | 128K | $2.00 | $0.10 | $10.00 | $1.00 / $5.00 |
| Claude Opus 5.5 (`claude-opus-5-5`) | 1M | 128K | $4.00 | $0.20 | $20.00 | $2.00 / $10.00 |
| Claude Haiku 5.5 (`claude-haiku-5-5`, prompts ≤100K) | 1M | 128K | $0.10 | $0.01 | $0.50 | $0.05 / $0.25 |
| Claude Sonnet 5 (`claude-sonnet-5`) | 1M | 128K | $2.00 | $0.20 | $10.00 | $1.00 / $5.00 |
| Claude Sonnet 4.6 (`claude-sonnet-4-6`) | 1M | 128K | $3.00 | $0.30 | $15.00 | $1.50 / $7.50 |

- US-only inference (`inference_geo: "us"`, Claude 4.6+) = 1.1× on all token categories. Models 4.6 and later include the full 1M context at standard pricing; newer tokenizer (Opus 4.7+) produces ~30% more tokens for the same text (effectively raises real cost ~30% vs older models).
- Claude Opus 5.5 released 2026-09-22; Sonnet 5.5 released 2026-09-28; retirement not sooner than Sep/Oct 2027.

### OpenAI (GPT) — official: https://developers.openai.com/api/docs/pricing and model pages

| Model (API ID) | Context | Max output | Input | Cached | Output | Batch (in/out) |
|---|---|---|---|---|---|---|
| GPT-6.2 Sol (`gpt-6.2-sol` / `gpt-6.1-sol`) | 1.05M | 128K | $2.00 | $0.10 | $10.00 | $1.00 / $5.00 |
| GPT-6.1 Terra (`gpt-6.1-terra`) | 1.05M | 128K | $1.00 | $0.05 | $5.00 | $0.50 / $2.50 |
| GPT-6 Luna (`gpt-6-luna`) | 1.05M | 128K | $0.10 | $0.01 | $0.50 | $0.05 / $0.25 |
| GPT-6.2 Astra (`gpt-6.2-astra`, flagship) | 1.05M | 128K | $8.00 | $0.40 | $40.00 | $4.00 / $20.00 |
| GPT-5.5 (`gpt-5.5`) | 1.05M | 128K | $5.00 | $0.50 | $30.00 | $2.50 / $15.00 |
| GPT-5.4 (`gpt-5.4`) | 1.05M | 128K | $2.50 | $0.25 | $15.00 | $1.25 / $7.50 |
| GPT-5.4 mini (`gpt-5.4-mini`) | 400K | 128K | $0.75 | $0.075 | $4.50 | $0.375 / $2.25 |
| GPT-5.4 nano (`gpt-5.4-nano`) | 400K | 128K | $0.20 | $0.02 | $1.25 | $0.10 / $0.625 |
| GPT-5 mini (`gpt-5-mini`) | 400K | 128K | $0.25 | $0.025 | $2.00 | $0.125 / $1.00 |
| GPT-5 nano (`gpt-5-nano`) | 272K | 128K | $0.05 | $0.005 | $0.40 | $0.025 / $0.20 |

- Prompts >272K input tokens are billed at 2× input / 1.5× output for the full request (GPT-5.5, GPT-5.4, GPT-6 family).
- Regional data-residency endpoints: +10% uplift (models released on/after 2026-03-05); FedRAMP also +10%. EU data residency available on GPT-6 Luna/Terra/Sol (Standard, Fast, Flex, Batch) per model page. Long context >272K has separate, lower rate limits.
- GPT-5/GPT-5-mini/GPT-5-nano scheduled retirement 2026-12-11; GPT-5.4 nano retires 2027-04-01 (per pricing-page deprecation notes, secondary trackers). Prefer GPT-6 family for new builds.

### Google (Gemini) — official: https://ai.google.dev/gemini-api/docs/pricing (note: scheduled increases)

| Model (API ID) | Context | Max output | Input | Output | Batch | Free tier |
|---|---|---|---|---|---|---|
| Gemini 4 Argon (`gemini-4-argon`, GA 2026-10-13) | 1.048M shared | 65,536 (long decode up to 1.048M) | $2.00 (→$4.00 on 2026-12-01) | $10.00 (→$20.00 on 2026-12-01) | ~50% | No |
| Gemini 4 Carbon (`gemini-4-carbon`, GA 2026-11-10) | 1.048M shared | 65,536 | $2.00 (→$4.00 on 2026-12-01) | $10.00 (→$20.00 on 2026-12-01) | ~50% | No |
| Gemini 3.8 Flash (`gemini-3.8-flash`, GA) | 1.048M | 65,536 | $0.75 intro (→$1.50 on 2027-01-01) | $3.75 intro (→$7.50 on 2027-01-01) | ~50% | Yes (limited) |
| Gemini 3.1 Pro Preview (`gemini-3.1-pro-preview`) | 1.048M | 65,536 | $2.00 (≤200K) / $4.00 (>200K) | $12.00 / $18.00 | ~50% | No |
| Gemini 2.5 Flash / Flash-Lite (deprecated) | 1M | 65,536 | $0.30 / $0.10 | $2.50 / $0.40 | ~50% | Yes |

- Prices are scheduled to double on 2026-12-01 (Gemini 4) and 2027-01-01 (Flash). Google can change prices 30 days after posting.
- Free tier: content **is** used to improve Google's products; paid tier is not. EEA/UK/Swiss users get paid-tier data terms even on free quota, but EU-facing products must use paid services.
- Gemini 4 Argon output reasoning/thinking included in output price; 1M window is shared input+thinking+output (unified).

### Mistral — official: https://docs.mistral.ai/inference/pricing

| Model (API ID) | Context | Max output | Input | Cached | Output | Batch |
|---|---|---|---|---|---|---|
| Mistral Large 4 (`mistral-large-4`, GA 2026-11-05, open-weight) | ~1M | 256K (reported) | $0.70 | $0.07 | $2.10 | ~50% |
| Mistral Large 3 (`mistral-large-3`, deprecated, retires 2027-04-30) | 262K | 256K | $0.50 | $0.05 | $1.50 | ~50% |
| Mistral Small 4 (`mistral-small-4`) | 262K | — | $0.15 | $0.015 | $0.60 | ~50% |
| Mistral Medium 3.5 | 262K | — | $1.50 | $0.15 | $7.50 | — |

- Regional inference (EU `api.eu.mistral.ai`, US `api.us.mistral.ai`) = 1.1× standard pricing; control-plane metadata not regionalized. Open-weight under Mistral Ecosystem Open-Weight License (self-hosting allowed; model-as-service needs commercial license).

### Open-weight behind API hosts — sanity check (secondary verification; prices converge on popular models)

| Host | gpt-oss-120b | Llama 3.3 70B | Notes |
|---|---|---|---|
| Together AI | $0.15 / $0.60 | $1.04 / $1.04 (serverless) | Broadest catalog |
| Fireworks AI | $0.15 / $0.60 | ~$0.90 (param-band) | Parameter-band pricing |
| Groq | $0.15 / $0.60 (~500 tok/s) | Enterprise/contact-sales since 2026-10 | Fastest; Llama now enterprise-only |
| DeepInfra | — | ~$0.10 / $0.32 (cheapest 70B) | — |

Sources: together.ai/pricing, fireworks.ai/pricing, groq.com/pricing, deepinfra.com — all checked 2026-11-19 via secondary trackers; re-verify before use. Open-weight hosts offer no schema-constrained-decoding guarantee comparable to the big three; you'd rely on prompt + validation + retries.

---

## 2. Schema / JSON-constrained output support

| Provider | Strict JSON-schema output | Mechanism | Notes |
|---|---|---|---|
| Anthropic | **Yes, GA** (all models, incl. Sonnet 5.5 / Opus 5.5) | `output_config.format: {type: "json_schema", schema: …}` + strict tool use (`tools[].strict: true`), grammar-constrained decoding | Some JSON Schema limitations (no numeric/string-length constraints; `additionalProperties: false` required); works with Batch API (50% off). ZDR-eligible, HIPAA-eligible. Source: platform.claude.com/docs/en/build-with-claude/structured-outputs |
| OpenAI | **Yes** | `text: {format: {type: "json_schema", strict: true, …}}` (Responses API) / `response_format` (Chat Completions); supported on GPT-4o-2024-08-06+ and all GPT-5/GPT-6 models | Output conforms exactly to schema (constrained decoding). Subset of JSON Schema (no allOf/not/dependentSchemas; anyOf nested must be valid). Sources: developers.openai.com/api/docs/guides/structured-outputs |
| Google Gemini | **Yes** | `response_format: {type: "text", mime_type: "application/json", schema: …}`; constrained decoding | Subset of JSON Schema (no minProperties/maxProperties/minLength/maxLength/uniqueItems enforcement); anyOf/$ref/minimum/maximum/prefixItems added Nov 2025. Sources: ai.google.dev/gemini-api/docs/structured-output |
| Mistral | **Yes** | "Structured Outputs" on `/v1/chat/completions` and `/v1/conversations`; strict JSON schema enforcement advertised for Large 4 | Mistral Small 4/Large 4 list "Structured Outputs" feature; JSON mode also available. Sources: docs.mistral.ai/models/mistral-large-4 |

All four support the "grounded, schema-validated JSON" pattern Ufuq needs. Anthropic + OpenAI are the most battle-tested for strict constrained decoding at this date; Google's constrained decoding enforces syntax but ignores some constraints (validate in app code regardless).

## 3. DPA & no-training-on-customer-data

| Provider | DPA (URL) | Training on API data? | Self-serve? |
|---|---|---|---|
| Anthropic | https://www.anthropic.com/legal/data-processing-addendum (incorporated into Commercial Terms; Irish law for EEA/UK; SCCs) | **No** — Commercial Terms: "Anthropic may not train models on Customer Content from Services." Feedback/opt-in exceptions only. | Yes — click-through via Commercial Terms |
| OpenAI | https://openai.com/policies/data-processing-addendum (eff. 2026-01-01; OpenAI OpCo LLC / OpenAI Ireland Ltd; SCCs) | **No** — "As of March 1, 2023, data sent to the OpenAI API is not used to train or improve OpenAI models (unless you explicitly opt in)." | Yes — DPA form on openai.com; enterprise support available |
| Google (Gemini Developer API, paid) | https://ai.google.dev/gemini-api/terms + Google "DPA for Products Where Google is a Data Processor" | **No** for paid services; **YES** for unpaid/free tier (content used to improve products; human reviewers). EEA/UK/Swiss: paid-tier terms apply even to free quota. | Yes — DPA link in terms; EU residency requires Vertex/Gemini Enterprise Agent Platform (Cloud DPA: cloud.google.com/terms/data-processing-addendum) |
| Mistral | https://legal.mistral.ai/terms/data-processing-addendum (eff. 2026-07-27; GDPR + CCPA) | **Opt-out required, not default-off.** Commercial Terms §4: no training except when customer hasn't opted out, gives thumbs up/down feedback, order form says otherwise, or uses Labs/preview models. Admin panel → Privacy → disable "Data usage for improving our services" (API toggle is separate from Vibe toggle). | Yes — DPA incorporated by reference; opt-out via Admin panel |

## 4. Data residency

| Provider | Options | Cost |
|---|---|---|
| Anthropic | Claude API first-party: `global` (default) or `us`-only inference (Claude 4.6+, 1.1×). EU/other regions: via Amazon Bedrock (regional/multi-region endpoints, +10% premium) or Claude Models on Google Cloud / Vertex (multi-region). Workspace storage: US only (first-party). | 1.1× (US-only); +10% (Bedrock/Vertex regional) |
| OpenAI | Global default; regional data-residency endpoints (+10% uplift, models released after 2026-03-05); EU data residency on GPT-6 Luna/Terra/Sol (Standard, Fast, Flex, Batch); Azure OpenAI (Microsoft-hosted, regional) or Bedrock (self-hosted on AWS). | +10% uplift; Azure/Bedrock billed separately |
| Google | Gemini Developer API: **no residency control** (transient processing in any country Google operates). Vertex AI / Gemini Enterprise Agent Platform: regional & multi-region (EU, US, APAC) endpoints with ML-processing + storage commitments, CMEK, VPC-SC; EU multi-region (excludes UK). | Vertex pricing differs; Developer API is cheaper but global |
| Mistral | EU and US regional inference endpoints (EU/EFTA, US), independent deployments: `api.eu.mistral.ai`, `api.us.mistral.ai`, 1.1× pricing. Control plane not regionalized. Open-weight self-hosting for full sovereignty. | 1.1× |

## 5. Rate limits (published)

| Provider | Model-tier limits | Notes |
|---|---|---|
| Anthropic | Start: 4,000 RPM / 2M ITPM / 400K OTPM (Sonnet 5.5, Opus 5.5, Haiku 5.5), $500/mo spend cap. Build: 5,000–10,000 RPM / 5M ITPM, $1,000/mo. Scale: 10,000–13,000 RPM / 10M ITPM, $200,000/mo. Cache reads don't count toward ITPM. | Cache-aware ITPM effectively raises throughput. Source: platform.claude.com/docs/en/api/rate-limits |
| OpenAI | Build ($5 purchased, $500/mo cap): 5,000 RPM / 1M TPM (Astra/Sol/Terra), 2M TPM (Luna). Launch ($100, $5,000/mo): 10,000 RPM / 4M TPM. Grow ($500, $200,000/mo): 15,000 RPM / 40M TPM (180M Luna). Long-context >272K: separate lower limits. | Source: developers.openai.com/api/docs/guides/rate-limits (tiers changed 2026-10-06 from five to three) |
| Google Gemini | **Not published per model.** Visible only in AI Studio "Rate limits"; spend-based caps per 10 min: Tier 1 $10 / Tier 2 $50 / Tier 3 $200. RPD resets midnight Pacific. Batch enqueued-token caps published (e.g., 3–5M Tier 1). Treat as unknown; check your project in AI Studio. | Source: ai.google.dev/gemini-api/docs/rate-limits |
| Mistral | Not published numerically. Tiers by cumulative billed amount: Tier 1 = enable pay-as-you-go; Tier 2 > $20; Tier 3 > $100; Tier 4 > $500; >$2,000 → contact support. Admin Panel shows your org's limits. | Source: docs.mistral.ai/admin/user-management-finops/tier |

## 6. Per-experience cost estimate (assumption-heavy, for ceiling discussion)

Assume one experience generation ≈ **50K input + 10K output tokens** (Arabic+English PDF → structured JSON lessons; PDF grounding counted in input). No caching, no retry waste:

| Model | ≈ cost / experience |
|---|---|
| GPT-6 Luna | $0.010 |
| Gemini 3.8 Flash (intro, →2026-12-31) | $0.075 |
| Mistral Large 4 | $0.056 |
| GPT-6.1 Terra / GPT-5.4 nano+ | $0.10 – $0.125 |
| Claude Sonnet 5.5 | $0.20 |
| Gemini 4 Argon (until 2026-11-30) | $0.20 |
| GPT-5.5 | $0.55 |
| Claude Opus 5.5 | $0.40 |

At $0.20/experience, 1,000 experiences ≈ $200. Batch (−50%) and prompt caching (cached system/prompt prefix −90% input) materially reduce this. These estimates exclude: retries after schema validation failure, intermediate agentic tool calls, grounding verification passes, and thinking tokens (Gemini bills thinking as output). **Arabic tokenization is typically worse than English (~1.5–2× tokens per word vs English on some tokenizers) — the English-centric per-experience numbers above are optimistic for Arabic-heavy content.**

## 7. Realistic candidates for Ufuq (JSON-structured, grounded, Arabic+English, strict schema)

1. **Claude Sonnet 5.5** — best blend: GA strict structured outputs, strong multilingual (Arabic) capability, 1M context, $2/$10, predictable Start/Build tiers, DPA self-serve, Batch 50% off. Default workhorse candidate.
2. **Gemini 3.8 Flash / Gemini 4 Argon** — cheapest strong options ($0.75/$3.75 Flash), structured outputs GA, paid-tier terms clean, EU residency only via Vertex (more work + cost), rate limits opaque, scheduled price doubling. Flash-tier output cap 65,536 could bind for large experiences.
3. **GPT-6.1 Terra / GPT-6 Sol** — $1–2/$5–10, 1.05M context, strict Structured Outputs, EU residency on Sol/Terra/Luna, Batch 50%, predictable tiers. Strong for grounded extraction-heavy pipelines. GPT-6 Luna for classification/routing steps at $0.10/$0.50.
4. **Mistral Large 4** — $0.70/$2.10, open-weight (self-host escape hatch), EU/US regional endpoints, 160+ languages incl. Arabic-fluent, strict JSON schema. DPA fine but **training opt-out is not default-off** — must be configured; rate limits opaque; 1M context claim unverified for deployment limits.
5. **Open-weight via hosts** — price floor sanity check only; no structured-output guarantee, weaker Arabic grounding assurance, and Groq pulled Llama 70B to enterprise. Not recommended as the primary MVP provider.

Not recommended for the primary path: preview models (Gemini 3.1 Pro Preview), deprecated tiers (GPT-5/nano, 2.5 Flash), and anything on the free tier (training terms unacceptable).

## 8. Caveats, unknowns & confidence levels

| Item | Confidence | Caveat |
|---|---|---|
| All pricing tables above | **High** | Read from official pages on 2026-11-19; Gemini prices are scheduled to double 2026-12-01 (Argon/Carbon) and 2027-01-01 (Flash); OpenAI GPT-6.2 Ultrafast promo to 2027-02-28; Anthropic rate card effective 2026-11-09. |
| Anthropic rate limits & spend caps | **High** | Official page, 2026-11-19. |
| OpenAI tiers (Build/Launch/Grow) | **High** | Official page, 2026-11-19; changed 2026-10-06. |
| Google per-model rate limits | **Low** | Not published; visible only in AI Studio; spend-based caps only public figures. Assume shared per-project quotas. |
| Mistral rate limits / max output for Large 4 on their API | **Low–Medium** | Not published numerically; HF model card says 1M context, some deployment docs say 524K/262K. Verify endpoint limits. |
| Anthropic tokenizer ~30% token inflation (Opus 4.7+) | **Medium** | Anthropic states ~30% more tokens; real effect workload-dependent. Budget with measured Arabic tokenization, not English. |
| Arabic quality of any candidate | **Unknown** | Zero benchmark data gathered (out of scope). Must come from #116 grilling/eval harness before committing. |
| OpenAI EU data residency on GPT-6 Sol/Terra/Luna | **Medium** | Stated on GPT-6 Luna model page; availability per model/processing mode — verify per model at integration time. |
| Gemini 4 Argon long-decode (1M output) production readiness | **Low–Medium** | Requires Interactions API + background mode; non-streaming calls capped ~32,768 tokens. |
| Mistral Large 4 training opt-out wording | **High** | Janus/sovergate + help center confirm admin-panel opt-out required; Labs/preview models excluded regardless. |
| Batch discounts | **High** | All four offer ~50% batch; check structured-outputs-over-batch support (Anthropic: yes; OpenAI: yes; Gemini: yes; Mistral: yes). |

## 9. Needs account/sales contact vs self-serve

**Self-serve (sign up + click-through):** Anthropic API (DPA via Commercial Terms, spend caps configurable), OpenAI API (DPA via form), Gemini API paid tier (Cloud Billing), Mistral API (DPA by reference; admin-panel opt-out). Batch, flex/flex-cache pricing, and standard structured outputs all self-serve.

**Needs sales/account team:** Anthropic Scale→Custom tier & ZDR & enterprise agreements; Anthropic regional/Bedrock/Vertex private offers; OpenAI Grow→custom, enterprise DPA/ZDR, FedRAMP access, GPT-6 Astra Ultrafast (3× promo), daybreak cyber models (trusted access); Google Vertex/Gemini Enterprise Agent Platform (CMEK, VPC-SC, EU multi-region, ZDR with abuse-logging exception — note CMAs are exempt by default); Mistral Priority Tier (1.75×), zero-data-retention approval, >Tier 4 limits, self-hosted Large 4 license for MaaS.

## 10. Sources (all accessed 2026-11-19)

Anthropic: pricing — https://platform.claude.com/docs/en/about-claude/pricing ; models overview — https://platform.claude.com/docs/en/about-claude/models/overview ; rate limits — https://platform.claude.com/docs/en/api/rate-limits ; structured outputs — https://platform.claude.com/docs/en/build-with-claude/structured-outputs ; Commercial Terms (no-training clause) — https://www.anthropic.com/legal/commercial-terms ; DPA — https://www.anthropic.com/legal/data-processing-addendum ; data residency — https://platform.claude.com/docs/en/manage-claude/data-residency ; list-price PDF (2026-11-09) — https://assets.claude.com/a04aca860a54b7323e33f449706e9b43680e1346.pdf
OpenAI: pricing — https://developers.openai.com/api/docs/pricing ; rate limits — https://developers.openai.com/api/docs/guides/rate-limits ; structured outputs — https://developers.openai.com/api/docs/guides/structured-outputs ; data controls — https://developers.openai.com/api/docs/guides/your-data ; DPA — https://openai.com/policies/data-processing-addendum ; model pages (GPT-5.5, GPT-6 Luna) — developers.openai.com/api/docs/models/* ; enterprise privacy — https://openai.com/enterprise-privacy/
Google: pricing — https://ai.google.dev/gemini-api/docs/pricing ; rate limits — https://ai.google.dev/gemini-api/docs/rate-limits ; structured output — https://ai.google.dev/gemini-api/docs/structured-output ; terms — https://ai.google.dev/gemini-api/terms ; ZDR — https://ai.google.dev/gemini-api/docs/zdr ; 4 Argon model page — https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/4-argon
Mistral: pricing — https://docs.mistral.ai/inference/pricing ; regional inference — https://docs.mistral.ai/inference/regional-inference ; Large 4 model card — https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B ; DPA — https://legal.mistral.ai/terms/data-processing-addendum ; opt-out help — https://help.mistral.ai/en/articles/455207 ; commercial terms — https://legal.mistral.ai/terms/commercial-terms-of-service ; rate-limit tiers — https://docs.mistral.ai/admin/user-management-finops/tier
Open-weight hosts: https://together.ai/pricing ; https://fireworks.ai/pricing ; https://groq.com (models/pricing); https://deepinfra.com — as reported by aibizhub.io and hokai.io trackers (2026-10/11); re-verify before relying.
