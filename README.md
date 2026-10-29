# The Devil’s Plan — learning edition

A polished, dependency-free single-player arcade inspired by all fifteen played Season 1 challenges. Computer opponents run locally in your browser. This is a collection of disclosed solo adaptations, not a full television-season simulator.

## Play locally

Double-click **Launch.command**, or run:

```sh
python3 server.py --open
```

The server binds to `127.0.0.1:4173` and chooses another nearby port if necessary. With Node installed, `npm start` also works. No installation or build step is needed.

## Learn and test one game at a time

Open any card for its objective, three-step briefing, worked example and exact **Easy / Standard / Hard** differences. Easy is intended for your first attempt and never awards mastery or pieces. Easy uses short teaching goals, smaller number ranges and word sets, untimed memory games, visible ownership and undo. Hard increases puzzle complexity, limits helpers and strengthens tactical opponents. Use the shared selector at the top to set the difficulty for every new game; existing boards keep their mode.

Each game has its own saved board. You can switch games without losing another game’s progress. New rounds wait for you to press Begin. The live prompt identifies the current decision; the side panel explains what changed.

A direct test link looks like:

```text
https://devils-plan.vercel.app/?game=number&mode=relaxed&seed=42
```

Internal mode keys are `relaxed` (Easy), `standard`, and `hard` (Hard). Game IDs: `virus`, `puzzle`, `race`, `memory`, `number`, `words`, `zoo`, `scale`, `grass`, `montage`, `equation`, `three`, `morris`, `hex`, `gomoku`.

Use **Give feedback** during or after a match to copy/download a report with your game, mode, seed, round, notes and recent events. Paste it into our chat for a reproducible iteration. Nothing posts automatically. Test links reproduce the starting state, not a saved position.

## Rules and fidelity

See the complete [difficulty table](docs/DIFFICULTY.md). All tuning values live in `dist/js/difficulty.js`.

Read [the research audit and test guide](docs/RULES-AND-TESTING.md) for findings, sources and deliberate changes for every game. Especially substantial adaptations include Scale’s calibration lesson, Equation’s reduced deck/betting, scripted Virus interviews and Rules Race’s preset personal rules. Original artwork replaces show footage and cast portraits.

## Development

```sh
node --test tests/*.test.mjs
```

Edit `dist/` directly and refresh. `learning.js` owns briefings and turn coaching; `data.js` owns rule sheets; three engine modules own the game mechanics. Engine state is serializable and uses seeded randomness.

Vercel configuration serves `dist/` and runs both test suites when deploying from Git. A manual static upload needs only the contents of `dist/`.

Settings/results are browser-local. Each game has its own save key. Export backups in the laboratory. Boards from earlier rule editions are retained for export but do not resume under the revised difficulty rules. Start a fresh match to test the new settings. Different devices, browsers and origins have independent progress.

Unofficial fan project; not affiliated with Netflix or TEO. No accounts, remote AI, multiplayer, cash prizes or season elimination simulation.
