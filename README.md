# The Devil’s Plan — The Game Room

Play online: **https://devils-plan.vercel.app/**

A polished, dependency-free local arcade inspired by season one. Fifteen playable games: six main matches, six prize matches, two played finals, and Blind Gomoku. You play alone, against or alongside local computer players.

**This is a solo adaptation, not an exact television-season simulator.** Each game’s Rule sheet distinguishes the core mechanic from the changes. There is no human multiplayer, free-form negotiation, prison scheduling, elimination campaign, or remote AI. Games are standalone. Pieces track practice wins; repeated wins earn more.

## Start playing

On macOS, double-click **Launch.command**. It starts a server on this computer and opens the game in your browser. Keep that Terminal window open while playing; Ctrl+C stops the server.

Or, from this folder:

```sh
python3 server.py --open
```

If you prefer Node.js 20 or newer:

```sh
node server.mjs --open
```

There is no package installation or build step. Python 3.9+ or Node.js 20+ is sufficient. The server normally uses **http://127.0.0.1:4173**. If that port is busy, it chooses the next available port and prints the actual address. To select another port explicitly:

```sh
python3 server.py --port 4300 --open
```

The server binds to 127.0.0.1, so it is available only on this computer. Internet access and API keys are unnecessary. Open the HTTP URL rather than double-clicking index.html: the JavaScript modules need an HTTP server.

## Your first session

Start with Cooperative Puzzle or Rules Race to learn the controls, or enter The Virus Game for social deduction. Every match has an objective, a short how-to, a dealer log and a detailed rule sheet.

The laboratory/settings let you adjust computer difficulty, the study duration in memory games, and an optional replay seed. Relaxed Montage waits for your clicks. These settings apply to new matches. Restart this seed preserves the current match’s original conditions.

The same seed, settings and sequence of actions reproduce the initial board and random computer decisions. Memory timers add timed actions, so their exact sequence also matters.

Your latest board, completed results and settings autosave in this browser. Returning to the collection pauses timed games and keeps the board; starting another game replaces that board. Opening a rule sheet or settings also pauses timers. Keep using the same browser and URL/port: localhost and 127.0.0.1 have separate storage.

The laboratory exports a JSON backup. Import restores settings and result history; active boards resume only from their original browser storage. A reset clears local results and the active match while preserving settings.

## What is included

| Match | This edition |
| --- | --- |
| The Virus Game | Twelve roles; you are always the officer. Interviews and private journalist reports replace physical missions. Infection, two-round deaths, antidotes, bullets and cure development are simulated. Eight-round cap. |
| Cooperative Puzzle | Three original, solvable grid-packing puzzles. Rotate, reflect, lift pieces, and request one teammate hint per puzzle. No platform or timer. |
| Rules Race | Four racers on a 24-space track. Three selectable personal rules, offices, prison, tickets and a shared rule. No full rule-block grammar. |
| Fragments of Memory | Original study illustration, configurable study time, ten questions and two bot passes. A mistake ends the match. |
| Secret Number | Four unknown numbers, eight selectable arithmetic contacts, one optional trade, and scored deductions. No alliance negotiation or ticket trading. |
| Word Tower | Three categories, three words per round, an explicit small dictionary and one teammate contribution per round. Use every letter. No physical tower. |
| Zoo | Five auctions on a 5×5 gravity board. Lower-total group wins; highest bidder in that group controls placement. Secret sequences and count-condition multipliers. Empty lots ignored; exhausted auctions skip placement. |
| Scale Game | Five integer mineral weights, a reusable balance and four exact teammate equations. Twelve weighings, no room isolation or shared inventory constraint. |
| Laying Grass | Nine rounds, a 12×12 board, one rival and three tile choices per turn. Largest filled square wins; area breaks ties. Special powers omitted. |
| Montage | Five rounds of original vector portraits, exact-repeat detection and a three-second window. Relaxed mode advances manually. A bot may rescue a missed repeat. |
| Equation High–Low | Four number cards and +, −, ÷ exactly once. Five hands, three bots, one wager and separate lane pots. No roots, special deck, swing bets or full poker betting rounds. |
| Four-Player Three in a Row | 4×4 board, five pieces per color, stacking to height three and adjacent movement. Four rounds against a visible blue guest; hidden identity/room puzzle omitted. |
| Nine Men’s Morris | Complete placement, movement, mills, captures, flying and blocked-player rules against a heuristic bot. One game, with repetition/no-capture draws, rather than the show’s best of three. |
| Hexagon | Nineteen numbers; only straight, consecutive triples qualify. Three rounds, visible answer history and a computer memory model. |
| Blind Gomoku | 9×9 board, hidden older stones and a heuristic dealer. No entry puzzle or elimination stakes. Latest pair remains visible until your next move. |

Dice Poker is not implemented: it was not played in the broadcast, and a complete ruleset was not presented. The finale here contains its two played games as independent matches.

## Tinker with the source

Everything served to the browser is in `dist/`. Save a file, then refresh the browser; there is no build process.

| File | Change it to… |
| --- | --- |
| `dist/style.css` | Change colors, type, spacing, layouts and board appearance. The first `:root` block holds the palette. |
| `dist/js/data.js` | Edit game descriptions, objectives, rule sheets, adaptation notes and piece rewards. |
| `dist/js/main-games.js` | Change the six main-match rule engines and bot decisions. |
| `dist/js/prize-games.js` | Change the six prize engines, word dictionary, study illustration and portrait generator. |
| `dist/js/final-games.js` | Change Morris, Hexagon and Gomoku rules or computer strategy. |
| `dist/js/core.js` | Shared seeded randomness, grid geometry, shape transforms, scoring helpers and HTML builders. |
| `dist/js/app.js` | Navigation, storage, settings, timer pausing, result recording and game orchestration. |
| `dist/js/art.js` | Original SVG collection artwork and geometric hero illustration. |

Each engine follows the same interface:

```js
export const myGame = {
  create(state) { /* initialize JSON-serializable match state */ },
  view(state) { /* return board/control HTML */ },
  act(state, action, value, fields) { /* validate and apply a player action */ },
  tick(state) { /* optional: advance a timer; return true if state changed */ }
};
```

Buttons use `data-act` and `data-value`. Inputs with IDs arrive in `fields`. Use `log(state, text)` for the dealer log and `finish(state, win, title, detail, score)` for the result. Use `random(state)`/`int(state, n)` rather than Math.random so seeds remain reproducible. State must survive JSON save/restore.

Computer players are deterministic heuristics plus seeded randomness. They do not call an AI service. Hidden-information games use restricted bot information, except that the underlying rule engine necessarily knows the complete board. This is a local practice app, so browser developer tools can reveal hidden state.

If you change the state schema, start a fresh match. For a larger incompatible change, update the storage key/version in app.js.

## Validation

Run the automated checks with Node.js:

```sh
node --test tests/engines.test.mjs
```

The 32 checks cover all engines, JSON restoration, reproducible randomness, complete seeded playouts, generated-puzzle solvability, legal territory placement, auction budgets/gravity, arithmetic precedence, inventory conservation, Morris capture/flying rules, valid hex lines and Gomoku threats. They passed on the delivered version.

Every game was also opened and exercised through the browser UI. Verification included a full Scale Game victory, card ordering and showdown, infection progression, shooting, refresh/resume persistence, partner hints, contacts, word contributions, board turns and Montage advancement. The browser error log was empty. The interface was visually reviewed in the app’s narrow desktop preview; additional phone/browser-device testing has not been performed.

## Rule references and artwork

The supplied English Namu page did not load during research. Its Korean mirror’s day-by-day rule sections were used, with the [season overview](https://en.wikipedia.org/wiki/The_Devil%27s_Plan#Gameplay) as a cross-check:

- [Day 1](https://namu.moe/w/데블스%20플랜(시즌%201)/1일차)
- [Day 2](https://namu.moe/w/데블스%20플랜(시즌%201)/2일차)
- [Day 3](https://namu.moe/w/데블스%20플랜(시즌%201)/3일차)
- [Day 4](https://namu.moe/w/데블스%20플랜(시즌%201)/4일차)
- [Day 5](https://namu.moe/w/데블스%20플랜(시즌%201)/5일차)
- [Day 6](https://namu.moe/w/데블스%20플랜(시즌%201)/6일차)
- [Day 7](https://namu.moe/w/데블스%20플랜(시즌%201)/7일차)

All illustrations, portraits, puzzles and code in this folder were created for this project. No show footage, cast likenesses, music or logo assets are bundled. This is an unofficial fan project, unaffiliated with Netflix or TEO.


## Deploy on Vercel

The included `vercel.json` selects the Other framework preset, skips dependency installation, runs the game-engine tests as its build check, and serves only `dist/`. No environment variables, database or server process are required. Vercel configuration reference: https://vercel.com/docs/project-configuration/vercel-json

Set the project root to this `devils-plan` folder. If importing an entire repository containing this workspace, select the directory containing this README and `vercel.json` as the Root Directory. Keep the settings in `vercel.json`; do not select a Node server or Python framework preset.

With an authenticated Vercel CLI, run these commands **inside this folder**:

```sh
vercel link
vercel deploy
```

Choose the intended existing project during linking, or create a new one. The second command creates a preview. After checking the game at that URL, publish production with:

```sh
vercel deploy --prod
```

Deployment through the connected Vercel integration is also supported once the intended team and project have been selected. The live project is `devils-plan` in the `mix-studios` Vercel workspace. Its first deployment used Vercel Drop to Deploy with the contents of `dist/`. This checkout is not linked to the project through the CLI yet.

Hosted saves are stored separately from your local URL. To transfer settings and completed results, use the laboratory’s Export/Import controls. Active match boards remain tied to the browser origin where they were started.
