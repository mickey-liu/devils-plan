// Coaching describes public rules and visible state; it never reads an opponent’s secret.
export {MODES} from './difficulty.js';
import {gameDifficulty} from './difficulty.js';
export const LESSONS={
virus:{steps:['Read the verified journalist report in the log.','Select a seat; interview before deciding whether to shoot.','Choose a research candidate, then end the round.'],example:'A Citizen claim can be a lie. A journalist report is verified. Shooting a verified Terrorist is safer than shooting an unverified claimant.',warning:'You play the neutral Officer: eliminate both Terrorists. A citizen cure does not win your mission.',modes:['Four interviews per round; reports prioritize Terrorists; no hidden bullets.','Two interviews and one verified report per round; hidden bullets from round 3.','One interview per round; no priority suspect reports; hidden bullets from round 3.']},
race:{steps:['Choose a personal rule before the first roll.','Roll, or spend an escape ticket if imprisoned.','At an office, choose a benefit before the bots continue.'],example:'With rule 1, any player going to prison gives you an escape ticket. Save tickets until you are imprisoned.',warning:'An escape ticket frees you but uses this turn. The first finisher wins in scored modes.',modes:['Start with three tickets; a top-two finish succeeds.','Start with one ticket; finish first.','No starting tickets; rivals use office rerolls and group rules strategically. Fair dice.']},
number:{steps:['Choose two different players and a ticket type.','Build a connected notebook, including contacts between bots.','Combine clues, then submit your own number and optional others.'],example:'If You + Sage = 34, You + Mira = 46, and Sage + Mira = 40, your number is (34 + 46 − 40) ÷ 2 = 20.',warning:'Sums at 20 or below and 180 or above are ranges. Repeating a contact gives no new information.',modes:['Numbers 11–30; 12 contacts; full candidate list; deduce your own number.','Numbers 1–100; 8 contacts; candidate count only; deduce your own number.','Numbers 1–100; 6 contacts; no candidate helper; deduce all four numbers.']},
zoo:{steps:['Read your animal sequence and doubling condition.','Choose a lot and submit a sealed bid. The smaller group total wins.','If you are its highest bidder, drop all four tiles into columns.'],example:'A totals 5 credits and B totals 9: A wins. The highest individual bidder within A controls placement. Everyone pays, including B.',warning:'A tied auction refunds bids and repeats the same lots. Tiles fall to the lowest open cell.',modes:['Build one repeated-animal sequence; random-placement bots bid up to 4.','Bots favor lots matching their own patterns.','Beat bots that plan placements across the whole lot; bids up to 9.']},
grass:{steps:['Select a shape, then rotate or reflect it.','Hover over the board to preview its top-left anchor.','Place beside your green territory; build a filled square.'],example:'A 3×3 square needs all nine interior cells. A long strip with more total cells still loses to a larger filled square.',warning:'Touch your own land along an edge. Never touch rival land along an edge. Diagonal contact alone does not connect your land.',modes:['Five rounds, five tile choices; build any filled 2×2 square.','Nine rounds, three choices; beat the rival’s square and area.','Nine rounds, two choices; compact tactical rival; largest square wins.']},
equation:{steps:['Choose the order of all four number cards.','Use +, − and ÷ exactly once; division happens first.','Pick Low or High, choose a wager, then show down.'],example:'7 + 9 ÷ 3 − 2 = 8. That is distance 7 from Low (1), or distance 12 from High (20).',warning:'This is an equation-training variant. The show also had staged betting, special cards, Swing and card tie-breakers.',modes:['Three hands; an equation hint for your own cards; bots sample 6 expressions.','Each bot samples 24 expressions.','Each bot searches all 144 arrangements.']},
puzzle:{steps:['Select a lettered piece from the tray.','Rotate or reflect; click its top-left anchor on the board.','Fill every cell. Click an occupied piece to lift it.'],example:'A shape with an empty top-left corner still uses its bounding box as the anchor. The preview in the tray shows its orientation.',warning:'The boards grow each round. A placement can fit now but block the remaining pieces. Standard and Hard also scramble the initial piece orientations.',modes:['3–4 pieces on 4×3 then 4×4 boards; unlimited hints; untimed.','4 → 6 → 9 pieces on 4×4, 6×4 and 6×6 boards; two hints; untimed.','9 → 12 → 16 pieces on 6×6, 8×6 and 8×8 boards; one hint; three minutes per board.']},
memory:{steps:['Study counts, colors, text and the clock.','Hide the scene when ready.','Answer each question; use a teammate pass when unsure.'],example:'Count the books separately from their colors. For the clock, remember the short hour hand rather than the long minute hand.',warning:'Standard and Hard end on one wrong answer. Teammate passes are guaranteed help in this solo edition.',modes:['Six simple questions; untimed study; review scene and learn from mistakes.','90 seconds to study; two passes.','30 seconds to study; one pass.']},
words:{steps:['Read the category and available letter tiles.','Build the required number of different words from the accepted dictionary.','Use every letter; return a word if the remainder gets stuck.'],example:'CAT + DOG + OWL uses C A T D O G O W L. A different valid word may leave an impossible remainder, so returning words is part of the puzzle.',warning:'Only the visible dictionary is accepted. The briefing lists how many words and teammate contributions your mode allows.',modes:['Two short words per round; two teammate contributions.','Three words of mixed lengths; one teammate contribution.','Four words of at least four letters; no teammate contributions.']},
scale:{steps:['Choose an unknown mineral and a reference mass.','Use < or > to halve its remaining range.','Record an equal weighing, then declare all five weights.'],example:'Gold > 10g narrows it to 11–20g. Compare to 15g next. Repeat until one value remains, then confirm equality.',warning:'This is a calibration lesson: reusable pans and reference grams are solo changes. The show used accumulating, nonremovable minerals.',modes:['Weights 1–10g; two known minerals; 24 weighings; range tracker and suggested comparison.','Weights 1–20g; one known mineral; 26 weighings; automatic range tracker.','Weights 1–20g; one known mineral; 22 weighings; track your own deductions.']},
montage:{steps:['Start the sequence and remember each exact portrait.','Choose New face if it has not appeared this round.','Buzz only when the whole portrait repeats.'],example:'The same glasses are not enough. Compare hair, shirt, complexion and expression as a group.',warning:'A false buzz costs one mistake and keeps the portrait on screen. Missing a repeat ends scored play; ten false buzzes also ends it.',modes:['Three shorter sequences; manual advance; seen-face gallery and review rounds.','Five seconds per portrait; no random teammate rescue.','Five longer sequences (12–15 unique portraits); three seconds per face.']},
three:{steps:['Place a red reserve piece, or choose Move exposed piece.','Moving uses an exposed red piece and an adjacent destination.','Help any teammate make three; prevent blue from making three.'],example:'Covering a blue top piece can block a line. Moving red away can uncover a blue piece and accidentally give the guest a line.',warning:'Only top colors count. Stacks hold at most three. Diagonal moves and diagonal lines count.',modes:['One round against a less defensive guest, with tactical advice.','Keep the guest from winning four rounds.','Four rounds; the guest anticipates your next winning reply.']},
morris:{steps:['Place nine ivory stones, one per turn.','Form a connected line of three to capture a dark stone.','After placement, slide along edges; with three stones you may fly.'],example:'Three stones on one side of a square form a mill. Capture an opponent outside a mill if one is available.',warning:'In Standard and Hard, win by reducing the opponent to two stones or leaving no legal move. Easy ends at your first mill. The connecting lines define legal movement.',modes:['Short lesson: form your first mill to win. Practice undo.','Bot looks for mills and immediate threats.','Full game; bot anticipates counter-mills and evaluates captures.']},
hex:{steps:['Study the numbers at their lettered positions.','Hide them to reveal the target.','Choose three consecutive cells in a straight line that sum to the target.'],example:'A line with 3, 7 and 5 totals 15. Bent triples do not count, even if their sum is correct.',warning:'Correct +1; wrong sum or repeated answer −1. Invalid geometry gets a free correction. Ending a round gives no hidden bonus to the bot.',modes:['Numbers 1–5 stay visible; no competing bot.','60-second study; bot tries at most three lines per round.','Numbers 1–12; 30-second study; stronger memory and up to five bot attempts.']},
gomoku:{steps:['Place an ivory stone on an empty intersection.','Track your stones and the dealer’s replies.','Connect five in a straight line while blocking threats.'],example:'A dark line one stone short of winning is an immediate threat. Block its open end before extending your own line.',warning:'Standard reveals the latest three pairs; Hard reveals only the latest pair. Occupied intersections remain unavailable.',modes:['Connect three; every stone stays visible; practice undo.','Connect five; latest three pairs stay visible; tactical bot.','Connect five; only latest pair visible; bot plans double threats.']}
};
export function studyTime(id,mode){return gameDifficulty(id,mode).study||30;}
export function turnGuide(s){
const steps=LESSONS[s.id].steps;let index=0;
switch(s.id){
case 'virus':index=s.shot||!s.talks?2:s.asked.length?1:0;break;
case 'race':index=s.phase==='setup'?0:s.office?2:1;break;
case 'number':index=s.left<=2?2:s.contacts.length?1:0;break;
case 'zoo':index=s.phase==='place'?2:1;break;
case 'grass':index=s.rot||s.flip?2:0;break;
case 'equation':index=s.order.length===4?2:s.order.length?1:0;break;
case 'puzzle':index=s.board.some(x=>x!==-1)?2:1;break;
case 'memory':index=s.phase==='quiz'?2:0;break;
case 'words':index=s.used.length?2:1;break;
case 'scale':index=s.balanced&&s.bounds.every(([a,b])=>a===b)?2:s.history.length?1:0;break;
case 'montage':index=s.phase==='ready'?0:s.seen.includes(s.faces[s.index])?1:1;break;
case 'three':index=s.selected>=0?1:0;break;
case 'morris':index=s.capture?1:s.reserve[0]?0:2;break;
case 'hex':index=s.phase==='study'?0:2;break;
case 'gomoku':index=0;break;
}
return {steps,index,text:steps[index]};
}

export function objectiveFor(game,mode){
  const cfg=gameDifficulty(game.id,mode);
  const goals={
    race:mode==='relaxed'?'Finish in the top two.':game.goal,
    number:cfg.all?'Deduce all four secret numbers.':'Deduce your own secret number; other guesses are optional.',
    zoo:cfg.goal==='sequence'?'Build at least one of your three-animal sequences.':game.goal,
    grass:cfg.goal?'Build a filled 2×2 square within five rounds.':game.goal,
    equation:`Finish ${cfg.hands} hands with more than your starting 25 chips.`,
    memory:`Answer ${cfg.questions} questions${cfg.review?', with scene review whenever you need it':''}.`,
    words:`Use every letter in exactly ${cfg.count} different category words, for three rounds.`,
    scale:`Deduce five weights from 1–${cfg.max}g. ${cfg.known} ${cfg.known===1?'mineral is':'minerals are'} known.`,
    montage:`Identify the exact repeated portrait in ${cfg.rounds} rounds.`,
    three:`Keep the blue guest from winning ${cfg.rounds===1?'one round':'all four rounds'}.`,
    morris:cfg.goal==='first-mill'?'Form your first mill of three connected ivory stones.':game.goal,
    gomoku:`Connect ${cfg.line} ivory stones in a straight line before the dealer.`,
    hex:cfg.visible?'Find valid target-sum lines on three visible boards.':game.goal
  };
  return goals[game.id]||game.goal;
}
