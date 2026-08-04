---
name: notionnext-fork-upgrade
description: "wenyang.xyz is a NotionNext fork at E:\wkd\NotionNext, deployed via Vercel; upgraded 2026-07-29 from v4.0.16 to v4.10.8 to fix a Notion API break"
mirrored_from: Claude Code project memory (C:\Users\wlyu.REDIDIRECT\.claude\projects\C--Users-wlyu-REDIDIRECT-Documents-New-folder\memory\notionnext_fork_upgrade.md)
last_synced: 2026-08-05
---

wenyang.xyz runs this NotionNext fork — see notion-blog-workflow.md for the content/Notion side.

- Local repo: `E:\wkd\NotionNext` (git remote `origin` → `github.com/wenyanglyu/NotionNext`, `upstream` → `github.com/notionnext-org/NotionNext`)
- Deploys via Vercel from GitHub `main`, auto-redeploys on push (~7-9 min build time observed, sometimes much longer)
- Live theme: `heo`
- On 2026-07-29, the site broke ("无法获取Notion数据" error) because the fork was 2,270 commits behind upstream (v4.0.16) and Notion had changed its internal API format, which upstream had already fixed (v4.10.8). Upgraded by rebuilding `main` from `upstream/main` and hand-reapplying personal customizations (contact links, bio, hero text, favicons) rather than a plain `git merge`, since the divergence was too large for a clean merge.
- Original pre-upgrade `main` is preserved as branch `backup-before-upgrade-20260729` (both locally and pushed to origin), in case anything needs reverting.
- This repo has a **daily automated "Upstream Sync" GitHub Action** (`.github/workflows/sync.yaml`) that auto-merges new commits from `tangly1024/NotionNext` main every night at midnight. Always `git fetch origin main` and merge before pushing — new commits can land at any time from this, independent of anything done in a chat session.

**Why:** Personal info (Notion page ID, some contact links) is set via Vercel environment variables and overrides the repo's code defaults — same pattern discovered twice (NOTION_PAGE_ID, and initially NEXT_PUBLIC_THEME). If a future config change in the repo doesn't appear to take effect after a deploy, check Vercel's environment variables first before assuming the code change failed.

**How to apply:** Before making further code/config changes to this repo, check `git log`/`git status` for current state rather than assuming the config described here is still accurate — this is a snapshot from 2026-07-31. For redeploying, a plain `git push origin main` is enough now that history is no longer diverged from upstream.

**2026-07-31 changes:**
- `POSTS_SORT_BY` in `conf/post.config.js` set to `'date'` (was `'notion'` row-order) — posts now always sort newest-first by their `date` property.
- `SEO_ALLOW_INDEX` added to `blog.config.js`, set to `false` — the user doesn't want the site indexed by search engines (colleagues might find work-related algorithm posts by searching topics), but it must stay reachable via direct URL. This drives `<meta name="robots">` (noindex, nofollow) in `components/SEO.js` and `Disallow: /` in the generated `robots.txt` (`lib/utils/robots.txt.js`). User explicitly declined per-post password protection for now ("noindex is enough") — if this changes, NotionNext supports a per-post `password` database property for real access control, unlike noindex which only affects compliant crawlers and isn't true confidentiality.
- Cover photos: see notion-blog-workflow.md for the `public/notion-covers/` hosting method.
- **Mermaid diagrams weren't rendering** (Notion showed the diagram fine via its own preview toggle, but wenyang.xyz just showed the raw code block). Root cause: `renderMermaid()` in `components/PrismMac.js` checked each `.notion-code.language-mermaid` block's text content *synchronously* right after the Prism autoloader resolved — but Notion's block content can still be mid-render in the DOM at that exact moment. When the check found no text yet, it concluded there were no Mermaid blocks on the page and skipped loading the mermaid.js CDN entirely, so the library never loaded even on pages with valid Mermaid blocks. Fixed (commit `b7973bd7`) by deciding whether to load the CDN based on the *existence* of `.language-mermaid` elements (structural, always available immediately) rather than their text content, then retrying the text-content read (up to 10x/100ms) after the library loads, before giving up. Verified against the "Frame Reduction" post's two diagrams. If Mermaid ever breaks again after a daily upstream auto-sync touches `PrismMac.js`, check whether this fix got overwritten by the merge.
