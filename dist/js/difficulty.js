// One tuning table for the whole collection. Internal keys preserve old links.
export const MODES={relaxed:'Easy',standard:'Standard',hard:'Hard'};
export const MODE_DESCRIPTIONS={relaxed:'Short, guided sessions. More information, hints and undo. Practice results do not earn mastery.',standard:'Full solo rules with moderate help and time to think.',hard:'More demanding puzzles, fewer aids and stronger tactical opponents. No secret information for bots.'};
const profiles={
  virus:[{talks:4,bullets:false},{talks:2,bullets:true},{talks:1,bullets:true}],
  race:[{tickets:3,rank:2,office:'ticket'},{tickets:1,rank:1,office:'ticket'},{tickets:0,rank:1,office:'strategic'}],
  number:[{min:11,max:30,contacts:12,helper:'list',all:false},{min:1,max:100,contacts:8,helper:'count',all:false},{min:1,max:100,contacts:6,helper:'none',all:true}],
  zoo:[{bidMax:4,pattern:'repeat',goal:'sequence',placement:'random'},{bidMax:7,pattern:'mixed',goal:'top',placement:'greedy'},{bidMax:9,pattern:'mixed',goal:'top',placement:'lookahead'}],
  grass:[{rounds:5,offers:5,goal:2,noise:50},{rounds:9,offers:3,goal:0,noise:12},{rounds:9,offers:2,goal:0,noise:1}],
  equation:[{hands:3,search:6,hints:true},{hands:5,search:24,hints:false},{hands:5,search:144,hints:false}],
  puzzle:[{sizes:[[4,3],[4,4],[4,4]],hints:Infinity,seconds:0},{sizes:[[4,4],[6,4],[6,6]],hints:2,seconds:0},{sizes:[[6,6],[8,6],[8,8]],hints:1,seconds:180}],
  memory:[{questions:6,study:0,review:true,passes:2},{questions:10,study:90,review:false,passes:2},{questions:10,study:30,review:false,passes:1}],
  words:[{count:2,min:3,max:4,help:2},{count:3,min:3,max:10,help:1},{count:4,min:4,max:10,help:0}],
  scale:[{max:10,known:2,limit:24,bounds:true},{max:20,known:1,limit:26,bounds:true},{max:20,known:1,limit:22,bounds:false}],
  montage:[{rounds:3,faces:4,seconds:0,review:true},{rounds:5,faces:5,seconds:5,review:false},{rounds:5,faces:11,seconds:3,review:false}],
  three:[{rounds:1,guestNoise:400,lookahead:false},{rounds:4,guestNoise:10,lookahead:false},{rounds:4,guestNoise:1,lookahead:true}],
  morris:[{goal:'first-mill',noise:180,lookahead:false},{goal:'full-game',noise:15,lookahead:false},{goal:'full-game',noise:1,lookahead:true}],
  hex:[{max:5,study:0,botAttempts:0,recall:0,visible:true},{max:9,study:60,botAttempts:3,recall:.68,visible:false},{max:12,study:30,botAttempts:5,recall:.9,visible:false}],
  gomoku:[{line:3,visiblePairs:Infinity,noise:200,forks:false},{line:5,visiblePairs:3,noise:35,forks:false},{line:5,visiblePairs:1,noise:1,forks:true}]
};
export const gameDifficulty=(id,mode='standard')=>profiles[id][mode==='relaxed'?0:mode==='hard'?2:1];
export const difficultyFor=(s,id=s.id)=>gameDifficulty(id,s.difficulty);
export const DIFFICULTY_GAME_IDS=Object.keys(profiles);
