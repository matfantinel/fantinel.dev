# v6 Design Migration Plan

Migration tracker for moving every component in `src/components/` from the legacy `--theme--` / `--color--` variables to the v6 `--t-v6-` / `--palette-v6--` system defined in `src/styles/_themes.v6.scss`.

Migrate one component at a time, flip it fully to v6, then tick the checkbox.

## Conventions

- Source of legacy tokens: `src/styles/_themes.scss`
- Source of v6 tokens: `src/styles/_themes.v6.scss`
- Both are loaded in parallel via `src/styles/global.scss` — no component should mix old and new variables.
- "Where used" is skipped for trivial/ubiquitous atoms (Button, Image, Tag, IconLink).
- Stories files (`*.stories.svelte`) are intentionally excluded.

---

## Atoms

- [X] **AnchorLinkIndicator** — used in `markdown/HeadingRenderer.svelte`. Nothing unusual; no theme/palette variables in use.
- [X] **ArrowLink** — used across cards (BlogPostCard, CoolLinkCard, etc.). **Dynamic color variants**: switches through the full `--color--{name}` / `-tint` palette AND the matching `--theme--glow-{name}` for each variant (blue, green, mauve, peach, red, teal, yellow). Need the full set in v6 before migrating.
- [X] **Blockquote** — used in `markdown/QuoteCalloutRenderer.svelte`. Uses `--theme--shadow-card` and accent color; straightforward.
- [X] **Button** — **hottest dependency** (nav, heroes, CTAs, renderers). Huge dynamic color matrix: iterates over palette colors plus their `-contrast`, `-tint`, and corresponding `--theme--glow-{name}`. Also uses `--theme--color-accent` + `-complementary` variants with their `-contrast`/`-tint`/`-glow`. Migrate only after v6 palette + glows + complementary are in place.
- [X] **Callout** — used in `markdown/QuoteCalloutRenderer.svelte`. **Semantic color set**: `--theme--color-callouts-info/warning/success` paired with `--theme--glow-callouts-*`. Requires the semantic callout tokens to exist in v6.
- [X] **CoolLinkStamp** — used inside CoolLinkCard. Hardcoded to `--color--blue` / `--color--blue-rgb`. If v6 renames blue or changes the "cool link" accent, update here.
- [X] **IconLink** — uses `--theme--glow-links` on hover (drop-shadow filter). Trivial migration.
- [X] **Image** — no color variables; no changes needed beyond any spacing/radius renames.
- [X] **Input** — used in Field. **Input token set**: `--theme--color-input-{empty,hover,filled}-{border,background}`, `-placeholder`, `-value`. Check whether v6 keeps this granular input API or collapses it.
- [X] **MarkerHighlight** — rendered by MarkdownRenderer for `==marker==` syntax. Uses `--theme--color-marker-highlight` + `-rgb` + `-contrast`. Specialized token; verify v6 still ships it.
- [X] **NavMenuLink** — used in HamburgerMenu. **Dynamic post-type coloring**: builds `--theme--color-{variant}` at runtime (generic, blog-post, cool-link, quick-review, photography, timeline). Depends on v6 keeping post-type tokens.
- [ ] **QuickReviewTypeTag** — used in QuickReviewCard. **QR subsystem**: `--theme--qr-{movie,tv-show,game,album}-color` + `--theme--qr-base-{dark,light}-color`. These were hardcoded hexes in the legacy file — a natural candidate for locked-palette variables in v6.
- [X] **SocialLink** — used in Footer and AboutAuthor. No direct tokens; wraps IconLink.
- [X] **SparklingHighlight** — rendered by MarkdownRenderer for a custom marked extension. Uses `--theme--color-sparkles`. Animation-heavy; verify sparkle animation keyframes still reference the right token after rename.
- [X] **Tag** — uses `--theme--color-tags-background` / `-hover` and, when selected, `--theme--glow-green` + `--theme--color-callouts-success`. The hardcoded green/success coupling is worth re-evaluating during v6 (maybe make it a dedicated `--t-v6-tag-selected-*` pair).

---

## Molecules

- [X] **AuthorAvatar** — used in TimelineGroup, HomePageHero, AboutAuthor, PostHero. **Complex gradient case**: uses `--theme--gradient-pinkish`, `--theme--gradient-greenish`, and `--theme--gradient-rainbow-circle-dark` (the motivating example for the locked `--palette-v6--dark-*` flavors). Also `--theme--shadow-image`.
- [X] **BlogPostCard** — used in TimelineGroup and PostsSection. Uses `--theme--color-inner-text-shadow` + `-light` (specialized text-shadow tokens) and both `--theme--shadow-card` and `--theme--shadow-card-high`. Verify both shadow tiers exist in v6.
- [X] **BlogPostCards** — used in PostsSection and `BlogArchiveLayout.astro`. Layout wrapper; no theme tokens of note.
- [X] **CodeBlock** — rendered by `markdown/CodeBlockRenderer.svelte`. Uses `--theme--color-code-background` / `-text` (overridden in light theme to point to fixed dark palette — worth replicating in v6 via locked palette variants) and accent/tint for line-number styling.
- [X] **CoolLinkCard** — used in CoolLinkCards and TimelineGroup. Hardcoded `--color--blue` accent, plus card background + border + both shadow tiers.
- [X] **CoolLinkCards** — used in `CoolLinksArchiveLayout.astro`. Layout wrapper.
- [X] **CoolLinksImage** — used in `components/opengraph/CoolLinksOpengraphImage/CoolLinksOpengraphImage.astro`. **Hardcoded hex palette**: `#11111B`, `#F5C2E7`, `#CBA6F7`, `#F38BA8`, `#EBA0AC`, `#F9E2AF`, `#A6E3A1`, `#94E2D5`, `#89DCEB`, `#74C7EC`, `#89B4FA`, etc. This is intentional — the file is rendered server-side by Satori for OG images, which does **not** resolve CSS custom properties. After the v6 palette is finalized, manually update these hexes to match.
- [X] **Field** — used in NewsletterCta. Wraps Input + label; uses `--theme--text-base-color`.
- [X] **HamburgerMenu** — WILL BE REMOVED
- [X] **MarkdownRenderer** — used in many places (post body, cool-link body, quick-review body, photography layouts, etc.). No direct CSS tokens; delegates styling to its children (CodeBlock, MarkerHighlight, SparklingHighlight, QuoteCalloutRenderer, ImageRenderer). Migration here is mostly a sanity check.
- [X] **PagefindSearchField** — used in `pages/search.astro`. Uses the input token family + `--theme--text-accent-color`.
- [X] **Pagination** — used in every archive layout. Simple: card background + accent + shadow.
- [X] **PhotographyCard** — used in TimelineGroup and PhotographyCards. Uses `--theme--color-photography` (post-type accent) + card background + shadow.
- [X] **PhotographyCards** — used in `PhotographyArchiveLayout.astro`. Layout wrapper.
- [X] **PhotographySlideshowDialog** — used in PhotographyThumbnail. Uses `--theme--background-base-color-rgb` and `--theme--color-accent-rgb` inside `rgba()` for the backdrop — verify v6 keeps the `-rgb` suffix convention (the new `define-palette-v6` mixin emits `--rgb`).
- [X] **PhotographyThumbnail** — used in PhotographyCard. Uses `--theme--shadow-card-high`.
- [ ] **QuickReviewCard** — used in TimelineGroup and QuickReviewCards. **QR subsystem + custom prop**: uses `--theme--qr-base-{dark,light}-color`, both shadow tiers, and accepts a `customBg` prop that is injected as an inline CSS variable (the prop must be normalized to include a leading `#` for hex values).
- [X] **QuickReviewCards** — used in `QuickReviewsArchiveLayout.astro`. Layout wrapper.
- [ ] **QuickReviewRatings** — used in QuickReviewCard. **QR rating tokens**: `--theme--qr-{loved,liked,decent,not-liked}-color`. Notably `qr-loved-color` is a **gradient** (`gradient-rainbow-circle-dark`), so animating/cutting it into a shape needs the same locked-dark treatment. Also uses `--color--yellow-rgb` and a custom `--glow-color` on the `loved` state.
- [X] **SearchResult** — used in PagefindSearchResults. Card background, accent rgb, both shadow tiers.
- [X] **SectionHeader** — used in PostsSection and PostsTimeline. Uses `--theme--color-accent` only.
- [X] **TableOfContents** — used in `PostLayout.astro`. Heaviest variable usage in the molecules folder: background-card + `-rgb`, background-accent, color-accent, color-links, text-base + text-accent, both shadow tiers. Migrate near the end.
- [X] **Tags** — used in BlogPostCard, CoolLinkCard, PhotographyThumbnail, ArchiveHero, PostHero. Pure layout/flex wrapper around Tag atoms.
- [X] **ThemeToggle** — used in Header and Footer. Only uses `--theme--glow-links`.
- [X] **TimelineGroup** — used in PostsTimeline. **Dynamic post-type coloring**: same `--theme--color-{variant}` pattern as NavMenuLink. Also uses `--theme--background-base-color-rgb` and `--theme--border-medium-color`.

---

## Organisms

- [ ] **AboutAuthor** — used in `PostLayout.astro`. Uses `typography.gradient-greenish` on the name, `--theme--glowing-text-animation`, card background + shadow.
- [ ] **ArchiveHero** — used in every archive layout (blog, photography, timeline, cool-links, quick-reviews) **and** in `CoolLinkLayout.astro`, `PhotographyLayout.astro`, `QuickReviewLayout.astro` as a hero for individual items. **Glowing animated title**: sets `--glow-color` locally, uses `--theme--glowing-text-animation`, color-accent + `-rgb`, plus `--theme--color-footer--wave-1` (wave treatment).
- [ ] **Footer** — used in `BaseLayout.astro`. **Hardcoded accent**: `--color--teal` / `--color--teal-contrast` for its accent (independent of the active theme accent). Worth deciding in v6 whether to keep the footer locked to teal or pull from `--t-v6-color-accent`.
- [ ] **Header** — used in `BaseLayout.astro`. Relatively simple: text-base, text-inverse, background-accent, `--theme--shadow-image` (commented out at a breakpoint, easy to miss).
- [ ] **HomePageHero** — used in `pages/index.astro`. `typography.gradient-greenish` title, `--theme--glowing-text-animation`, card background + shadow, **inset 400px background glow** (`box-shadow: ..., inset 0 0 400px var(--theme--background-card-color)`), hardcoded `--color--green` reference in a commented line (leftover).
- [ ] **NewsletterCta** — WILL BE REMOVED
- [ ] **PagefindSearchResults** — used in `pages/search.astro`. Hardcoded `--color--red` for error/no-results state.
- [ ] **PostHero** — used in `PostLayout.astro`. **Two gradients on one component**: `typography.gradient-pinkish` on title AND `typography.gradient-greenish` on the detail line. Also uses `--theme--background-accent-color`.
- [ ] **PostsSection** — used in `PostLayout.astro`. Layout wrapper around SectionHeader + BlogPostCards.
- [ ] **PostsTimeline** — used in `TimelineArchiveLayout.astro` and `pages/index.astro`. Layout wrapper around TimelineGroup entries.
- [ ] **SimpleHero** — used in `pages/search.astro`. Accent color + glowing-text-animation.
- [ ] **UnderConstructionDisclaimer** — WILL BE REMOVED

---

## Shared prerequisites (bring these into v6 before migrating anything)

Based on the audit above, v6 needs to cover at least:

1. **Full palette** with `-rgb`, `-contrast`, `-shade`, `-tint` suffixes (already handled by `define-palette-v6`).
2. **Locked palette variants** (`--palette-v6--light-*` / `--palette-v6--dark-*`) for AuthorAvatar, HamburgerMenu, QuickReviewRatings, CodeBlock, anywhere a fixed-theme look is needed. Decide on the naming (the user's current edit uses `--palette-v6--<name>` / likely `--palette-v6--dark-<name>` etc.).
3. **Accent + complementary** pairs with `-rgb`, `-contrast`, `-tint`, `-glow`.
4. **Post-type accents**: generic, blog-post, cool-link, quick-review, photography, timeline — each with `-rgb`, `-contrast`, `-shade`, `-tint`, `-glow`.
5. **Semantic colors**: callouts (info, warning, success) with matching glow tokens.
6. **Glow tokens per palette color** (blue, green, mauve, peach, red, teal, yellow, maroon, sapphire, lavender) — used by Button, ArrowLink, Callout, Tag.
7. **Shadow tiers**: `shadow-card`, `shadow-card-high`, `shadow-image`.
8. **Input tokens**: empty / hover / filled × border / background + placeholder + value.
9. **Marker / Sparkles / Code** tokens.
10. **Tags tokens**: background + background-hover.
11. **QR subsystem**: base-dark/base-light + movie/tv-show/game/album + loved/liked/decent/not-liked (with `qr-loved` likely being a gradient using locked-dark palette colors).
12. **Footer waves**: wave-1..wave-4 (two sets: default + `.footer-waves--force-gray` override).
13. **Gradients**: `greenish`, `pinkish`, `yellowish`, `rainbow`, `rainbow-circle`, `rainbow-circle-dark` (the last should now be built from `--palette-v6--dark-*` references rather than hardcoded hex).
14. **Text shadow helpers**: `color-inner-text-shadow` + `-light` (and `-rgb` variants).
15. **Glowing text animation** (`--t-v6-glowing-text-animation`) + its keyframes.
16. **Close-button, logo, link tokens** (close-button color + hover, logo-1/2 + inverted, color-links).

## Special attention files

- `src/components/molecules/CoolLinksImage/CoolLinksImage.svelte` — **hardcoded hexes for Satori OG rendering**; update manually to v6 palette values after the palette lands. Do not convert to CSS variables.
- `src/components/molecules/QuickReviewCard/QuickReviewCard.svelte` — `customBg` prop hex normalization (ensure leading `#`).
- `src/components/atoms/Button/Button.svelte` + `src/components/atoms/ArrowLink/ArrowLink.svelte` — migrate last among atoms; they will surface any missing palette/glow token in v6.
- `src/components/molecules/AuthorAvatar/AuthorAvatar.svelte` + `src/components/molecules/HamburgerMenu/HamburgerMenu.svelte` + `src/components/molecules/QuickReviewRatings/QuickReviewRatings.svelte` — first real users of the locked-dark palette; good validation that the v6 locked-variant approach works end-to-end.

---

## Cutover checklist (after all boxes are ticked)

1. Global find/replace: `--palette-v6--` → `--palette--`, `--t-v6-` → `--t-`.
2. Delete `src/styles/_themes.scss` and remove its `@use` line from `src/styles/global.scss`.
3. Rename `src/styles/_themes.v6.scss` → `src/styles/_themes.scss` (update its `@use` line).
4. Remove the `define-color` mixin from `src/styles/_mixins.scss` if nothing else references it.
5. `rg -- '--theme--|--color--'` should return zero hits inside `src/components/`.
6. Remove the `HamburgerMenu` component.
7. Remove the `NewsletterCta` component.
8. Remove the `UnderConstructionDisclaimer` component.