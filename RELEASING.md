# Releasing

Lightweight manual releases for this small static app. No release-please bot.

## Versioning

- Follow [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`
- `package.json` `version` is the source of truth for the app version
- Document user-facing changes in [CHANGELOG.md](CHANGELOG.md) ([Keep a Changelog](https://keepachangelog.com/))
- First public baseline is **1.0.0**. Bump for later releases:
  - **PATCH** (`1.0.x`) — bug fixes, small polish
  - **MINOR** (`1.x.0`) — new features, backward-compatible
  - **MAJOR** (`x.0.0`) — breaking changes (rare for this SPA)

## Steps

1. **Bump version** in `package.json` (and `package-lock.json` if you use `npm version`).
2. **Update CHANGELOG.md**
   - Move items from `[Unreleased]` into a new `## [X.Y.Z] - YYYY-MM-DD` section
   - Leave empty `[Unreleased]` subsections for the next cycle
   - Update compare / tag links at the bottom of the file
3. **Commit** (example message: `Release vX.Y.Z`)
4. **Tag** locally:

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   ```

5. **Push** when you are ready (you push; CI/bots do not):

   ```bash
   git push origin master
   git push origin vX.Y.Z
   ```

6. **GitHub Release**
   - Create a release for tag `vX.Y.Z` in the GitHub UI (or `gh release create`)
   - Paste the corresponding CHANGELOG section as the release notes
   - Optional draft body: [.github/RELEASE_TEMPLATE.md](.github/RELEASE_TEMPLATE.md)

## Checklist

- [ ] `package.json` version matches the tag (`vX.Y.Z`)
- [ ] CHANGELOG has a dated `[X.Y.Z]` entry and refreshed links
- [ ] Annotated tag `vX.Y.Z` exists locally
- [ ] GitHub Release published with notes from CHANGELOG
