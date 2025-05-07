// script.js

console.log('🔥 script.js loaded');
// ====== UTILITY ======
const $ = id => document.getElementById(id);
let budgetLimit = 101000;   // start = no limit (101 k)
let currentArea  = null;   // ← track the user’s picks
let currentLevel = null;


// ====== PHASE 1: Restaurant Data ======
const restaurantData = {
  "Coex": [
    { name: "KFC Coex Mall",           category: "fastFood",    avgCost: 25000, weight: 2, url: "https://naver.me/GKUf5aQz", img: "images/kfc-coex.jpg",           open: "10:30", close: "22:00" },
    { name: "Shake Shack Coex",        category: "fastFood",    avgCost: 30000, weight: 2, url: "https://naver.me/GHvbZ6hz", img: "images/shakeshack-coex.jpg",    open: "10:30", close: "22:00" },
    { name: "Hoho Tonkatsu",           category: "noodles",     avgCost: 32000, weight: 2, url: "https://naver.me/GipMHN8f", img: "images/hoho-coex.jpg",           open: "11:00", close: "21:50" },
    { name: "Saboten Coex",     category: "noodles",     avgCost: 32000, weight: 2, url: "https://naver.me/FdCvESgg", img: "images/saboten-coex.jpg",        open: "11:00", close: "22:00" },
    { name: "McDonald's Coex Branch",  category: "fastFood",    avgCost: 22000, weight: 2, url: "https://naver.me/GtUQbudg", img: "images/mcdonalds-coex.jpg",      open: "07:00", close: "22:00" },
    { name: "The Malatang Place",       category: "fastFood",    avgCost: 25000, weight: 2, url: "",                            img: "images/malaton-coex.jpg",        open: "10:30",      close: "20:00" },
    { name: "Tantan Noodles Kitchen",  category: "noodles",     avgCost: 30000, weight: 2, url: "https://naver.me/xmxTi46O", img: "images/tantan-coex.jpg",         open: "10:30", close: "22:00" },
    { name: "Paulie's ParnaMall",      category: "fastFood",    avgCost: 55000, weight: 2, url: "https://naver.me/x9BsLqUs", img: "images/paulies-coex.jpg",        open: "11:00", close: "22:00" },
    { name: "Papaya Leaf Coex",        category: "fastFood",    avgCost: 25000, weight: 2, url: "https://naver.me/5gFc3fRa", img: "images/papaya-coex.jpg",         open: "10:30", close: "22:00" },
    { name: "Papa Valley Starfield",   category: "fastFood",    avgCost: 30000, weight: 2, url: "https://naver.me/57V0Xbgp", img: "images/papavalley-coex.jpg",      open: "10:30", close: "22:00" },
    { name: "GS25 Convenience",        category: "convenience", avgCost: 15000, weight: 2, url: "",                            img: "images/gs25-coex.jpg",           open: "24h",      close: "–"      },
    { name: "VATOS ParnasMall",        category: "mexican",     avgCost: 40000, weight: 2, url: "https://naver.me/xUwgER5m", img: "images/vatos-coex.jpg",          open: "10:30", close: "22:00" },
    { name: "On The Border Coex",      category: "mexican",     avgCost: 55000, weight: 1, url: "https://naver.me/FRLFrjsS", img: "images/border-coex.jpg",         open: "10:30", close: "22:00" },
    { name: "Crispyfresh",             category: "fastFood",    avgCost: 30000, weight: 2, url: "https://naver.me/5z5NJiLZ", img: "images/crispyfresh-coex.jpg",     open: "10:30", close: "22:00" },
    { name: "Street Asian Food",       category: "noodles",     avgCost: 25000, weight: 2, url: "https://naver.me/5Bc81qO1", img: "images/streetasian-coex.jpg",     open: "10:30", close: "22:00" },
    { name: "Slideshow COEX",          category: "street",      avgCost: 26000, weight: 2, url: "https://naver.me/xKEfQ6a1", img: "images/slideshow-coex.jpg",       open: "11:00", close: "22:00" }
  ],
  "Jamsil": [
    { name: "On The Border",               category: "mexican",  avgCost: 55000, weight: 1, url: "https://naver.me/FRLFrjsS", img: "images/border-jamsil.jpg",    open: "10:30", close: "22:00" },
    { name: "Brooklyn The Burger Joint",   category: "fastFood", avgCost: 45000, weight: 2, url: "https://naver.me/5tJuhyqx", img: "images/brooklyn-jamsil.jpg",  open: "10:30", close: "21:00" },
    { name: "Oreno Ramen (The ramen you hate/love)",category: "noodles",  avgCost: 30000, weight: 2, url: "https://naver.me/FRLFr9WT", img: "images/oreno-jamsil.jpg",     open: "10:30", close: "22:00" },
    { name: "Hankookjib Bibimbap",          category: "korean",   avgCost: 30000, weight: 2, url: "",                            img: "images/hankookjib-jamsil.jpg",open: "10:30",      close: "21:00"      },
    { name: "Dimdimseom",                  category: "chinese",  avgCost: 25000, weight: 1, url: "https://naver.me/FjbpxnN8", img: "images/dimdimseom-jamsil.jpg",open: "10:30", close: "22:00" },
    { name: "Cheese Room X Tasting Room",   category: "fastFood", avgCost: 55000, weight: 1, url: "https://naver.me/5HkgUHAO", img: "images/cheeseroom-jamsil.jpg",open: "10:30", close: "22:00" }
  ],
  "DDP": [
    { name: "Chinese Restaurant DunDun",    category: "chinese",    avgCost: 35000, weight: 2, url: "",                            img: "images/chinese-ddp.jpg",      open: "11:00",      close: "20:30"      },
    { name: "Mom’s Touch LAB DDP",       category: "fastFood",   avgCost: 25000, weight: 2, url: "https://naver.me/G2EaHsY7", img: "images/momstouch-ddp.jpg",     open: "11:00", close: "20:30" },
    { name: "Ashley Buffet",             category: "buffet",     avgCost: 55000, weight: 1, url: "https://naver.me/F74dxrPc", img: "images/ashley-ddp.jpg",        open: "11:00", close: "21:00" },
    { name: "Momoya DDP",         category: "noodles",    avgCost: 30000, weight: 2, url: "https://naver.me/5UEpdyY4", img: "images/momoya-ddp.jpg",        open: "11:00", close: "20:00" },
    { name: "Ashley’s Takeout",          category: "fastFood",   avgCost: 18000, weight: 2, url: "",                            img: "images/ashelys-ddp.jpg",      open: "10:00",      close: "21:00"      }
  ],
  "Sangwangsimni": [
    { name: "Hukuchyo Ramen",           category: "noodles",    avgCost: 25000, weight: 2, url: "https://naver.me/FMcIVDaJ", img: "images/hukuchyo-sang.jpg",     open: "11:00", close: "21:00" },
    { name: "Burger King",              category: "fastFood",   avgCost: 20000, weight: 2, url: "https://naver.me/GsjFdVkt", img: "images/bk-sang.jpg",           open: "10:00",      close: "23:00"      },
    { name: "Shenghuo Malatang",        category: "street",     avgCost: 20000, weight: 2, url: "https://naver.me/5mItTbzT", img: "images/malatang-sang.jpg",     open: "10:30",      close: "22:00"      },
    { name: "Ssadagimbab",              category: "fastFood",   avgCost: 20000, weight: 1, url: "https://naver.me/GV2qZhwB", img: "images/ssadagimbab-sang.jpg",  open: "8:00",      close: "21:30"      },
    { name: "Starbucks Yogurt Dinner",  category: "cafe",       avgCost: 10000, weight: 1, url: "https://naver.me/FK5VcDbY", img: "images/starbucks-sang.jpg",    open: "7:00",      close: "22:00"      },
    { name: "CU Near Your House",       category: "convenience",avgCost: 15000, weight: 1, url: "",                            img: "images/cu-sang.jpg",          open: "24h",      close: "–"      }
  ],
  "Wangsimni": [
    { name: "KFC Wangsimni Yeoksa",     category: "fastFood",   avgCost: 25000, weight: 2, url: "https://naver.me/xxY3P2ym", img: "images/kfc-wang.jpg",          open: "10:30",      close: "22:30"      },
    { name: "Namastte Wangsimni",       category: "fastFood",   avgCost: 25000, weight: 2, url: "https://naver.me/FfegM3yR", img: "images/namastte-wang.jpg",     open: "11:00", close: "21:30" },
    { name: "ELLUI PIZZA",              category: "fastFood",   avgCost: 37000, weight: 2, url: "https://naver.me/GQ1D47cu", img: "images/ellui-wang.jpg",        open: "16:30", close: "01:00" },
    { name: "Chinese Restaurant Wang",  category: "chinese",    avgCost: 30000, weight: 2, url: "",                            img: "images/chinese-wang.jpg",     open: "11:00",      close: "21:30"      },
    
    { name: "Slowcali Poke & Grill",    category: "fastFood",   avgCost: 25000, weight: 2, url: "https://naver.me/FmfDg5Ta", img: "images/slowcali-wang.jpg",     open: "11:00",      close: "20:00" },
    { name: "Preppers Diet Food",       category: "fastFood",   avgCost: 25000, weight: 2, url: "https://naver.me/xX71r0sK", img: "images/preppers-wang.jpg",    open: "11:00",      close: "22:50" }
  ],
  "Hongdae": [
    { name: "Outdark",                  category: "fastFood",   avgCost: 25000, weight: 2, url: "https://naver.me/FLy4Dw8Q", img: "images/outdark-hong.jpg",      open: "16:00", close: "00:00" }
  ],
  "Itaewon": [
    { name: "Alpedo Kebab",             category: "street",     avgCost: 35000, weight: 2, url: "https://naver.me/Gmby953H", img: "images/alpedo-itae.jpg",       open: "00:00", close: "24:00" },
    { name: "Ankara Picnic",            category: "street",     avgCost: 25000, weight: 2, url: "https://naver.me/xiqd2J2S", img: "images/ankara-itae.jpg",       open: "11:00", close: "22:00" },
    { name: "Subway Itaewon Station",   category: "fastFood",   avgCost: 25000, weight: 1, url: "https://naver.me/53lCXp4Z", img: "images/subway-itae.jpg",       open: "00:00", close: "24:00" }
  ]
};


// ====== INITIALIZATION ======
window.addEventListener('DOMContentLoaded', () => {
  renderAreas();
initBudgetSlider(); 
refreshAreaAvailability();
initMethodChooser();
  $('reset-btn').addEventListener('click', resetAll);
});
/***** BUDGET SLIDER *****/
function initBudgetSlider(){
  const slider  = $('budget-slider');
  const disp    = $('budget-display');
  const msgBox  = $('budget-message');

  const exact = {
    41:"What are you doing?",42:"Ok Ellie, stop.",43:"😒😒",44:"This isn’t really cheap, you know.",
    45:"Wow. Just wow.",46:"Okay, so you don’t care about my budget, huh?",
    47:"I’m trying so hard to be okay with this...",48:"Okay, keep going. I don’t care anymore.",
    49:"😭😭😭😭",50:"Split?",51:"So you hate me, huh?",52:"This is madness.",
    53:"Not funny anymore. Stop, please.",54:"Why? Just... why?",55:"Ellie, what are you doing?",
    56:"You’ve definitely gone crazy.",57:"Ellie, I love you, please stop.",
    58:"Dang, you really don’t care anymore.",59:"big spender energy, huh?",
    60:"Oh cool, Ellie just casually bankrupting me again.",61:"You are evil.",62:"Hallo?",63:"Get out of my yard!",
    64:"Ellie, this better come with free dessert or great compliments.",65:"I hate you.",66:"Okay... are you that hungry?",
    67:"At this point, I'm just a walking bank app, aren't I?",68:"Lets pray your eyeliner survives this guilt.",
    69:"Hehehehe.",70:"Please stop. I love you, Ellie.",71:"Monster.",72:"🖕🏻",
    73:"🖕🏻🖕🏻🖕🏻 (Triple middle finger)",74:"Is this love?",
    75:"For this price, the food better come with emotional healing.",
    76:"There must be no options available at this price. What are you even doing?",
    77:"Totally a normal price, Ellie. Totally not panicking.",78:"Nothing to see here. Just my savings dissolving.",79:"Ellieeeeeeeeeeee",80:"Stoooooop.",
    81:"Pleaseeeeee.",82:"!!!!!!!!!!",83:"83k? 83k? Really?",84:"Psychopath.",
    85:"I hope Lili behaves horribly in class tomorrow.",86:"Don’t you feel bad?",
    87:"Do you think I’m rich?",88:"Do you despise me this much?",89:"Are you doing this for fun?",
    90:"Would you stop if I gave you a parrot kiss?",91:"You’re a horrible person right now.",
    92:"Nah, you’re not. I love you so much, Ellie.",93:"I’m offended.",
    94:"So...",95:".....",96:"...I...",97:"...hate...",98:"...YOU...",99:"....😢....",
    100:"Gnarly",101:"⚠️ Error: Ellie is crazy!"
  };

function updateUI(){
  const v = +slider.value;
  budgetLimit          = v * 1000;
  disp.textContent     = v.toLocaleString() + " 000₩";
  if      (v <= 25) msgBox.textContent = "Low-range price";
  else if (v <= 35) msgBox.textContent = "Medium-range price";
  else if (v <= 40) msgBox.textContent = "Almost expensive 😅";
  else              msgBox.textContent = exact[v] || "";
  refreshAreaAvailability();
}
slider.addEventListener('input',  updateUI);
slider.addEventListener('change', updateUI);
updateUI();                       // first render
}                                   // ← THIS closes initBudgetSlider()

 /* ─── helper: hide areas that are over budget ───────────────────────── */
function refreshAreaAvailability(){
  document.querySelectorAll('#areas .card').forEach(card=>{
    const area = card.dataset.area;
    if(area === 'RANDOM' || area === 'ANY'){ card.style.display=''; return; }
    const hasCheap = (restaurantData[area]||[])
                     .some(r => r.avgCost <= budgetLimit);
    card.style.display = hasCheap ? '' : 'none';
  });
}

/* ─── RESULT‑CARD builder ───────────────────────────────────────────── */
function makeResultCard(r){
  const div = document.createElement('div');
  div.className = 'result-card';
  div.innerHTML = `
    <img src="${r.img}" alt="${r.name}">
    <h3>${r.name}</h3>
    <p>Price: ₩${r.avgCost.toLocaleString()}</p>
    <p>Time: ${r.open || '—'} – ${r.close || '—'}</p>
    <p><a href="${r.url}" target="_blank">View on Naver</a></p>
  `;
  return div;
}

/* -------------------------------------------------- RANDOM PICK ---- */
function showRandom(area, level){
  // make sure every visual left‑over is gone
  $('wheel-wrap').hidden = true;
  $('wheelcanvas').style.display = 'none';
$('picker-content').innerHTML = '';

  const list = getFilteredList(area, level);
  if(!list.length){ pickerEmpty(); return; }

  const winner = list[Math.floor(Math.random()*list.length)];

  $('picker-title').textContent = 'Winner 🎉';
  const container = $('picker-container');
  container.innerHTML = '';                           // wipe others

  container.appendChild( makeResultCard(winner) );    // single card
  addPayButton(container, winner);
  /* clear any list that might have been shown previously */
  $('picker-content').innerHTML = '';

 
}


function showList(area, level){
  $('wheel-wrap').hidden        = true;
  $('wheelcanvas').style.display = 'none';

  const list = getFilteredList(area, level);
  if(!list.length){ pickerEmpty(); return; }

  $('picker-title').textContent = 'All Options:';
  const out = $('picker-content');
  out.innerHTML = '';
  list.forEach(r => {
  // when the user clicks a card, show its details + pay button
  const cardElm = makeResultCard(r);
  cardElm.onclick = () => {
    out.innerHTML = '';
    out.appendChild(cardElm);
    addPayButton(out, r);
  };
  out.appendChild(cardElm);
});

}

function pickerEmpty(){
  $('picker-title').textContent = 'No restaurants match that budget 😢';
  $('picker-content').innerHTML = '';
}



/* ─── METHOD‑CHOOSER wiring ─────────────────────────────────────────── */
function initMethodChooser(){
  $('method-buttons').addEventListener('click', e=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    const m = btn.dataset.method;

    $('method-section').hidden = true;   // hide chooser
    $('picker-section').hidden = false;  // show mechanic output

    if(m === 'wheel')       showWheel(currentArea, currentLevel);
    else if(m === 'random') showRandom(currentArea, currentLevel);
    else if(m === 'cards')  showCards(currentArea, currentLevel);
    else if(m === 'list')   showList(currentArea, currentLevel);
  });
}

/* ─── back button inside picker section ─────────────────────────────── */
$('back-btn').onclick = () => {
  $('picker-section').hidden = true;
  $('method-section').hidden = false;
};



// ==== ONE-TIME HEART BUBBLES ON PAGE LOAD ====
function launchHeartBubbles() {
  const hearts = ["💖", "💘", "💝", "❤️‍🔥"];
  const total   = 25;            // how many hearts
  const delayMs = 120;           // gap between hearts

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const h = document.createElement("span");
      h.className  = "heart-bubble";
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      // random horizontal start
      h.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(h);
      // clean up after animation
      setTimeout(() => h.remove(), 4000);
    }, i * delayMs);
  }
}

// fire once when everything is ready
window.addEventListener("load", launchHeartBubbles);


// ====== PHASE 1: Render Area Cards ======
function renderAreas() {
  console.log('1️⃣ renderAreas()');
  const container = $('areas');
  container.innerHTML = '';

  Object.keys(restaurantData).forEach(area => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="images/${area.toLowerCase()}.jpg" alt="${area}" />
      <p>${area}</p>
    `;
    card.onclick = () => chooseHealth(area);
    container.appendChild(card);
  card.dataset.area = area;     // 💡 so we can hide/show later

  });
/* ─── “? Random” card ─────────────────────────── */
const rand = document.createElement('div');
rand.className = 'card';
rand.innerHTML = `<p style="font-size:3rem">❓</p><p>Random</p>`;
rand.dataset.area = 'RANDOM';
rand.onclick = () => {
  const keys = Object.keys(restaurantData);
  const randomArea = keys[Math.floor(Math.random()*keys.length)];
  chooseHealth(randomArea);
};
container.appendChild(rand);

/* ─── “🌀 Any” card (merge all areas) ─────────── */
const any = document.createElement('div');
any.className = 'card';
any.innerHTML = `<p style="font-size:2.5rem">🌀</p><p>Any</p>`;
any.dataset.area = 'ANY';
any.onclick  = () => chooseHealth('ANY');
container.appendChild(any);
  
}


// ====== PHASE 2: Choose Healthy/Less/All ======
function chooseHealth(area) {
  console.log('2️⃣ chooseHealth()', area);
  // hide area grid, show health grid
  $('area-section').hidden     = true;
  $('category-section').hidden = false;

  const container = $('health-options');
  container.innerHTML = '';

  ['Healthy', 'Less Healthy', 'All'].forEach(level => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = level;
    card.onclick = () => startPicker(area, level);
    container.appendChild(card);
  });
}
// ====== PHASE 3: show the Method Chooser ======
function startPicker(area, level) {
  currentArea  = area;
  currentLevel = level;

  $('category-section').hidden = true;   // hide Healthy/Less/All
  $('method-section').hidden   = false;  // show Wheel / Random / Cards / All
}




// ====== DISPATCH ======
function launchMechanic(mech, area, level) {
  $('picker-title').textContent = {
    wheel:   'Spin the Wheel!',
    scratch: 'Scratch & Win!',
    cards:   'Pick a Card!',
    list:    'All Options:'
  }[mech];

  const container = $('picker-container');
  container.innerHTML = '';

  if      (mech === 'list')    showList(area, level);
  else if (mech === 'wheel')   showWheel(area, level);
  else if (mech === 'scratch') showScratch(area, level);
  else if (mech === 'cards')   showCards(area, level);
}

// ====== HELPER: shuffle ======
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// ─── helper: play the spin sound ───────────────────────────────────────
function playSpinSound(){
  const snd = $('spin-audio');
  snd.currentTime = 0;
  snd.play().catch(()=>{});          // ignore autoplay blocking on some mobiles
}
/* Bill‑split wheel : every option + its own weight  */
const PAY_SEGMENTS = [
  {label:'50-50 split',                                                          weight: 25},
  {label:'Eddie pays 💸',                                                          weight: 35},
  {label:'Ellie pays 😬',                                                          weight:  5},

  {label:'🥰 Eddie pays… and gets a long kiss in return',                          weight: 25},
  {label:'🤗 Eddie pays, but you owe him one giant hug',                           weight: 25},
  {label:'💌 Ellie is too cute today, so she doesn’t have to pay',                 weight: 25},
  {label:'🧃 Te quiero… y pago yo!',                                               weight: 25},
  {label:'💖 사랑하니까 내가 낼게!',                                                 weight: 25},
  {label:'🧾 You pay for the café, but Eddie pays now',                            weight: 25},
  {label:'😘 You pay… but you get a kiss!',                                        weight: 15},
  {label:'🙈 Eddie pays… nooooooo! How did this happen??',                         weight: 25},
  {label:'🐣 Ellie’s too adorable to pay, so Eddie pays (again...)',               weight: 35},
  {label:'💋 Ellie, give Eddie popos so he has the energy to pay',                 weight: 35},
  {label:'🧾 Split the bill, split the love (aww math is romantic now)',           weight: 15},
  {label:'✂️ Half and half — just like the drama in our relationship',            weight: 25},
  {label:'🤝 We both pay. Equality wins today.',                                   weight: 22},
  {label:'🧮 Let’s go 50-50, and then 100% dessert',                               weight: 19},
  {label:'🐹 Split the bill… but Ellie pays ₩1 more because she\'s the adult here', weight: 20},
  {label:'📉 It’s a financial crisis. We split.',                                  weight: 25},
  {label:'⚖️ Both of us pay. Justice has been served.',                            weight:  5},
  {label:'🎲 Split the bill, but Ellie chooses how. (random math is okay)',        weight: 25}
];


/* pick 1-3 random optionals */
function randomOptionals(){
  const pick = shuffle(PAY_OPTIONAL).slice(         // 1–3 random texts
                 0, 1+Math.floor(Math.random()*3));

  const left  = 100 - PAY_MANDATORY
                          .reduce((a,b)=>a+b.weight,0);
  const share = Math.floor(left / pick.length);     // even slice

  return pick.map(t => ({ label:t, weight:share }));
}

/* ╔══════════════════════════════════════════════╗
   ║ BILL‑SPLIT WHEEL – self‑contained overlay    ║
   ╚══════════════════════════════════════════════╝ */
function buildPayWheel(segmentArr){
  /* ---------- overlay skeleton ---------- */
  const ov = document.createElement('div');
  ov.id    = 'pay-overlay';
  ov.innerHTML = `
     <div class="box">
       <div class="wheel-pointer">▼</div>
       <canvas id="paycanvas" width="320" height="320"></canvas>
       <button id="pay-close">Close</button>
     </div>`;
  document.body.appendChild(ov);
  ov.querySelector('#pay-close').onclick = () => ov.remove();

  /* ---------- helper – pretty pastel palette ---------- */
  const pastelPalette = [
    '#FFADAD','#FFD6A5','#FDFFB6','#CAFFBF',
    '#9BF6FF','#A0C4FF','#BDB2FF','#FFC6FF'
  ];
  const pickColor = (() => {
    let i = 0;                      // cycle through palette (no duplicates)
    return () => pastelPalette[i++ % pastelPalette.length];
  })();

/* ---------- prepare Winwheel segments ---------- */
// ① shuffle the slices each spin
const shuffled = PAY_SEGMENTS
  .slice()                        // don’t mutate the original
  .sort(() => Math.random() - 0.5);

const total = shuffled.reduce((sum, s) => sum + s.weight, 0);
const segments = shuffled.map(seg => {
  /* ① remove every emoji (so nothing piles-up in the centre) */
  const noEmoji = seg.label.replace(/[\p{Emoji}\u200d\uFE0F]/gu, '').trim();

  /* ② truncate to ≈18 characters and add an ellipsis if needed */
  const short = noEmoji.length > 18
                ? noEmoji.slice(0, 16) + '…'
                : noEmoji;

  return {
    text            : short,
    fullLabel       : seg.label,
    size            : 360 * seg.weight / total,
    fillStyle       : randPastel(),
    textFontSize    : 11,             // a bit smaller
    textAlignment   : 'outer',
    textMargin      : 18,             // pushes it farther out
    textOrientation : 'horizontal',
    textFillStyle   : '#222'
  };
});



  /* ---------- create & spin ---------- */
 const wheel = new Winwheel({
  canvasId     : 'paycanvas',
  numSegments  : segments.length,
  outerRadius  : 150,
  lineWidth    : 2,
  rotationAngle: Math.random() * 360,  // ② random start
  pointerAngle : 0,
  segments,
      animation   : {
        type            : 'spinToStop',
        spins           : 5,
        duration        : 4,
        callbackFinished: seg => {
          const box = ov.querySelector('.box');
          box.insertAdjacentHTML(
            'afterbegin',
            `<p style="font-weight:700;font-size:1.2rem;margin-bottom:.8rem">
               ${seg.fullLabel} 🎉
             </p>`
          );
        }
      }
  });

  playSpinSound();
  wheel.startAnimation();
}


function randPastel(){
  return `hsl(${Math.random()*360},70%,85%)`;
}
function makeOverlay(text, btn, cb){
  const ov = document.createElement('div');
  ov.id = 'card-overlay';
  ov.innerHTML = `<div class="box"><p>${text}</p><button class="btn">${btn}</button></div>`;
  document.body.appendChild(ov);
  ov.querySelector('button').onclick = () => { ov.remove(); cb && cb(); };
  
}
function maybeShowPayWheel(rest){
  // chance based on price
  const p = rest.avgCost;   // your restaurant objects use avgCost
  let chance = 0.05;
  if(p >= 30000 && p < 40000) chance = 0.10;
  else if(p >= 40000 && p < 50000) chance = 0.40;
  else if(p >= 50000) chance = 0.80;

  if(Math.random() < chance) launchPayWheel();
}

function launchPayWheel(){
  document.getElementById('pay-overlay')?.remove();
  buildPayWheel(PAY_SEGMENTS);
}
// ─── helper: add Wheel of Pay button to any result screen ───────────
function addPayButton(where, rest){
  const btn = document.createElement('button');
  btn.className = 'spin-btn';
  btn.style.marginTop = '.6rem';
  btn.textContent = 'Wheel of Pay 💰';
  btn.onclick = () => launchPayWheel();
  where.appendChild(btn);


}

// ====== SPINNING WHEEL v2 ==============================================
function showWheel(area, level){
  const title = $('picker-title');
  const box   = $('picker-container');
  box.innerHTML = '';                     // clear cards
  $('picker-content').innerHTML = '';
  $('wheel-wrap').hidden = false;         // show wrapper
  $('wheelcanvas').style.display='none';  // hide until dice rolled

  // ---------- 1. filtered list ----------
  let list = area==='ANY' ? Object.values(restaurantData).flat()
                          : (restaurantData[area]||[]).slice();
  list = list.filter(r=>r.avgCost<=budgetLimit);
  if(level==='Healthy')      list=list.filter(r=>r.avgCost<=30000);
  else if(level==='Less Healthy') list=list.filter(r=>r.avgCost>30000);

  if(!list.length){ pickerEmpty(); $('wheel-wrap').hidden=true; return; }

  // ---------- 2. dice button ----------
  title.textContent = 'Tap the die to get your spins!';
  const dice = document.createElement('button');
  dice.className='dice-btn';
  dice.textContent='🎲';
  box.appendChild(dice);

  dice.onclick = ()=>{
    const spins = Math.floor(Math.random()*6)+1;  // 1‑6
    startWheel(list, spins);
  };
}
function flashPlusOne(){
  const plus = document.createElement('span');
  plus.textContent = '+1';
  plus.className = 'plus-one';
  $('wheel-wrap').appendChild(plus);
  setTimeout(()=>plus.remove(), 1400);
}

function flashLucky(){
  const msg = document.createElement('div');
  msg.id = 'lucky-msg';
  msg.textContent = 'You\'re going to have a lucky day, Ellie ✨';
  $('wheel-wrap').appendChild(msg);
  setTimeout(()=>msg.remove(), 1600);
}
function startWheel(list, spinsLeft){
  const title = $('picker-title');
  const box   = $('picker-container');
  box.innerHTML = '';
  $('wheelcanvas').style.display='block';
  $('wheel-wrap').classList.remove('spinning');
  const resultDiv = document.createElement('div');
  resultDiv.id = 'wheel-result';
  box.appendChild(resultDiv);
  title.textContent = `Spins left: ${spinsLeft}`;

  /* ── pad to exactly 6 slices ── */
const fillers = [
  { name:'✨ Bonus ✨', type:'bonus'  },
  { name:'💖 Free Kiss', type:'kiss' },
  { name:'🤗 Free Hug',  type:'hug'  },
  { name:'🍀 Lucky',     type:'lucky'}
];
while(list.length < 6) 
  list.push(fillers[list.length % fillers.length]);


  /* ── colour palette & segments ── */
  const colors = shuffle(['#b7e4c7','#ffd6ff','#caffbf',
                          '#fdffb6','#a0c4ff','#ffadad']);
  const segments=[{}];                 // 1‑based for Winwheel
  list.forEach((r,i)=>segments.push({
    text:(r.name.length>14? r.name.slice(0,12)+'…':r.name),
    fillStyle:colors[i%colors.length],
    textOrientation:'horizontal',
    textAlignment:'outer',
    textFontSize:12,
    textFillStyle:'#333'
  }));

  /* ── destroy old wheel if any ── */
  if(window.wheel) window.wheel.stopAnimation(false);

  window.wheel = new Winwheel({
    canvasId:'wheelcanvas',
    outerRadius:180,
    lineWidth:2,
    numSegments:segments.length-1,
    segments,
    animation:{
      type:'spinToStop',
      duration:5,
      spins:Math.floor(Math.random()*3)+5,
      callbackFinished:(seg)=>{
  $('wheel-wrap').classList.remove('spinning');

  const pick = list.find(r => r.name.startsWith(seg.text.replace('…','')));

  /* ========= WIN LOGIC ========= */
  if(!pick.type){                    // a real restaurant
    resultDiv.innerHTML = '';
    resultDiv.appendChild(makeResultCard(pick));
    addPayButton(resultDiv, pick);
    spinsLeft--;                     // always costs a spin
    maybeShowPayWheel(pick);
  } else {                           // one of the fun slices
    if(pick.type === 'bonus'){       // always +1
      spinsLeft++;
      flashPlusOne();
    } else {                         // kiss / hug / lucky
      if(spinsLeft > 1) spinsLeft--; // costs a spin unless last
      if(pick.type === 'lucky') flashLucky();
    }
  }

  title.textContent = `Spins left: ${spinsLeft}`;
  spinBtn.disabled  = spinsLeft === 0;
}
     


    }
  });

  /* ── Spin button ── */
  const spinBtn=document.createElement('button');
  spinBtn.className='spin-btn';
  spinBtn.textContent='🌀 Spin!';
  box.appendChild(spinBtn);

  spinBtn.onclick = () => {
  if(spinsLeft === 0) return;
  playSpinSound();

  $('wheel-wrap').classList.add('spinning');

  window.wheel.stopAnimation(false);
  window.wheel.rotationAngle = 0;
  window.wheel.animation.stopAngle = Math.random() * 360;  // ★ random finish
  window.wheel.draw();
  window.wheel.startAnimation();
};

}





// ====== SCRATCH & WIN ======
function showScratch(area, level) {
  // hide wheel
  $('wheelcanvas').style.display = 'none';

  // clear container
  const container = $('picker-container');
  container.innerHTML = '';

  // pick 3 restaurants + 3 love-notes
  const list   = shuffle(getFilteredList(area, level)).slice(0, 3);
  const prizes = shuffle([
    'You won a parrot kiss from Eddie',
    'You won a hug from Eddie',
    'Kiss Eddie on the cheek now',
    'You are awesome Ellie',
    'I love you Ellie',
    'Marry me?',
    'Ok choose again',
    '사랑해 Ellie',
    '귀여워'
  ]).slice(0, 3);

  // shuffle them into slots
  const slots = shuffle([
    ...list.map(r => ({ type: 'rest',  data: r })),
    ...prizes.map(p => ({ type: 'prize', data: p }))
  ]);

  // render scratch-boxes
  slots.forEach((slot, i) => {
    const box     = document.createElement('div');
    box.className = 'scratch-box';

    // underneath image (restaurant or blank)
    const img = document.createElement('img');
    img.src = slot.type === 'rest'
      ? slot.data.img
      : 'images/blank-scratch.jpg';
    box.appendChild(img);

    // overlay layer that will be scratched off
    const overlay = document.createElement('div');
    overlay.id    = `scratch-${i}`;
    box.appendChild(overlay);

    container.appendChild(box);

    // initialize wScratchPad on the overlay
    $(`#scratch-${i}`).wScratchPad({
      size:       40,
      bg:         '#ccc',
      fg:         '#ccc',
      cursor:     'pointer',
      scratchMove: (_, percent) => {
        if (percent > 60) {
          if (slot.type === 'rest') showDetails(slot.data);
          else                       alert(slot.data);
          $(`#scratch-${i}`).wScratchPad('clear');
        }
      }
    });
  });
}


/* ====== FLIPPING CARDS 2.0 ========================================= */
function showCards(area, level){
  $('wheelcanvas').style.display = 'none';
  const container = $('picker-container');
  container.innerHTML = '';

  const messages = shuffle([
  '🐥 You won 1 forehead kiss (redeemable now)',
  '📷 You get 1 forced but cute photo with Eddie today',
  '🕺 Eddie must do a 10 second awkward dance for you',
  '📖 Eddie reads you one page of any book (dramatic voices included)',
  '🤫 Eddie must not interrupt you for 5 full minutes (timer starts now and refundable for a kiss in the cheek)',
  '🧠 Eddie will now yap a random fun fact no one asked for and maybe he made it up too',
  '😐 You are now allowed to ignore 1 of Eddie’s bad jokes (for the sake of both of us)',
  '💬 Retry card, choose again!',
  '🐸 Frog mode unlocked: Eddie must jump right now',
  '💋 Eddie blows you a kiss dramatically',
  '🤝 You get 10 full seconds of double hand holding (no pulling away allowed)',
  '🤏 You may squish Eddie’s cheeks for 7 seconds',
  '💞 Ellie must kiss Eddie on the cheek right now (yay!)',
  '📚 Ellie must recite a quote from any book she remembers',
  '🃏 Ellie has to make up a terrible joke and say it with a straight face',
  '🧙‍♀️ Ellie becomes fortune teller; predict Eddie’s tomorrow’s future in 5 words',
  '🧙‍♀️ Eddie becomes fortune teller; predict Ellie’s tomorrow’s future in 5 words',
  '🎤 Ellie must whisper her favorite word dramatically',
  '📓 Ellie tells Eddie one secret (silly or real) Must be dramatic!',
  '🧍‍♂️ Ellie and Eddie have to lock eyes until someone laughs or 30 seconds pass',
  '🛸 Teleport hug: both of you hug like you’ve just reunited after 5 years',
  '🎮 Ellie can control Eddie like a video game character for 30 seconds',
  '🍞 You both must argue passionately about pineapple on pizza (now)',
  '🐤 Eddie must speak in a baby bird voice for 10 seconds',
  '🛑 Ellie says “STOP” and Eddie must freeze like a statue for 5 seconds (5-minute redeemable)',
  '✂️ Rock, paper, scissors! WHoever loses has to make a weird face (best of 3)',
  '🌍 Eddie can only speak Spanish to you for 3 minutes (good luck 🤠)',
  '🌍 Ellie can only speak Korean to Eddie for 3 minutes (화이팅!)',
  '⏱️ Ellie must say 1 word in Spanish, you have 5 seconds!',
  '⏱️ Eddie must say 1 word in Korean, you have 5 seconds!',
  '🐱 Ellie must meow right now. No questions.',
  '🐶 Eddie must bark, just once. Like, convincingly.',
  '🐰 Ellie must say “I’m a bunny” in her cutest voice',
  '🧠 Eddie must compliment Ellie using 1 word only (creative mode on)',
  '✋ Eddie must pet your head gently, redeemable now',
  '🧍‍♀️ Ellie stands still; Eddie must spin around her like a weirdo for 5 seconds',
  '🧽 Eddie must "clean" Ellie’s aura with his hands and dramatic sound effects',
  '🎙️ Ellie has to give a dramatic Oscar speech about… Eddie',
  '😤 You must both pretend to be in a K-drama sad scene, go!',
  '🧃 Ellie wins 1 imaginary juice box, use it wisely',
  '🎲 Ellie has 10 seconds to come up with a nickname for Eddie and use it all day',
  '🎙️ You both must act like strangers meeting for the first time, right now',
  '💼 Ellie becomes Eddie’s manager for 60 seconds, give him orders'
]).slice(0, 2);   // still pick 1–2 messages


 /* 1. build a deck: up to 6 restaurants */
let deck = shuffle(getFilteredList(area, level)).slice(0, 6);

/* 2. mix in 1‑2 fun‑message cards */
deck = shuffle([
    ...deck.map(r => ({type:'rest',  data:r})),
    ...messages.map(m => ({type:'msg',   data:m}))
  ]);

  /* --- render grid ------------------------------------------------- */
  const grid = document.createElement('div');
  grid.className = 'card-grid';
  container.appendChild(grid);

  let picked = false;              // a restaurant already chosen?
  

  deck.forEach((cardData, idx) =>{
    const card = document.createElement('div');
    card.className = 'card-flip';
    card.innerHTML = `
       <div class="face front">🂠</div>
       <div class="face back"></div>`;
    grid.appendChild(card);

    /* back‑face content */
    const back = card.querySelector('.back');
    if(cardData.type==='rest'){
      back.innerHTML = `
        <img src="${cardData.data.img}" alt="">
        <p style="font-size:.8rem">${cardData.data.name}</p>`;
    }else{
      back.innerHTML = `<p style="font-size:.9rem">${cardData.data}</p>`;
    }

    /* click behaviour */
    card.onclick = () =>{
      if(card.classList.contains('flipped') ||               // already open
         (picked && cardData.type!=='msg')) return;          // locked after win

      card.classList.add('flipped');

      /* --- MESSAGE card ------------------------------------------ */
      if(cardData.type === 'msg'){
        showOverlay(cardData.data, ()=>{                     // callback on “try again”
          card.onclick = null;                               // keep it inert
        });
        return;
      }

      /* --- RESTAURANT win --------------------------------------- */
     picked = true;
      card.classList.add('winner');
     showRestaurantOverlay(cardData.data);
      grid.style.pointerEvents = 'none';      // ⬅️ lock the rest of the grid

      // reveal rest after 30 s
     setTimeout(()=> {
        document.querySelectorAll('.card-flip:not(.flipped)')
                .forEach(c=>c.classList.add('flipped'));
      }, 5000);
    };
  });

  /* helper – overlay for messages */
  function showOverlay(text, after){
    const ov=document.createElement('div');
    ov.id='card-overlay';
    ov.innerHTML=`
       <div class="box">
         <p style="font-size:1.1rem;margin-bottom:.8rem">${text}</p>
         <button class="btn">Try again</button>
       </div>`;
    document.body.appendChild(ov);
    ov.querySelector('button').onclick=()=>{
      ov.remove();
      after();
    };
  }
  function showRestaurantOverlay(rest){
  const ov = document.createElement('div');
  ov.id = 'card-overlay';
  ov.innerHTML = `
    <div class="box" style="max-width:320px">
      ${makeResultCard(rest).outerHTML}
            <button class="btn" id="pay-btn" style="margin:.6rem 0">
        Wheel of Pay 💰
      </button>

      <button class="btn close-btn" style="margin-top:1rem">Back to start</button>
    </div>`;
  document.body.appendChild(ov);

    // wire Pay button immediately
  ov.querySelector('#pay-btn').onclick = () => {
    ov.style.zIndex = 9000;    // push the card modal down one level
    launchPayWheel();
    };
    ov.querySelector('.close-btn').onclick = () => {
     ov.remove(); 
    resetAll(); 
  };
    
}


}

// ====== RICH DETAILS PANEL ======
function showDetails(r) {
  const container = $('picker-container');
  container.innerHTML = `
    <div class="details">
      <img src="${r.img}" alt="${r.name}" />
      <h3>${r.name}</h3>
      <p>Price: ₩${r.avgCost}</p>
      <p>Time: ${r.open} — ${r.close}</p>
      ${r.url
         ? `<p><a href="${r.url}" target="_blank">View on Naver</a></p>`
         : ''}
    </div>
  `;
    const details = container.querySelector('.details');
  addPayButton(details, r);

}

// ====== HELPER: getFilteredList ======
function getFilteredList(area, level) {
  let list = (restaurantData[area] || []).slice();
 list = list.filter(r => r.avgCost <= budgetLimit); 
  if      (level === 'Healthy')      list = list.filter(r => r.avgCost <= 30000);
  else if (level === 'Less Healthy') list = list.filter(r => r.avgCost > 30000);
  return list;
}

// ====== Existing LIST fallback ======
function showList(area, level) {
  $('wheel-wrap').hidden         = true;
  $('wheelcanvas').style.display = 'none';
  $('picker-title').textContent  = 'All Options:';
  const container = $('picker-container');
  container.innerHTML = '';
  let list = area==='ANY'
    ? Object.values(restaurantData).flat()
    : (restaurantData[area] || []).slice();
  list = list.filter(r => r.avgCost <= budgetLimit);
  if(level === 'Healthy')      list = list.filter(r => r.avgCost <= 30000);
  else if(level === 'Less Healthy') list = list.filter(r => r.avgCost > 30000);

  list.forEach(r => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${r.img}" alt="${r.name}" />
      <p>${r.name}</p>
    `;
    card.onclick = () => {
      container.innerHTML = '';
      // show the result card
      container.appendChild(makeResultCard(r));
      // …and add the pay-wheel button
      addPayButton(container, r);
    };
    container.appendChild(card);
  });
}


// ====== RESET ======
function resetAll() {
  // if a pay-wheel overlay is showing, remove it
  document.getElementById('pay-overlay')?.remove();
  $('picker-section').hidden   = true;
  $('category-section').hidden = true;
  $('area-section').hidden     = false;
$('method-section').hidden = true;
$('wheel-wrap').hidden = true;          
$('wheel-wrap').innerHTML = '<div id="wheel-pointer">▼</div><canvas id="wheelcanvas" width="380" height="380"></canvas>';    
  $('overlay-root').innerHTML = '';     
  const co = document.getElementById('card-overlay'); 
  if (co) co.remove();                 
}

$('back-btn').onclick = () => {
  $('picker-section').hidden = true;
  $('method-section').hidden  = false;
  $('wheel-wrap').hidden      = true;   // hide wheel before leaving
};


