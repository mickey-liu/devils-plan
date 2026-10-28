export function random(s){s.seed=(s.seed+0x6D2B79F5)>>>0;let t=s.seed;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}
export const int=(s,n)=>Math.floor(random(s)*n);
export const pick=(s,a)=>a[int(s,a.length)];
export function shuffle(s,a){a=[...a];for(let i=a.length-1;i>0;i--){let j=int(s,i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export const range=n=>Array.from({length:n},(_,i)=>i);
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const btn=(label,act,value='',cls='',disabled=false)=>`<button class="btn ${cls}" data-act="${act}" data-value="${esc(value)}" ${disabled?'disabled':''}>${label}</button>`;
export const input=(id,label,value='',min=0,max=100)=>`<label class="field">${label}<input id="${id}" type="number" min="${min}" max="${max}" value="${esc(value)}" inputmode="numeric"></label>`;
export const select=(id,label,options,value)=>`<label class="field">${label}<select id="${id}">${options.map(([v,t])=>`<option value="${v}" ${String(v)===String(value)?'selected':''}>${t}</option>`).join('')}</select></label>`;
export const note=(text,kind='')=>`<div class="game-note ${kind}">${text}</div>`;
export const metric=(label,value)=>`<div class="game-metric"><span>${label}</span><strong>${value}</strong></div>`;
export const metrics=(...items)=>`<div class="game-metrics">${items.join('')}</div>`;
export const controls=(...items)=>`<div class="controls">${items.join('')}</div>`;
export const grid=(n,cells,cls='')=>`<div class="board grid-board ${cls}" style="--cols:${n}">${cells.join('')}</div>`;
export const cell=(i,label='',cls='',disabled=false)=>`<button class="cell ${cls}" data-act="cell" data-value="${i}" aria-label="Cell ${i+1}${label?': '+esc(String(label).replace(/<[^>]*>/g,'')):''}" ${disabled?'disabled':''}>${label}</button>`;
export function log(s,text){s.logs.unshift(text);s.logs=s.logs.slice(0,40);}
export function finish(s,win,title,detail,score=''){if(s.outcome)return;s.outcome={win,title,detail,score};log(s,title+'. '+detail);}
export function error(s,text){s.message=text;}
export const chance=s=>s.difficulty==='relaxed'?.4:s.difficulty==='hard'?.9:.68;
export const unique=a=>[...new Set(a)];
export const clone=o=>JSON.parse(JSON.stringify(o));
export function lineSets(n,k){let out=[];for(let y=0;y<n;y++)for(let x=0;x<n;x++)for(let [dx,dy] of [[1,0],[0,1],[1,1],[-1,1]]){if(x+(k-1)*dx<0||x+(k-1)*dx>=n||y+(k-1)*dy>=n)continue;out.push(range(k).map(i=>(y+i*dy)*n+x+i*dx));}return out;}
export function neighbors(i,n,diagonal=false){let out=[];let x=i%n,y=Math.floor(i/n);for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){if(!(dx||dy)||(!diagonal&&dx&&dy))continue;let a=x+dx,b=y+dy;if(a>=0&&a<n&&b>=0&&b<n)out.push(b*n+a);}return out;}
export function largestSquare(board,n,p){let dp=Array(n*n).fill(0),best=0;for(let y=0;y<n;y++)for(let x=0;x<n;x++){let i=y*n+x;if(board[i]===p){dp[i]=x&&y?1+Math.min(dp[i-1],dp[i-n],dp[i-n-1]):1;best=Math.max(best,dp[i]);}}return best;}
export function transform(shape,rotation=0,flip=false){let a=shape.map(([x,y])=>[flip?-x:x,y]);for(let r=0;r<rotation%4;r++)a=a.map(([x,y])=>[-y,x]);let mx=Math.min(...a.map(p=>p[0])),my=Math.min(...a.map(p=>p[1]));return a.map(([x,y])=>[x-mx,y-my]);}
export const SHAPES=[[[0,0],[1,0],[0,1],[1,1]],[[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[0,2],[1,2]],[[0,0],[1,0],[2,0],[1,1]],[[1,0],[2,0],[0,1],[1,1]],[[0,0],[1,0],[0,1]],[[0,0],[1,0],[2,0],[2,1],[2,2]],[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]]];
export const shapeHTML=(shape,cls='')=>{let w=Math.max(...shape.map(p=>p[0]))+1,h=Math.max(...shape.map(p=>p[1]))+1;return `<span class="mini-shape ${cls}" style="--w:${w};--h:${h}">${range(w*h).map(i=>`<i class="${shape.some(([x,y])=>i===y*w+x)?'filled':''}"></i>`).join('')}</span>`;};
export function parseIntField(p,key,min,max){let x=Number(p[key]);return p[key]!==''&&Number.isInteger(x)&&x>=min&&x<=max?x:null;}
