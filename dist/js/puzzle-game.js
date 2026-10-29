import {gameDifficulty,difficultyFor as tuning} from './difficulty.js';
import {int,shuffle,range,esc,btn,note,metric,metrics,controls,grid,cell,log,finish,error,transform,shapeHTML,neighbors} from './core.js';

// These are original solo puzzles, not reconstructed broadcast silhouettes.
export const PUZZLE_LEVELS=Object.fromEntries(['relaxed','standard','hard'].map(mode=>[mode,gameDifficulty('puzzle',mode).sizes]));
const label=i=>String.fromCharCode(65+i);
const shapeKey=shape=>shape.map(([x,y])=>`${x},${y}`).sort().join('|');
function connected(cells,width){
  const remaining=new Set(cells),queue=[cells[0]];remaining.delete(cells[0]);
  for(let i=0;i<queue.length;i++)for(const n of neighbors(queue[i],width))if(remaining.delete(n))queue.push(n);
  return remaining.size===0;
}
function combinations(values,count){
  if(count===0)return [[]];
  return values.flatMap((v,i)=>combinations(values.slice(i+1),count-1).map(rest=>[v,...rest]));
}
// Start with a valid tiling, then repeatedly repartition adjacent pairs. Every
// mutation preserves full coverage and four connected cells per piece. Unlike
// unbounded backtracking, generation stays fast on the 16-piece Expert board.
function generateTiling(s,width,height){
  const pieces=[];
  if(height%2===0){
    for(let y=0;y<height;y+=2)for(let x=0;x<width;x+=2)pieces.push([y*width+x,y*width+x+1,(y+1)*width+x,(y+1)*width+x+1]);
  }else{
    // The 4×3 introductory board begins with three horizontal bars.
    for(let y=0;y<height;y++)pieces.push(range(width).map(x=>y*width+x));
  }
  for(let step=0;step<pieces.length*24;step++){
    const owners=Array(width*height);
    pieces.forEach((cells,id)=>cells.forEach(i=>owners[i]=id));
    const a=int(s,pieces.length);
    const adjacent=[...new Set(pieces[a].flatMap(i=>neighbors(i,width)).filter(i=>i<owners.length).map(i=>owners[i]).filter(id=>id!==a))];
    if(!adjacent.length)continue;
    const b=adjacent[int(s,adjacent.length)],union=[...pieces[a],...pieces[b]];
    const alternatives=combinations(union.slice(1),3).map(rest=>[union[0],...rest]).filter(cells=>connected(cells,width)&&connected(union.filter(i=>!cells.includes(i)),width));
    const chosen=alternatives[int(s,alternatives.length)];
    pieces[a]=chosen;pieces[b]=union.filter(i=>!chosen.includes(i));
  }
  return shuffle(s,pieces).map((cells,id)=>{
    const left=Math.min(...cells.map(i=>i%width)),top=Math.min(...cells.map(i=>Math.floor(i/width)));
    const solutionShape=cells.map(i=>[i%width-left,Math.floor(i/width)-top]);
    const shape=s.difficulty==='relaxed'?solutionShape:transform(solutionShape,int(s,4),Boolean(int(s,2)));
    let solutionRot=0,solutionFlip=false;
    for(let rot=0;rot<4;rot++)for(const flip of [false,true])if(shapeKey(transform(shape,rot,flip))===shapeKey(solutionShape)){solutionRot=rot;solutionFlip=flip;}
    return {id,shape,anchor:top*width+left,solutionRot,solutionFlip,placed:false};
  });
}
function deal(s){
  [s.width,s.height]=PUZZLE_LEVELS[s.difficulty][s.round-1];
  s.puzzleEdition=2;s.pieces=generateTiling(s,s.width,s.height);s.board=Array(s.width*s.height).fill(-1);
  s.selected=0;s.rot=0;s.flip=false;s.hints=0;s.hintAnchor=null;
  if(s.difficulty==='hard')s.deadline=Date.now()+180000;else delete s.deadline;
}
export function puzzlePlacement(s,anchor){
  const width=s.width||4,height=s.height||4,piece=s.pieces[s.selected];
  if(!Number.isInteger(anchor)||anchor<0||anchor>=s.board.length||!piece||piece.placed)return null;
  const x=anchor%width,y=Math.floor(anchor/width),shape=transform(piece.shape,s.rot,s.flip);
  const coords=shape.map(([dx,dy])=>[x+dx,y+dy]);
  if(coords.some(([cx,cy])=>cx>=width||cy>=height||s.board[cy*width+cx]!==-1))return null;
  return coords.map(([cx,cy])=>cy*width+cx);
}
function hintLimit(s){return tuning(s,'puzzle').hints;}
export const puzzle={
  create(s){s.round=1;deal(s);},
  view(s){
    const width=s.width||4,height=s.height||4,selected=s.pieces[s.selected];
    return metrics(metric('Puzzle',`${Math.min(3,s.round)} / 3`),metric('Board',`${width} × ${height}`),metric('Pieces placed',`${s.pieces.filter(p=>p.placed).length} / ${s.pieces.length}`),metric('Time',s.deadline?'<span data-countdown>180s</span>':'Untimed'))+
      `<p class="puzzle-instruction">Selected: <b>piece ${label(s.selected)}</b>. Hover to preview, then click its <b>top-left bounding-box corner</b>. All ${s.pieces.length} pieces must fit.</p>`+
      grid(width,s.board.map((v,i)=>cell(i,v===-1?'':label(v),`${v===-1?'puzzle-empty':`puzzle-fill tile-${v}`} ${s.hintAnchor===i?'hint-anchor':''}`)),'puzzle-board expanded-puzzle')+
      `<div class="piece-tray puzzle-tray" aria-label="Puzzle pieces">${s.pieces.map((p,i)=>btn(`<small>${label(i)}</small>${shapeHTML(i===s.selected?transform(p.shape,s.rot,s.flip):p.shape)}`,'piece',i,`${i===s.selected?'selected':''} tile-${i}`,p.placed)).join('')}</div>`+
      controls(btn('Rotate ↻','rotate'),btn('Reflect ⇄','flip'),btn(`Ask teammate${s.difficulty==='relaxed'?'':` · ${Math.max(0,hintLimit(s)-(s.hints||0))} left`}`,'hint','','',(s.hints||0)>=hintLimit(s)))+
      note(`Click an occupied piece to lift it. ${s.difficulty==='hard'?'Hard: three minutes per board, one hint.':'This session is untimed.'} These are original grid puzzles; the show used geometric silhouettes and rotating player access.`);
  },
  act(s,action,value){
    if(action==='piece'){const id=Number(value);if(!s.pieces[id]||s.pieces[id].placed)return;s.selected=id;s.rot=0;s.flip=false;s.hintAnchor=null;return;}
    if(action==='rotate'){s.rot=(s.rot+1)%4;s.hintAnchor=null;return;}
    if(action==='flip'){s.flip=!s.flip;s.hintAnchor=null;return;}
    if(action==='hint'){
      if((s.hints||0)>=hintLimit(s))return;
      const p=s.pieces.find(p=>!p.placed);if(!p)return;
      s.hints=(s.hints||0)+1;s.selected=p.id;s.rot=p.solutionRot||0;s.flip=p.solutionFlip||false;s.hintAnchor=p.anchor;
      const width=s.width||4;
      log(s,`Mira: piece ${label(p.id)} is oriented for row ${Math.floor(p.anchor/width)+1}, column ${p.anchor%width+1}. The outlined cell is its anchor; you may need to lift blocking pieces.`);return;
    }
    if(action!=='cell')return;
    const i=Number(value),cells=puzzlePlacement(s,i);
    if(!Number.isInteger(i)||i<0||i>=s.board.length)return;
    if(s.board[i]!==-1&&!cells){
      const id=s.board[i];s.board=s.board.map(v=>v===id?-1:v);s.pieces[id].placed=false;s.selected=id;s.rot=0;s.flip=false;s.hintAnchor=null;return;
    }
    if(!cells){error(s,'That piece overlaps another or crosses the board. Hover over a different anchor, or rotate it.');return;}
    const p=s.pieces[s.selected];cells.forEach(i=>s.board[i]=p.id);p.placed=true;s.hintAnchor=null;
    log(s,`Piece ${label(p.id)} placed. ${s.pieces.filter(p=>!p.placed).length} remaining.`);
    if(s.board.every(v=>v!==-1)){
      if(s.round===3)finish(s,true,'Everything falls into place','All three progressively larger puzzles are complete.',3);
      else{s.round++;deal(s);log(s,`Puzzle complete. Next: ${s.width}×${s.height}, ${s.pieces.length} pieces.`);}
    }else{s.selected=s.pieces.findIndex(p=>!p.placed);s.rot=0;s.flip=false;}
  },
  tick(s){if(s.deadline&&Date.now()>=s.deadline){finish(s,false,'The platform moves on',`The three-minute limit expired on puzzle ${s.round}. Try Standard for untimed practice.`,s.round-1);return true;}}
};
