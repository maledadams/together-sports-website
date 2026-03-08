Store exported editor files here when you want to version them in git.

Recommended flow:
1. Export JSON from `/admin`.
2. Save it as `content/editable-content.json`.
3. Run `npm run apply:content`.
4. Commit both `content/editable-content.json` and `src/data/editableContentSeed.ts`.

That makes the exported content the new default content for local builds and Vercel deployments.
