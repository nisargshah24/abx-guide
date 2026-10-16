let DB={};
const $=s=>document.querySelector(s);
const siteEl=$("#site"), searchEl=$("#search"), resultEl=$("#result"), suggEl=$("#suggestions");
const cols=["MRSA","MSSA","Strep","Enterococcus","E. coli","Klebsiella","Pseudomonas","Anaerobes","Atypicals"];

Promise.all([
 fetch("data/antibiotics.json").then(r=>r.json()),
 fetch("data/organisms.json").then(r=>r.json()),
 fetch("data/syndromes.json").then(r=>r.json()),
 fetch("data/antibiograms.json").then(r=>r.json())
]).then(([antibiotics,organisms,syndromes,antibiograms])=>{
 DB={antibiotics,organisms,syndromes,antibiograms}; renderSpectrum(); bind();
}).catch(()=>{resultEl.innerHTML="<h2>Data could not load</h2><p>Make sure this is being served through GitHub Pages rather than opened as a local file.</p>"});

function bind(){
 searchEl.addEventListener("input",()=>suggest(searchEl.value));
 searchEl.addEventListener("keydown",e=>{if(e.key==="Enter"){find(searchEl.value);suggEl.innerHTML=""}});
 document.querySelectorAll("[data-query]").forEach(b=>b.onclick=()=>{searchEl.value=b.dataset.query;find(b.dataset.query)});
 siteEl.onchange=()=>{if(searchEl.value.trim())find(searchEl.value)};
}
function allItems(){
 return [
  ...DB.antibiotics.map(x=>({type:"antibiotic",label:x.name,q:x.name})),
  ...DB.organisms.map(x=>({type:"organism",label:x.name,q:x.name})),
  ...DB.syndromes.map(x=>({type:"syndrome",label:x.name,q:x.id.toUpperCase()}))
 ];
}
function suggest(q){
 q=q.trim().toLowerCase(); if(!q){suggEl.innerHTML="";return}
 const hits=allItems().filter(x=>x.label.toLowerCase().includes(q)||x.q.toLowerCase().includes(q)).slice(0,6);
 suggEl.innerHTML=hits.map(x=>`<button data-s="${esc(x.q)}"><b>${esc(x.label)}</b> · ${x.type}</button>`).join("");
 suggEl.querySelectorAll("button").forEach(b=>b.onclick=()=>{searchEl.value=b.dataset.s;find(b.dataset.s);suggEl.innerHTML=""});
}
function find(q){
 const x=q.trim().toLowerCase();
 let a=DB.antibiotics.find(v=>v.name.toLowerCase()===x||v.id===x);
 if(a)return renderAntibiotic(a);
 let o=DB.organisms.find(v=>v.name.toLowerCase()===x||v.aliases.some(z=>z===x));
 if(o)return renderOrganism(o);
 let s=DB.syndromes.find(v=>v.id===x||v.name.toLowerCase()===x||v.aliases.some(z=>z===x));
 if(s)return renderSyndrome(s);
 resultEl.innerHTML=`<div class="eyebrow">NO MATCH</div><h2>${esc(q)}</h2><p>Try an antibiotic, organism, CAP, or HAP.</p>`;
}
function renderAntibiotic(a){
 const site=DB.antibiograms[siteEl.value];
 const covered=Object.entries(a.coverage).filter(([,v])=>v==="yes").map(([k])=>k);
 const absent=Object.entries(a.coverage).filter(([,v])=>v==="no").map(([k])=>k);
 resultEl.innerHTML=`<div class="eyebrow">ANTIBIOTIC · ${esc(site.name)}</div><div class="result-grid"><div><h2>${esc(a.name)}</h2><p class="muted">${esc(a.class)}</p><h3>Expected spectrum</h3><p>${covered.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</p><p class="muted">No reliable activity: ${absent.map(esc).join(", ")}</p><h3>Common uses</h3><p>${a.uses.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</p></div><div><h3>Local antibiogram</h3><p class="placeholder">${esc(site.status)}</p><p class="source">Clinical values are deliberately not populated with demo percentages.</p></div></div>`;
}
function renderOrganism(o){
 const site=DB.antibiograms[siteEl.value];
 const names=o.active.map(id=>DB.antibiotics.find(a=>a.id===id)).filter(Boolean);
 resultEl.innerHTML=`<div class="eyebrow">ORGANISM · ${esc(site.name)}</div><div class="result-grid"><div><h2>${esc(o.name)}</h2><h3>Agents in prototype with expected activity</h3><p>${names.map(a=>`<span class="tag">${esc(a.name)}</span>`).join("")}</p><p class="muted">${esc(o.note)}</p></div><div><h3>Local susceptibility</h3><p class="placeholder">${esc(site.status)}</p></div></div>`;
}
function renderSyndrome(s){
 const site=DB.antibiograms[siteEl.value];
 resultEl.innerHTML=`<div class="eyebrow">SYNDROME · ${esc(site.name)}</div><h2>${esc(s.name)}</h2><p>${esc(s.summary)}</p><h3>Recommended empiric therapy</h3><p class="placeholder">${esc(s.status)}</p><h3>Duration</h3><p class="placeholder">Will be populated from validated institutional guidance.</p><p class="source">Planned source: current UCSF IDMP / site-specific guidance with source URL and review date.</p>`;
}
function renderSpectrum(){
 $("#spectrum").innerHTML=`<thead><tr><th>Antibiotic</th>${cols.map(c=>`<th><button class="org-link" data-org="${esc(c)}">${esc(c)}</button></th>`).join("")}</tr></thead><tbody>${DB.antibiotics.map(a=>`<tr><td><button class="drug-link" data-drug="${a.id}">${esc(a.name)}</button><br><small class="muted">${esc(a.class)}</small></td>${cols.map(c=>cell(a.coverage[c])).join("")}</tr>`).join("")}</tbody>`;
 document.querySelectorAll("[data-drug]").forEach(b=>b.onclick=()=>{const a=DB.antibiotics.find(x=>x.id===b.dataset.drug);searchEl.value=a.name;renderAntibiotic(a);scrollTo({top:0,behavior:"smooth"})});
 document.querySelectorAll("[data-org]").forEach(b=>b.onclick=()=>{const o=DB.organisms.find(x=>x.name.toLowerCase().includes(b.dataset.org.toLowerCase())||x.aliases?.some(z=>z.includes(b.dataset.org.toLowerCase())));if(o){searchEl.value=o.name;renderOrganism(o);scrollTo({top:0,behavior:"smooth"})}});
}
function cell(v){return v==="yes"?'<td class="yes">●</td>':v==="variable"?'<td class="variable">◐</td>':'<td class="no">○</td>'}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
