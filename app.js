// v4: Fix renderer mapping, richer content, health shows pros/cons facts, timeline scroll polish
const qs=(s,el=document)=>el.querySelector(s);const qsa=(s,el=document)=>[...el.querySelectorAll(s)];const root=document.documentElement;
const elHome=qs('#home'),elAppView=qs('#app-view'),elAppTitle=qs('#app-title'),elAppContent=qs('#app-content'),elBtnHome=qs('#btn-home'),elBtnBack=qs('#btn-back'),elHelp=qs('#btn-help'),elHelpModal=qs('#help-modal'),elHelpClose=qs('#help-close'),elTheme=qs('#btn-theme'),elStatusPill=qs('#status-pill');

function setStatusTime(){const t=new Date();const hh=t.getHours();const mm=String(t.getMinutes()).padStart(2,'0');qs('#status-time').textContent=`${((hh+11)%12+1)}:${mm}`;}
document.addEventListener('DOMContentLoaded',()=>{const v=document.getElementById('app-view');if(v)v.setAttribute('hidden','');setStatusTime();});setInterval(setStatusTime,30000);

// All skins match renderer keys to avoid fallback JSON output
const APPS={
  timeline:{title:'iPhone Timeline', skin:'timeline',
    pros:[
      {year:'2007',text:'Original iPhone: multi-touch, Safari, iPod in one.'},
      {year:'2008',text:'App Store launches → platform era.'},
      {year:'2010',text:'Retina display sets visual bar.'},
      {year:'2013',text:'Touch ID popularizes secure unlock.'},
      {year:'2015',text:'4K video elevates mobile creation.'},
      {year:'2017',text:'Face ID and edge-to-edge displays.'},
      {year:'2020',text:'5G support; MagSafe ecosystem returns.'},
      {year:'2023+',text:'Satellite SOS, on‑device ML improvements.'},
    ],
    cons:[
      {year:'2007',text:'Carrier exclusivity; high price barrier.'},
      {year:'2010–12',text:'Antennagate, Maps launch issues.'},
      {year:'2013–16',text:'Repairability & right‑to‑repair debates.'},
      {year:'2017',text:'Notch trade-offs; rising ASPs.'},
      {year:'2018–20',text:'Battery throttling controversy.'},
      {year:'2020+',text:'Ecosystem lock‑in & e‑waste concerns persist.'},
    ]
  },
  design:{title:'Design & UX', skin:'design',
    pros:[
      {label:'Consistency',value:'Strong HIG; coherent gestures'},
      {label:'Accessibility',value:'VoiceOver, Dynamic Type, AssistiveTouch'},
      {label:'Haptics',value:'Precise feedback guides actions'},
      {label:'Privacy',value:'On-device processing for some tasks'},
    ],
    cons:[
      {label:'Closedness',value:'Limited defaults & customization'},
      {label:'Repairability',value:'Parts pairing; service constraints'},
      {label:'Complexity creep',value:'More settings, less discoverability'},
      {label:'Ports/Peripherals',value:'Transitions (30‑pin→Lightning→USB‑C)'},
    ]
  },
  comms:{title:'Communication & Social', skin:'comms',
    pros:[
      {who:'me',text:'iMessage/FaceTime unify devices & family groups.'},
      {who:'them',text:'Emergency alerts & location sharing add safety.'},
      {who:'me',text:'SharePlay/Photos simplify shared experiences.'},
    ],
    cons:[
      {who:'them',text:'Notifications fragment attention.'},
      {who:'me',text:'FOMO & social comparison via feeds.'},
      {who:'them',text:'Hard to unplug from group threads.'},
    ]
  },
  work:{title:'Work', skin:'work',
    pros:[
      {task:'Continuity/Handoff speed up workflows.'},
      {task:'Notes/Files/iCloud keep materials synced.'},
      {task:'Privacy-preserving on-device ML assists.'},
    ],
    cons:[
      {task:'Always-on email/chat expectations.'},
      {task:'App silos complicate deep work.'},
      {task:'BYOD blurs personal/pro boundaries.'},
    ]
  },
  economy:{title:'Economy', skin:'economy',
    pros:[
      {symbol:'AAPL',price:192.30,change:'+1.4%',series:[120,132,128,140,150,160,168,175,180,188,192]},
      {symbol:'APP',price:41.80,change:'+0.8%',series:[20,22,25,28,26,30,33,35,38,40,42]},
      {symbol:'DEV',price:88.20,change:'+2.1%',series:[70,72,73,76,78,80,82,83,85,87,88]},
    ],
    cons:[
      {symbol:'AAPL',price:182.10,change:'-2.9%',series:[192,190,188,186,184,183,185,184,183,182,182]},
      {symbol:'3RD',price:19.20,change:'-4.2%',series:[28,27,26,25,24,23,22,21,20,19,19]},
      {symbol:'LOCK',price:12.80,change:'-1.1%',series:[16,16,15,14,14,13,13,13,13,13,12.8]},
    ]
  },
  culture:{title:'Culture', skin:'culture',
    pros:[
      {user:'design.daily',caption:'Creativity unlocked — everyone publishes.',likes:'4,532'},
      {user:'photo.walks',caption:'Pocket camera → everyday art.',likes:'1,204'},
      {user:'access.now',caption:'Movements organize at scale.',likes:'10.4K'},
    ],
    cons:[
      {user:'scroll.loop',caption:'Infinite feeds favor outrage.',likes:'—'},
      {user:'compare.me',caption:'Curated lives → insecurity.',likes:'—'},
      {user:'doom.feed',caption:'Virality over accuracy.',likes:'—'},
    ]
  },
  health:{title:'Health', skin:'health',
    // Replace generic metrics with pros/cons facts drawn from your earlier brief
    pros:[
      {name:'Accessibility',value:'VoiceOver, Magnifier, hearing & motion features expand inclusion.'},
      {name:'Safety',value:'Emergency SOS, crash/fall detection, location sharing.'},
      {name:'Well‑being',value:'Mindfulness/Focus modes; screen‑time controls.'},
      {name:'Activity',value:'Wearables + HealthKit enable tracking & coaching.'},
    ],
    cons:[
      {name:'Sleep',value:'Blue‑light & late use → reduced/fragmented sleep.'},
      {name:'Attention',value:'Notification cycles fragment focus.'},
      {name:'Anxiety/FOMO',value:'Social feeds correlate with stress & loneliness.'},
      {name:'Overuse',value:'Compulsive checking; boundary erosion with work.'},
    ]
  },
  sources:{title:'Sources', skin:'sources',
    pros:[
      {title:'Khalid, Rabeea. “The iPhone: A New Gadget Revolutions.” Medium (2025).',note:'Design, ecosystem, iteration.'},
      {title:'Pierce & Goode. “The WIRED Guide to the iPhone.” WIRED (2018).',note:'Platform/ecosystem impact.'},
      {title:'Molla, R. “How the iPhone Changed the World.” Vox (2017).',note:'10 charts of change.'},
      {title:'Boyo, S. “How the iPhone Became a Best‑Seller.” CNBC (2024).',note:'Adoption & sales.'},
      {title:'Brand Vision (2024). “Everything About iPhone.”',note:'Milestones & features.'},
      {title:'Augustana Univ. Case Study (2008).',note:'Launch strategy & marketing.'},
      {title:'QuartSoft (2014). “iPhone: Tech History Infographic.”',note:'Early feature evolution.'},
      {title:'Reads, C. “iPhone Greatest Invention.” Medium (2020).',note:'Impact > novelty.'},
      {title:'Hackford, H. CHM Blog (2018).',note:'Social impacts & adaptation.'},
      {title:'Ashar, L. APU (2024).',note:'Social media impacts: balanced.'},
      {title:'Alaimo, K. CNN (2017).',note:'7 ways life worse.'},
      {title:'Twenge, J. The Atlantic (2017).',note:'iGen & mental health.'},
      {title:'Solis, B. Fast Company (2024).',note:'Invention backstory.'},
    ],
    cons:[
      {title:'Alaimo, K. CNN (2017).',note:'Boundaries, validation cycles.'},
      {title:'Twenge, J. The Atlantic (2017).',note:'Depression/loneliness correlations.'},
      {title:'Ashar, L. APU (2024).',note:'Risks: cyberbullying, doxxing, addiction.'},
      {title:'Molla, R. Vox (2017).',note:'Mobile ad shift & attention economy.'},
      {title:'Boyo, S. CNBC (2024).',note:'Market dominance & lock‑in context.'},
      {title:'Brand Vision (2024).',note:'AI features, sustainability claims.'},
      {title:'Hackford, H. CHM (2018).',note:'Privacy/surveillance concerns.'},
      {title:'Solis, B. Fast Company (2024).',note:'Carrier control & design constraints.'},
      {title:'QuartSoft (2014).',note:'Tech vs. repairability timeline context.'},
      {title:'Reads, C. Medium (2020).',note:'Critique of incrementalism.'},
      {title:'Khalid, R. Medium (2025).',note:'Iteration vs revolution tension.'},
      {title:'WIRED Guide (2018).',note:'Supply chain & ScreenTime (self‑regulation).'},
      {title:'BusinessBlogs Hub (2017/2025).',note:'Commerce, payments, gaming effects.'},
    ]
  }
};

const navStack=[];
const isLight=()=>root.classList.contains('light');
const modeText=()=>isLight()?'Pros':'Cons';

function svgSparkline(values,width=120,height=40,padding=4){
  const min=Math.min(...values), max=Math.max(...values);
  const w=width, h=height, pad=padding;
  const scaleX=(i)=> pad + (i*(w-2*pad))/(values.length-1||1);
  const scaleY=(v)=> pad + (h-2*pad) * (1 - (v-min)/(max-min||1));
  let d='';
  values.forEach((v,i)=>{d+= (i?' L ':'M ') + scaleX(i) + ' ' + scaleY(v)});
  const stroke = getComputedStyle(document.documentElement).getPropertyValue('--subject').trim() || '#57c271';
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <path d="${d}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

// Renderers (match skin names)
function renderCulture(list){const feed=document.createElement('div');feed.className='feed';list.forEach(p=>{const post=document.createElement('article');post.className='post';post.innerHTML=`<div class="post-head"><span class="avatar"></span><b>@${p.user}</b></div><div class="img"></div><div class="post-actions">♥ ${p.likes} &nbsp; • &nbsp; ${p.caption}</div>`;feed.appendChild(post);});return feed;}
function renderEconomy(list){const wrap=document.createElement('div');wrap.className='stocks';list.forEach(t=>{const row=document.createElement('div');row.className='ticker';row.innerHTML=`<div class="symbol">${t.symbol}</div><div class="chart">${svgSparkline(t.series||[])}</div><div class="price">${(t.price?.toFixed? t.price.toFixed(2):t.price)} <small>${t.change||''}</small></div>`;wrap.appendChild(row);});return wrap;}
function renderHealth(list){const grid=document.createElement('div');grid.className='health-cards';list.forEach(m=>{const el=document.createElement('div');el.className='metric';el.innerHTML=`<div class="name">${m.name}</div><div class="value">${m.value}</div>`;grid.appendChild(el);});return grid;}
function renderComms(list){const chat=document.createElement('div');chat.className='chat';list.forEach(b=>{const el=document.createElement('div');el.className='bubble ' + (b.who==='me'?'me':'them');el.textContent=b.text;chat.appendChild(el);});return chat;}
function renderWork(list){const tasks=document.createElement('div');tasks.className='tasks';list.forEach(t=>{const el=document.createElement('div');el.className='task';el.innerHTML=`<span class="dot"></span><span class="label">${t.task}</span><span>›</span>`;tasks.appendChild(el);});return tasks;}
function renderDesign(list){const s=document.createElement('div');s.className='settings';list.forEach(i=>{const row=document.createElement('div');row.className='setting';row.innerHTML=`<span class="label">${i.label}</span><span class="value">${i.value}</span>`;s.appendChild(row);});return s;}
function renderTimeline(list){const t=document.createElement('div');t.className='timeline';list.forEach(m=>{const row=document.createElement('div');row.className='milestone';row.innerHTML=`<span class="dot"></span><div><b>${m.year}</b><div class="muted">${m.text}</div></div>`;t.appendChild(row);});return t;}
function renderSources(list){const s=document.createElement('div');s.className='sources';list.forEach(x=>{const row=document.createElement('div');row.className='source';row.innerHTML=`<div><b>${x.title}</b></div><div class="muted">${x.note||''}</div>`;s.appendChild(row);});return s;}

const RENDERERS={culture:renderCulture,economy:renderEconomy,health:renderHealth,comms:renderComms,work:renderWork,design:renderDesign,timeline:renderTimeline,sources:renderSources};

function openApp(key){
  const app=APPS[key]; if(!app) return;
  elAppTitle.textContent=app.title;
  elAppContent.innerHTML='';
  elAppView.setAttribute('data-app', key);
  const data=isLight()? app.pros : app.cons;
  const renderer=RENDERERS[app.skin];
  elAppContent.appendChild(renderer(data));
  // show overlay
  elAppView.hidden=false; elHome.style.opacity='0'; elHome.style.pointerEvents='none';
  // update stack AFTER success render
  navStack.length=0; navStack.push(key);
}

function refreshOpenAppIfAny(){ if(navStack.length===0)return; openApp(navStack[navStack.length-1]); }
function goHome(){ if(!elAppView.hasAttribute('hidden')){elAppView.setAttribute('hidden','');} elHome.style.opacity='1'; elHome.style.pointerEvents='auto'; }
function goBack(){ goHome(); }

qsa('.app-icon').forEach(btn=>btn.addEventListener('click',()=>openApp(btn.dataset.app)));
elBtnHome.addEventListener('click',goHome);
elBtnBack.addEventListener('click',goBack);
elHelp.addEventListener('click',()=>elHelpModal.showModal());
elHelpClose.addEventListener('click',()=>elHelpModal.close());

const applyModeIndicators=()=>{elStatusPill.textContent = isLight() ? 'Pros' : 'Cons';};
elTheme.addEventListener('click',()=>{const light=root.classList.toggle('light');localStorage.setItem('theme', light ? 'light' : 'dark');applyModeIndicators();refreshOpenAppIfAny();});
if(localStorage.getItem('theme')==='light'){root.classList.add('light');}
applyModeIndicators();

// Export small API
window.LegacyMap={open:openApp,home:goHome,config:APPS};
