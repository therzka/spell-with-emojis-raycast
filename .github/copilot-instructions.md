# Copilot Instructions

This is a [Raycast](https://raycast.com) extension ("Spell with Emoji Letters") that converts
typed text into a string of Slack emoji-shortcode references (e.g. `:neon-letter-a:`), for
pasting or copying into Slack.

## Commands

- `npm run build` — builds the extension via `ray build -e dist`
- `npm run dev` — runs the extension in Raycast dev mode via `ray develop`
- `npm run lint` — lints via `ray lint` (Raycast's ESLint wrapper, config in `.eslintrc.json`)
- `npm run fix-lint` — auto-fixes lint issues via `ray lint --fix`
- There is no test suite/runner in this repo.

## Architecture

- The entire extension logic lives in the single file `src/index.tsx`. There is only one
  Raycast command, `index`, declared in `package.json`'s `commands` array — this must stay in
  sync with the file name if renamed.
- `emojiSets` is the source of truth for available letter styles (value/title/icon). Each
  `value` is the emoji-shortcode prefix used in Slack (e.g. `neon-letter` → `:neon-letter-a:`).
  `emojiOptions` extends this list with a special `"ransom-note"` entry that isn't a real emoji
  set but a mode flag.
- `wrapTextWithEmoji(text, emojiSet)` maps each character of the input to `:{emojiSet}-{char}:`,
  replacing spaces with three literal spaces (Slack renders consecutive emoji-shortcodes tightly,
  so extra spacing is needed for legibility). When `emojiSet === "ransom-note"`, each character
  independently picks a random set from `emojiSets` instead of using a fixed set.
- The `icon` field on each `emojiSets` entry references a file in `assets/` and is shown next to
  the option in the `Form.Dropdown`.

## Conventions

- When adding a new emoji letter set, add an entry to `emojiSets` (not `emojiOptions` directly)
  with a unique `value` matching the Slack emoji-shortcode prefix, a human-readable `title`, and
  an `icon` pointing to an asset filename that exists in `assets/`.
- Document new emoji sets in the "Available Emoji Sets" section of `README.md`, including the
  Slack shortcode prefix and a `source` link (or `[TBD]` if unknown), matching the existing list
  format.
