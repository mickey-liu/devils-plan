# Difficulty across the collection

Select **Easy**, **Standard** or **Hard** at the top of the game room. This is the default for every new game; a saved match keeps the mode in which it started. Easy sessions have undo and practice results, with no mastery or piece rewards.

Easy teaches a short decision loop. Standard uses the full solo task. Hard removes helpers, increases information load or asks stronger bots to consider replies. Bots use their own private information and public boards; difficulty does not alter the fairness of dice. Human feedback is still needed to calibrate perceived difficulty.

| Game | Easy | Standard | Hard |
| --- | --- | --- | --- |
| The Virus Game | Four interviews per round; reports prioritize Terrorists; no hidden bullets. | Two interviews and one verified report per round; hidden bullets from round 3. | One interview per round; no priority suspect reports; hidden bullets from round 3. |
| Cooperative Puzzle | 3–4 pieces on 4×3 then 4×4 boards; unlimited hints; untimed. | 4 → 6 → 9 pieces on 4×4, 6×4 and 6×6 boards; two hints; untimed. | 9 → 12 → 16 pieces on 6×6, 8×6 and 8×8 boards; one hint; three minutes per board. |
| Rules Race | Start with three tickets; a top-two finish succeeds. | Start with one ticket; finish first. | No starting tickets; rivals use office rerolls and group rules strategically. Fair dice. |
| Fragments of Memory | Six simple questions; untimed study; review scene and learn from mistakes. | 90 seconds to study; two passes. | 30 seconds to study; one pass. |
| Secret Number | Numbers 11–30; 12 contacts; full candidate list; deduce your own number. | Numbers 1–100; 8 contacts; candidate count only; deduce your own number. | Numbers 1–100; 6 contacts; no candidate helper; deduce all four numbers. |
| Word Tower | Two short words per round; two teammate contributions. | Three words of mixed lengths; one teammate contribution. | Four words of at least four letters; no teammate contributions. |
| Zoo | Build one repeated-animal sequence; random-placement bots bid up to 4. | Bots favor lots matching their own patterns. | Beat bots that plan placements across the whole lot; bids up to 9. |
| Scale Game | Weights 1–10g; two known minerals; 24 weighings; range tracker and suggested comparison. | Weights 1–20g; one known mineral; 26 weighings; automatic range tracker. | Weights 1–20g; one known mineral; 22 weighings; track your own deductions. |
| Laying Grass | Five rounds, five tile choices; build any filled 2×2 square. | Nine rounds, three choices; beat the rival’s square and area. | Nine rounds, two choices; compact tactical rival; largest square wins. |
| Montage | Three shorter sequences; manual advance; seen-face gallery and review rounds. | Five seconds per portrait; no random teammate rescue. | Five longer sequences (12–15 unique portraits); three seconds per face. |
| Equation High–Low | Three hands; an equation hint for your own cards; bots sample 6 expressions. | Each bot samples 24 expressions. | Each bot searches all 144 arrangements. |
| Four-Player Three in a Row | One round against a less defensive guest, with tactical advice. | Keep the guest from winning four rounds. | Four rounds; the guest anticipates your next winning reply. |
| Nine Men’s Morris | Short lesson: form your first mill to win. Practice undo. | Bot looks for mills and immediate threats. | Full game; bot anticipates counter-mills and evaluates captures. |
| Hexagon | Numbers 1–5 stay visible; no competing bot. | 60-second study; bot tries at most three lines per round. | Numbers 1–12; 30-second study; stronger memory and up to five bot attempts. |
| Blind Gomoku | Connect three; every stone stays visible; practice undo. | Connect five; latest three pairs stay visible; tactical bot. | Connect five; only latest pair visible; bot plans double threats. |

## Configuration and validation

All mode parameters live in `dist/js/difficulty.js`; player-facing descriptions and mode-specific objectives live in `dist/js/learning.js`. Internal replay-link keys remain `relaxed`, `standard`, and `hard` for compatibility.

Run `node --test tests/*.test.mjs`. Tests cover all 45 game/mode combinations across replay seeds, reachable puzzle solutions, public-information deduction strategies, helper quotas, short Easy goals, and the rule/AI behavior that changes by difficulty. These are correctness checks, not a claim that all players will find every game equally hard.

Start a new board after this update. Previous boards remain in local storage until replaced, and the latest old active board is archived in the profile for export. Results and settings are preserved.
