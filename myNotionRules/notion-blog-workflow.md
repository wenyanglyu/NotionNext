---
name: notion-blog-workflow
description: "Predefined workflow for writing new wenyang.xyz blog posts directly into Notion via Claude, including schema, defaults, and content style"
mirrored_from: Claude Code project memory (C:\Users\wlyu.REDIDIRECT\.claude\projects\C--Users-wlyu-REDIDIRECT-Documents-New-folder\memory\notion_blog_workflow.md)
last_synced: 2026-08-05
---

The user's blog (wenyang.xyz, built on this repo — see notionnext-fork-upgrade.md) is backed by a Notion database called **"wenyang blog"**:

- Database page ID: `ee53216b95e74f33baadad35dc7b23a2`
- Data source URL (use for query/create/update tools): `collection://85b02f91-6ae0-4770-8a25-65d3e58005a6`
- The user is a machine learning engineer & software engineer (also does network engineering work); planning to write more notes on **machine learning and computer vision / image processing**.

## Schema (verify with `notion-fetch` before use — options may have changed)

| Property | Type | Notes |
|---|---|---|
| `title` | title | required |
| `type` | select | `Post` (blog article, default), `Page` (static page), `Notice` |
| `category` | select | `NETWORK`, `READ`, `MachineLearning`, `Tube`, `Programming` (added 2026-08-05, for software-design/engineering notes not tied to ML — e.g. the SOLID series) — use `MachineLearning` for ML/CV notes, `Programming` for general software-engineering notes, unless told otherwise |
| `slug` | text | short camelCase, e.g. `cvEdgeDetect`, `mlAndroid`, `accChecker` — must be unique, becomes the URL path |
| `date` | date | publish date, default today |
| `status` | select | `Published`, `Invisible`, `Draft` — **default to `Draft`** unless the user says to publish immediately, so nothing goes live unreviewed |
| `tags` | multi_select | existing options include `machine learning`, `DeepLearning`, `Python`, `network`, `Tools`, etc. — reuse existing tags where they fit. **New tag values are NOT created ad hoc** — this workspace's schema rejects any `category`/`tags` value not already in the select/multi_select options list (confirmed 2026-08-05, contradicts an earlier assumption in this doc). Add new values first via `notion-update-data-source` with `ALTER COLUMN "tags" SET MULTI_SELECT('existing1':color, ..., 'newValue':color)` — must include every existing option (with its current color) or they'll be dropped, then the new one(s). Same applies to `category` (a `select`, not `multi_select`, but the same rejection/fix pattern). |
| `password` | text | leave blank unless the user asks to password-protect a post |

## Page-level settings

- **icon**: `icons/command-line_pink` — **confirmed by the user (2026-07-31)** as the standard for MachineLearning posts. The user describes this in Notion's icon picker as "command line rectangle" with "the second last color" (pink), and pointed to the "Frame Reduction" post as the reference example. Use this exact icon for every new ML post unless told otherwise (icon param accepts either a built-in `icons/<name>_<color>` slug, an emoji, or an external image URL).
- **cover**: see "Cover photos" section below — as of 2026-07-31 all 6 published ML posts have one set.
- Title may include a leading emoji for flavor (seen in existing posts, e.g. "🚀 Deploying a MobileNetV2 Model...") — optional, not required.

## Cover photos

The user has personal jpg photos at `C:\Users\wlyu.REDIDIRECT\Pictures\NotionCover` (drone/DSLR shots) they want used as Notion page covers, one per post, no duplicates, **MachineLearning and Programming categories** (ignore NETWORK/READ/Tube). Programming was added to this scope 2026-08-05 when the user explicitly asked for a cover on the SOLID series post — treat it as an established category for covers now, not a one-off exception.

**Why this needs a workaround:** the Notion MCP `update-page`/`create-pages` `cover` param only accepts a public HTTPS URL — it can't read local files directly, and `notion-create-attachment`'s `source_url` path is meant for embedding files in page *content*, not for the page-level `cover`/`icon` params.

**The working method** (verified end-to-end 2026-07-31): copy the chosen photo into this repo at `E:\wkd\NotionNext\public\notion-covers\<filename>.jpg`, commit + push to `origin/main` (see notionnext-fork-upgrade.md — remember to `git fetch`/merge first, the repo has a daily auto-upstream-sync), then set `cover` on the Notion page to `https://raw.githubusercontent.com/wenyanglyu/NotionNext/main/public/notion-covers/<filename>.jpg`. Verify the URL resolves with `curl -o /dev/null -w "%{http_code}"` before setting it as cover. This hosts the photos permanently in the public repo (consistent with them becoming public blog cover images anyway).

Note: unlike Notion-hosted covers, these external-URL covers are NOT auto-resized by Notion's image proxy (no `?width=1080` param gets applied) — the browser loads the full original file size. Fine for now; worth pre-resizing photos before adding if this becomes a performance concern.

Photos used so far (in order, oldest post → newest, to avoid re-picking): `DJI_0006` (deepl), `DJI_0010` (textm), `DJI_0024` (mlAndroid), `DJI_0027` (boxCrop), `DJI_0036` (accChecker), `DJI_0052` (frame-reduction-burst-photo-pipeline), `DJI_0058` (solidPrinciples). Next unused photo alphabetically in the folder: `DJI_0059`. ~46 more photos remain in the folder for future posts.

## Content style (match existing posts)

Technical, structured, written like engineering notes:
- `#`/`##`/`###` headers, occasionally with a leading emoji (🎯 Objectives, 🧩 Structure, ⚙️ Setup, ▶ Run, 📥 Inputs, 🧪 Testing)
- Fenced code blocks with language tags
- Tables for comparisons (e.g. pathway/pros/cons, step-by-step verification)
- **Bold** for key terms/commands
- Sections often include: Objectives/Overview → Steps/Logic → Issues & Solutions (with a labeled "Issue" + "Solution" + "Key Takeaway" pattern) → Next Steps
- Links to related GitHub repos where relevant (user's GitHub: github.com/wenyanglyu)

## The actual workflow

When the user says something like "help me write a note about X":
1. Draft the full content in the style above.
2. Create the page with `notion-create-pages`, parent = `{"type": "data_source_id", "data_source_id": "85b02f91-6ae0-4770-8a25-65d3e58005a6"}`.
3. Set properties: `type: Post`, `category: MachineLearning` (or ask if a different category fits better), `slug: <short camelCase>`, `date: <today>`, `status: Draft`, `tags: [...]` as fitting.
4. Set `icon: icons/command-line_pink`.
5. Tell the user it's created as a Draft in Notion and ready for review — link the Notion page. The user (or a follow-up request to Claude) can flip `status` to `Published` via `notion-update-page`, and it appears on wenyang.xyz automatically within ~60 seconds (ISR revalidation) — **no code push or redeploy needed for content changes.**
6. Optionally set a cover photo — see "Cover photos" section above.

**Post ordering:** as of 2026-07-31, `conf/post.config.js`'s `POSTS_SORT_BY` is set to `'date'` (was `'notion'`, which followed raw Notion row order). This means posts always display newest-first automatically based on the `date` property — no need to manually reorder rows in the Notion table for a new post to show up at the top.

Requires the Notion MCP connector to be authorized on claude.ai (it was connected as of 2026-07-29 in this session — reference "plugin:Notion:notion" / server id starting `924bda31`). If tools aren't available in a future session, tell the user to check their claude.ai connector settings.

## Troubleshooting: site shows a generic title and no real posts

**Symptom**: wenyang.xyz loads, build succeeds ("Ready" in Vercel), but the page title reads the generic "这是一个由NotionNext生成的站点" instead of the real site title, and the homepage's "Articles Count" shows `1`. This is the app's own `EmptyData()` fallback (`lib/db/SiteDataApi.js`) rendering — it means the build-time Notion fetch failed and silently degraded to placeholder content instead of crashing.

**Root cause found 2026-08-05**: the site fetches data via `notion-client` (the unofficial API, distinct from the official Notion REST API Claude's own connector uses), which was calling `https://www.notion.so/api/v3/loadPageChunk`. That endpoint started returning `403 Forbidden` on every request — confirmed with a clean local build (`.env.local`, no persisted cache) from the user's own home network, ruling out both "Vercel's IP is blocked" and "stale cache masking the real error." The actual fix: point the client at Notion's current app domain instead —

```
API_BASE_URL=https://app.notion.com/api/v3
```

**Full set of env vars this fetch path needs** (all in Vercel → Environment Variables → Production; **value goes in the Value field, not the Note field** — easy to fat-finger):
- `API_BASE_URL` = `https://app.notion.com/api/v3` — the critical fix above; without it, everything else here is moot.
- `NOTION_TOKEN_V2` — a live session cookie, copied from DevTools → Application/Storage → Cookies → `notion.so` or `app.notion.com` → cookie named exactly `token_v2`. Copy the **raw/un-decoded** value. **Not the same as `NOTION_ACCESS_TOKEN`** (an official-API integration Bearer token — structurally incompatible with this unofficial-API code path; `notion-client` only understands the `token_v2` cookie).
- `NOTION_ACTIVE_USER` — the value of the `notion_user_id` cookie (same DevTools panel). `notion-client` only sends the `x-notion-active-user-header` when this is set (`lib/db/notion/getNotionAPI.js`); omitting it may itself trigger rejection even with an otherwise-valid `token_v2`.
- `NOTION_PAGE_ID` — must be the **compact 32-character form, no hyphens** (`ee53216b95e74f33baadad35dc7b23a2`, not `ee53216b-95e7-...`). A hyphenated ID causes a different failure (`TypeError: id.split is not a function`) further down the pipeline.

**After changing any of the above**, also temporarily add `NOTION_BUILD_CACHE_PURGE_DATA=true` and redeploy once — this repo persists `.next/cache/notion/data` across Vercel deployments by design (faster builds), so a build immediately after a credential fix can still silently serve cached pre-fix data (including a cached *failure*) unless the cache is force-purged for that one deploy. Remove/set to `false` again afterward; purging every build is unnecessary once things are working.

**How to actually verify a fix worked** (don't trust "Ready" status alone — a successful-looking build can still be serving `EmptyData()`): open the deployment's build log and search for `403`/`Forbidden`. If absent, cross-check that real post slugs appear — search the log or `archive.json` output for a known real slug (e.g. `solidPrinciples`) rather than assuming; a *different* silent-fallback bug once caused the build to serve NotionNext's own `tangly1024` demo content (`article/example-1` etc.) with no error at all, which looked like success but wasn't.

**Also relevant, found the same day**: `lib/db/SiteDataApi.js` had two related bugs fixed in commits `ddb2723` and `a035b4b` — a partially-failed or stale-cached fetch could leave individual fields (`notice`, `categoryOptions`, `tagOptions`, ...) as `undefined` rather than a safe default, which crashes Next.js's static export (`Error serializing '.x' — undefined cannot be serialized`). Both commits are unrelated to the `403`/env-var issue above and were necessary but not sufficient on their own — they stop the crash but don't fix the underlying fetch failure.
