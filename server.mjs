import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {spawn} from 'node:child_process';
const root=path.resolve(fileURLToPath(new URL('./dist/',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}if((await stat(file)).isDirectory())file=path.join(file,'index.html');let content=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(content);}catch{res.writeHead(404);res.end('Not found');}});
let port=Number(process.env.PORT||4173);
server.on('error',err=>{if(err.code==='EADDRINUSE'&&port<4185){port++;server.listen(port,'127.0.0.1');}else{console.error(err.message);process.exit(1);}});
server.listen(port,'127.0.0.1',()=>{
  const url=`http://127.0.0.1:${port}`;
  console.log(`The Devil's Plan · Local edition\n${url}\nPress Ctrl+C to stop.`);
  if(process.argv.includes('--open')){
    const command=process.platform==='darwin'?'open':process.platform==='win32'?'explorer':'xdg-open';
    const child=spawn(command,[url],{stdio:'ignore'});
    child.on('error',()=>console.log('Open the URL above in your browser.'));
  }
});
