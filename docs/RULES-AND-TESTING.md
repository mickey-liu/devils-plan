# Learning edition — rules audit and testing guide

Updated October 28, 2026. The original English Namu link was inaccessible; the daily Korean mirror rule sections were used instead. This remains a single-player adaptation, with original puzzles and local heuristic opponents. It does not reproduce the season’s negotiations, eliminations, prison economy, cash prizes or physical team tasks.

## Start testing

Run `python3 server.py --open` from the project directory, or double-click `Launch.command`. Choose any game directly; every game has its own briefing and saved board. Start with **Learn**, then compare the same seed in Standard and Expert. Learn results do not award mastery or pieces.

Each match has **Copy test link** and **Give feedback**. Feedback can be copied into chat or downloaded as JSON; it includes game, mode, starting seed, round, notes and recent events. It is never posted automatically. A link reproduces the starting conditions, not the current position or action history.

Old version-one boards are retained in the browser profile for export but cannot resume under revised mechanics. Results and settings remain. New boards save separately per game. A different browser or origin has separate storage.

## Findings and implementation decisions

| Game | Research finding / previous problem | Revised solo game |
| --- | --- | --- |
| Virus Game | Claims and verified role information are different; the neutral Officer has a different win condition from citizens. | Explains the Officer objective, gives useful researcher partner claims, prioritizes terrorist reports in Learn, and delays random hidden bullets until round three. Still a scripted social-deduction lesson with original interviews, not human negotiation. |
| Cooperative Puzzle | The broadcast rotates a physical cooperative table through ten timed puzzles. | Three original, guaranteed-solvable puzzles with growing boards. Learn: 4×3 → 4×4 → 4×4 (3–4 pieces), unlimited hints, untimed. Standard: 4×4 → 6×4 → 6×6 (4–9 pieces), two hints, untimed. Expert: 6×6 → 8×6 → 8×8 (9–16 pieces), one hint, three minutes per board. Piece orientations are scrambled in scored modes; placement previews and highlighted hint anchors explain the controls. No physical-platform simulation. A fixed 16×16 broadcast board is not established by the available rules. |
| Rules Race | Personal/group rules change dice outcomes and prison incentives. | Explains rule triggers and office decisions. Learn starts with two tickets and accepts a top-two finish. Standard and Expert use the same short race rules and require first place. Full rule-block construction remains omitted. |
| Fragments of Memory | The broadcast gives a long study period and removes players when they pass; one wrong answer ends the match. | Standard study increased to 90 seconds, Expert 30. Learn is untimed and permits scene review and errors. Guaranteed limited teammate passes replace random bot failure. Original room artwork replaces the broadcast image. |
| Secret Number | Pairwise arithmetic tickets become useful through a network of contacts and exchanges. The old star-only graph was often underdetermined. | Contacts between any pair, duplicate protection, 12/8/6 contact budgets, a full constraint notebook, and an exact-sum triangle example. Rivals only declare a proven public number. Correctly deducing your own number completes the solo mission; original point formula remains displayed. No two-hour ticket market or deceptive alliances. |
| Word Tower | Category words must exhaust shared letters. | Explicit dictionary and reversible word construction retained. Learn uses words of at most four letters; Expert at least four. Physical stacking and team communication omitted. |
| Zoo | Each lot has a finite bag. Tied auctions repeat with the same tiles. Bidding into the smaller total group is central. | Two bags each containing four of each animal, tied-lot preservation, informed bot lot choices and lower Learn bids. Gravity, sequence scoring and doubling conditions retained. Placement happens after winning rather than being precommitted anonymously. Empty lots and exhausted budgets use disclosed solo shortcuts. |
| Scale Game | Broadcast minerals accumulate and cannot be removed; equal pans enable paid declarations, and wrong guesses can be followed by more investigation. Old exact equations exposed every answer. | Removed answer-leaking equations. A clearly labeled calibration variant teaches inequalities using reusable minerals and reference masses. Visible ranges, 40/26/22 weighing budgets, equality prerequisite, and wrong guesses costing a weighing. This deliberately differs from the broadcast inventory puzzle. |
| Laying Grass | Territory must connect to itself without touching rival edges; filled squares matter more than long strips. | Keeps these placement constraints, adds a square-building example, and varies bot placement consistency. Still a 12×12, one-rival version without powers or coupon queues. |
| Montage | False buzzes add penalties while the sequence continues; missing a repeat fails the round. Broadcast timing is three seconds. | False buzz stays on the current face and cannot be spammed. No random teammate rescue. Standard uses five seconds, Expert three, Learn manual advance and review rounds. Original portraits. |
| Equation High–Low | Broadcast betting includes hidden/open cards, special operations, Swing and card tie-breakers. Easy bots previously searched nearly everything. | Honest equation-training label, 6/24/144-expression bot search budgets, and a visible previous-showdown summary. Four cards, three operators and one wager remain a deliberate simplification. |
| Four-Player Three in a Row | Exposed colors, coverings and uncoverings matter. Any allied line can beat the guest. | Allies now value any allied win; Learn is one round, scored modes four. Guest identity remains visible, unlike the broadcast isolation task. |
| Nine Men’s Morris | Placement, mill capture protection, sliding and three-stone flying are key. | Those rules retained and tested; next-action guidance and practice undo added. One game replaces best of three. Bot remains a one-turn heuristic. |
| Hexagon | The target is revealed after hiding the numbers; only consecutive straight triples count. End-of-round scoring has no random extra award. | Targets favor multiple solutions, removes hidden bot bonus, limits attempts based only on imperfect bot memory, rejects bent triples without penalty, and provides visible practice numbers. Three rounds replace ten; visible answer history is a solo aid. |
| Blind Gomoku | The challenge combines five-in-a-row strategy with memory for ownership. | Learn keeps every stone face-up; scored modes retain only the latest pair. Practice undo and explicit blocking example. Short 9×9 board with no elimination stakes. |

## Sources

Daily rule sections, rather than episode strategy commentary, support the mechanics above:

- [Day 1: Virus and Cooperative Puzzle](https://namu.moe/w/데블스%20플랜(시즌%201)/1일차)
- [Day 2: Rules Race and Fragments of Memory](https://namu.moe/w/데블스%20플랜(시즌%201)/2일차)
- [Day 3: Secret Number and Word Tower](https://namu.moe/w/데블스%20플랜(시즌%201)/3일차)
- [Day 4: Zoo and Scale Game](https://namu.moe/w/데블스%20플랜(시즌%201)/4일차)
- [Day 5: Laying Grass and Montage](https://namu.moe/w/데블스%20플랜(시즌%201)/5일차)
- [Day 6: Equation High–Low and Four-Player Three in a Row](https://namu.moe/w/데블스%20플랜(시즌%201)/6일차)
- [Day 7: Nine Men’s Morris and Hexagon](https://namu.moe/w/데블스%20플랜(시즌%201)/7일차)
- [Episode 1 transcript: role and infection explanation](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?tv-show=the-devils-plan-2023&episode=s01e01)
- [Dongascience interview with KAIST puzzle analysts](https://www.dongascience.com/en/news/63008)

## Validation

Run `node --test tests/*.test.mjs`. Engine checks cover all fifteen games, seeded replay, exact puzzle tilings, resource conservation, board geometry, legal movement, completion, shared number constraints, binary-search solvability, practice timing, and false-buzz handling. Browser checks cover briefing, pair contacts, practice undo, independent saves, feedback export, and round transitions. These checks establish consistency and reachable solutions; difficulty still needs human feedback.

## Tinkering

- `dist/js/learning.js`: three-step briefings, examples, mode descriptions and turn prompts.
- `dist/js/data.js`: core rules and explicit solo differences.
- `dist/js/main-games.js`, `prize-games.js`, `final-games.js`: game state, rendering, actions, and timers.
- `dist/js/app.js`: independent saves, routes, feedback, round gates, practice undo.
- `dist/style.css`: existing visual design plus the learning interface.

Each engine uses `create(state)`, `view(state)`, `act(state, action, value, fields)`, and optional `tick(state)`. State stays serializable and seeded randomness is shared through `core.js`. Vercel serves `dist/` without a build dependency.
