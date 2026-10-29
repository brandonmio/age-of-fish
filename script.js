const GROUPS = {
  jawless:{name:"Jawless fish",color:"var(--g-jawless)"},
  placoderm:{name:"Armored fish",color:"var(--g-placoderm)"},
  shark:{name:"Sharks and spiny sharks",color:"var(--g-shark)"},
  lobe:{name:"Lobe-finned fish",color:"var(--g-lobe)"},
  ray:{name:"Ray-finned fish",color:"var(--g-ray)"}
};
// from/to in Ma (millions of years ago), approximate
const FISH = [
  {n:"Birkenia",g:"jawless",from:435,to:420,size:"about 10 cm",era:"Silurian",t:"A small jawless fish covered in rows of scales, with a tail that turned downward. It likely swam near the bottom and sifted food from the water."},
  {n:"Thelodus",g:"jawless",from:435,to:390,size:"up to about 20 cm",era:"Silurian to Devonian",t:"A jawless fish with a skin of tiny, tooth-like scales instead of large plates. Its scales are common fossils and help date rocks."},
  {n:"Guiyu",g:"lobe",from:425,to:419,size:"about 30 cm",era:"Late Silurian",t:"Found in China, Guiyu is one of the oldest known bony fish with a mostly complete skeleton. It sits near the split between lobe-finned and ray-finned fish."},
  {n:"Entelognathus",g:"placoderm",from:424,to:419,size:"about 20 cm",era:"Late Silurian",t:"An armored fish from China with a jaw built from the same kinds of bones seen in bony fish, a surprise that changed ideas about early jaw evolution."},
  {n:"Pteraspis",g:"jawless",from:415,to:395,size:"about 20 cm",era:"Early Devonian",t:"A jawless fish with a bony shield over its head and a long snout-like beak. It was likely a slow, bottom-hugging feeder."},
  {n:"Cephalaspis",g:"jawless",from:415,to:390,size:"about 20 to 30 cm",era:"Early Devonian",t:"Its broad, horseshoe-shaped head shield sat over a flat underside. Eyes on top of the head suggest it lived on the seafloor and rivers."},
  {n:"Climatius",g:"shark",from:415,to:400,size:"about 7 to 10 cm",era:"Early Devonian",t:"A small spiny shark, or acanthodian, with strong spines in front of its fins and several extra pairs along its belly."},
  {n:"Cheirolepis",g:"ray",from:390,to:370,size:"about 55 cm",era:"Middle to Late Devonian",t:"An early ray-finned fish with small scales and a big mouth. It was a quick predator and probably ate other fish."},
  {n:"Eusthenopteron",g:"lobe",from:385,to:375,size:"about 1 m",era:"Late Devonian",t:"A lobe-finned predator whose fins held a pattern of bones, similar to the arm and leg bones of early land animals."},
  {n:"Dunkleosteus",g:"placoderm",from:382,to:359,size:"estimates of 3 to 6 m",era:"Late Devonian",t:"A top predator with bony plates on its head and sharp bony blades in place of teeth. It is one of the largest armored fish known."},
  {n:"Tiktaalik",g:"lobe",from:380,to:370,size:"about 1.2 to 2.7 m",era:"Late Devonian",t:"A shallow-water fish with a flat head, a neck, and strong fin bones. It shows features partway between fish and four-legged animals."},
  {n:"Bothriolepis",g:"placoderm",from:385,to:359,size:"about 30 cm",era:"Late Devonian",t:"A box-armored fish with jointed, arm-like pectoral fins. Its fossils turn up on almost every continent."},
  {n:"Cladoselache",g:"shark",from:375,to:360,size:"about 1.5 to 2 m",era:"Late Devonian",t:"An early shark with a streamlined, torpedo-shaped body and a strong tail. It had a skeleton of cartilage and pointed teeth."}
];

function fishSVG(g){
  const body = g==="shark" ? "M8 25 C30 8 85 12 104 25 C85 38 30 42 8 25Z" : g==="jawless" ? "M10 25 C35 14 80 16 100 25 C80 34 35 36 10 25Z" : "M10 25 C30 6 82 6 102 25 C82 44 30 44 10 25Z";
  let x = `<path d="${body}" fill="currentColor" opacity=".9"/>`;
  x += g==="shark" ? `<path d="M102 25 L118 8 L112 25 L118 42Z" fill="currentColor"/><path d="M55 14 L66 2 L72 15Z" fill="currentColor"/>`
     : g==="jawless" ? `<path d="M100 25 L116 15 L116 36Z" fill="currentColor"/>`
     : `<path d="M100 25 L116 10 L112 25 L116 40Z" fill="currentColor"/>`;
  if(g==="placoderm") x += `<path d="M10 25 C14 12 40 10 50 14 L50 36 C40 40 14 38 10 25Z" fill="#000" opacity=".28"/><path d="M50 14 L50 36" stroke="var(--bg)" stroke-width="1.5"/>`;
  if(g==="jawless") x += `<path d="M10 25 C12 17 30 15 36 18 L36 32 C30 35 12 33 10 25Z" fill="#000" opacity=".22"/>`;
  if(g==="shark") x += `<path d="M40 30 L30 46 L52 32Z" fill="currentColor"/><path d="M62 18 L60 5 M72 20 L74 8" stroke="currentColor" stroke-width="1.5"/>`;
  if(g==="lobe") x += `<ellipse cx="44" cy="40" rx="9" ry="4" fill="currentColor" transform="rotate(25 44 40)"/><ellipse cx="78" cy="38" rx="8" ry="3.5" fill="currentColor" transform="rotate(20 78 38)"/>`;
  if(g==="ray") x += `<path d="M48 36 L44 46 L60 37Z M60 14 L68 5 L76 15Z" fill="currentColor"/>`;
  x += `<circle cx="24" cy="22" r="2.4" fill="var(--bg)"/>`;
  return x;
}

document.getElementById("heroFish").innerHTML = fishSVG("placoderm");

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
let activeGroup = "all";

FISH.forEach((f,i)=>{
  const c = document.createElement("article");
  c.className = "card"; c.dataset.group = f.g; c.style.setProperty("--c", GROUPS[f.g].color);
  c.innerHTML = `<button type="button" aria-expanded="false" aria-controls="m${i}">
    <svg viewBox="0 0 120 50" aria-hidden="true">${fishSVG(f.g)}</svg>
    <h3>${f.n}</h3>
    <p class="meta">${f.era} · ${f.size}</p>
    <span class="tag">${GROUPS[f.g].name}</span>
    <div class="more" id="m${i}"><div><p>${f.t}</p><p class="meta">Lived roughly ${f.from} to ${f.to} million years ago.</p></div></div>
  </button>`;
  const b = c.querySelector("button");
  b.addEventListener("click",()=>{
    const open = c.dataset.open !== "true";
    c.dataset.open = open; b.setAttribute("aria-expanded", open);
  });
  grid.appendChild(c); f.el = c;
});

[["all","All fish"], ...Object.entries(GROUPS).map(([k,v])=>[k,v.name])].forEach(([k,label])=>{
  const b = document.createElement("button");
  b.type = "button"; b.textContent = label; b.setAttribute("aria-pressed", k==="all");
  b.addEventListener("click",()=>{
    activeGroup = k;
    filters.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed", x===b));
    update();
  });
  filters.appendChild(b);
});

const slider = document.getElementById("time");
function era(ma){
  if(ma>=419) return "Silurian";
  if(ma>=393) return "Early Devonian";
  if(ma>=383) return "Middle Devonian";
  return "Late Devonian";
}
function update(){
  const ma = 443 - Number(slider.value);
  document.getElementById("ma").textContent = ma + " Ma";
  document.getElementById("era").textContent = era(ma);
  let alive = 0;
  FISH.forEach(f=>{
    const inGroup = activeGroup==="all" || f.g===activeGroup;
    f.el.hidden = !inGroup;
    const on = ma <= f.from && ma >= f.to;
    f.el.classList.toggle("off", !on);
    if(on && inGroup) alive++;
  });
  document.getElementById("count").textContent = alive + (alive===1 ? " fish alive now" : " fish alive now");
}
slider.addEventListener("input", update);
update();
