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
| `category` | select | `NETWORK`, `READ`, `MachineLearning`, `Tube` — use `MachineLearning` for ML/CV notes unless told otherwise |
| `slug` | text | short camelCase, e.g. `cvEdgeDetect`, `mlAndroid`, `accChecker` — must be unique, becomes the URL path |
| `date` | date | publish date, default today |
| `status` | select | `Published`, `Invisible`, `Draft` — **default to `Draft`** unless the user says to publish immediately, so nothing goes live unreviewed |
| `tags` | multi_select | existing options include `machine learning`, `DeepLearning`, `Python`, `network`, `Tools`, etc. — reuse existing tags where they fit; new tag values can be created ad hoc |
| `password` | text | leave blank unless the user asks to password-protect a post |

## Page-level settings

- **icon**: `icons/command-line_pink` — **confirmed by the user (2026-07-31)** as the standard for MachineLearning posts. The user describes this in Notion's icon picker as "command line rectangle" with "the second last color" (pink), and pointed to the "Frame Reduction" post as the reference example. Use this exact icon for every new ML post unless told otherwise (icon param accepts either a built-in `icons/<name>_<color>` slug, an emoji, or an external image URL).
- **cover**: see "Cover photos" section below — as of 2026-07-31 all 6 published ML posts have one set.
- Title may include a leading emoji for flavor (seen in existing posts, e.g. "🚀 Deploying a MobileNetV2 Model...") — optional, not required.

## Cover photos

The user has personal jpg photos at `C:\Users\wlyu.REDIDIRECT\Pictures\NotionCover` (drone/DSLR shots) they want used as Notion page covers, one per post, no duplicates, **MachineLearning category only** (ignore NETWORK/READ/Tube).

**Why this needs a workaround:** the Notion MCP `update-page`/`create-pages` `cover` param only accepts a public HTTPS URL — it can't read local files directly, and `notion-create-attachment`'s `source_url` path is meant for embedding files in page *content*, not for the page-level `cover`/`icon` params.

**The working method** (verified end-to-end 2026-07-31): copy the chosen photo into this repo at `E:\wkd\NotionNext\public\notion-covers\<filename>.jpg`, commit + push to `origin/main` (see notionnext-fork-upgrade.md — remember to `git fetch`/merge first, the repo has a daily auto-upstream-sync), then set `cover` on the Notion page to `https://raw.githubusercontent.com/wenyanglyu/NotionNext/main/public/notion-covers/<filename>.jpg`. Verify the URL resolves with `curl -o /dev/null -w "%{http_code}"` before setting it as cover. This hosts the photos permanently in the public repo (consistent with them becoming public blog cover images anyway).

Note: unlike Notion-hosted covers, these external-URL covers are NOT auto-resized by Notion's image proxy (no `?width=1080` param gets applied) — the browser loads the full original file size. Fine for now; worth pre-resizing photos before adding if this becomes a performance concern.

Photos used so far (in order, oldest post → newest, to avoid re-picking): `DJI_0006` (deepl), `DJI_0010` (textm), `DJI_0024` (mlAndroid), `DJI_0027` (boxCrop), `DJI_0036` (accChecker), `DJI_0052` (frame-reduction-burst-photo-pipeline). Next unused photo alphabetically in the folder: `DJI_0058`. ~47 more photos remain in the folder for future posts.

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
