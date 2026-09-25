const state = {
  step: 0,
  answers: {
    foodType: "mixed",
    foodWaste: "wasteMedium",
    foodOut: 3,
    delivery: 2,
    transportMode: "bike",
    transportDistance: 12,
    transportDays: 5,
    transportExtra: "none",
    electricityMode: "direct",
    electricityKwh: 100,
    devices: 4,
    wasteLevel: "medium",
    recycle: "sometimes",
    clothing: "Medium",
    electronics: "Medium",
    online: "Medium"
  },
  result: null,
  whatIfReduction: 0
};

const steps = [
  {
    key: "food",
    label: "Food & drink",
    icon: "🍽️",
    title: "Food & drink",
    desc: "Tell us about your usual food habits. Estimates are designed to be simple, not judgmental.",
    render: renderFood
  },
  {
    key: "transport",
    label: "Transportation",
    icon: "🚗",
    title: "Transportation",
    desc: "Your daily commute and other travel can make a significant difference to your footprint.",
    render: renderTransport
  },
  {
    key: "electricity",
    label: "Electricity",
    icon: "⚡",
    title: "Electricity",
    desc: "Use your approximate monthly electricity bill, or let us make a simple estimate.",
    render: renderElectricity
  },
  {
    key: "waste",
    label: "Waste",
    icon: "♻️",
    title: "Waste",
    desc: "Think about how much waste you generate and what happens to recyclable material.",
    render: renderWaste
  },
  {
    key: "consumption",
    label: "Consumption",
    icon: "🛍️",
    title: "Everyday consumption",
    desc: "A simple snapshot of clothing, electronics and other purchases.",
    render: renderConsumption
  }
];

const $ = (id) => document.getElementById(id);

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
}

function startCalculator(){
  state.step = 0;
  renderStep();
  showScreen("calculator");
}

function renderStep(){
  const step = steps[state.step];
  $("stepLabel").textContent = step.label;
  $("stepCount").textContent = `${state.step + 1} / ${steps.length}`;
  $("progressBar").style.width = `${((state.step + 1) / steps.length) * 100}%`;
  $("questionIcon").textContent = step.icon;
  $("questionKicker").textContent = `CATEGORY 0${state.step + 1}`;
  $("questionTitle").textContent = step.title;
  $("questionDesc").textContent = step.desc;
  $("questionBody").innerHTML = step.render();
  $("prevStepBtn").style.visibility = state.step === 0 ? "hidden" : "visible";
  $("nextStepBtn").innerHTML = state.step === steps.length - 1 ? "Calculate footprint <span>→</span>" : "Continue <span>→</span>";
  wireInputs();
}

function renderFood(){
  return `
    ${choiceGroup("What best describes your usual diet?", "foodType", [
      ["plant","Mostly plant-based"],["mixed","Mixed"],["meat","Mostly meat-based"],["plant","Mostly vegetarian"]
    ])}
    <div class="form-group">
      <label class="form-label">How often do you eat outside each week?</label>
      <div class="range-wrap"><input data-range="foodOut" type="range" min="0" max="14" step="1" value="${state.answers.foodOut}"><span class="range-value" id="foodOutValue">${state.answers.foodOut}×</span></div>
    </div>
    ${choiceGroup("How much food do you usually waste?", "foodWaste", [
      ["wasteLow","Almost none"],["wasteMedium","A little"],["wasteHigh","Frequently"]
    ])}
    <div class="form-group">
      <label class="form-label">Food deliveries per week</label>
      <div class="range-wrap"><input data-range="delivery" type="range" min="0" max="14" step="1" value="${state.answers.delivery}"><span class="range-value" id="deliveryValue">${state.answers.delivery}×</span></div>
    </div>`;
}

function renderTransport(){
  return `
    ${choiceGroup("How do you usually travel to college?", "transportMode", [
      ["bike","Motorcycle / scooter"],["car","Car"],["bus","Bus"],["metro","Metro / train"],["auto","Auto-rickshaw"],["walk","Walk / cycle"]
    ])}
    <div class="form-group">
      <label class="form-label">Approximate one-way distance</label>
      <div class="range-wrap"><input data-range="transportDistance" type="range" min="0" max="60" step="1" value="${state.answers.transportDistance}"><span class="range-value" id="transportDistanceValue">${state.answers.transportDistance} km</span></div>
    </div>
    <div class="form-group">
      <label class="form-label">Days per week you make this commute</label>
      <div class="range-wrap"><input data-range="transportDays" type="range" min="0" max="7" step="1" value="${state.answers.transportDays}"><span class="range-value" id="transportDaysValue">${state.answers.transportDays} days</span></div>
    </div>
    ${choiceGroup("Do you regularly reduce the impact of these trips?", "transportExtra", [
      ["none","Not usually"],["carpool","Carpool / share rides"],["public","Switch some trips to public transport"]
    ])}`;
}

function renderElectricity(){
  return `
    ${choiceGroup("How do you want to estimate electricity?", "electricityMode", [
      ["direct","I know my monthly kWh"],["estimate","Estimate from my devices"]
    ])}
    <div class="form-group">
      <label class="form-label">Monthly electricity usage (kWh)</label>
      <input id="electricityKwhInput" type="number" min="0" max="2000" step="1" value="${state.answers.electricityKwh}" ${state.answers.electricityMode==="estimate" ? "disabled" : ""}>
      <small style="color:var(--muted);display:block;margin-top:7px">Approximate is fine. Check your electricity bill if available.</small>
    </div>
    <div class="form-group">
      <label class="form-label">If estimating: how many regularly used devices/appliances?</label>
      <div class="range-wrap"><input data-range="devices" type="range" min="1" max="12" step="1" value="${state.answers.devices}"><span class="range-value" id="devicesValue">${state.answers.devices}</span></div>
    </div>`;
}

function renderWaste(){
  return `
    ${choiceGroup("How would you describe your usual waste generation?", "wasteLevel", [
      ["low","Low"],["medium","Moderate"],["high","High"]
    ])}
    ${choiceGroup("Do you separate recyclable material?", "recycle", [
      ["yes","Usually"],["sometimes","Sometimes"],["no","Not usually"]
    ])}`;
}

function renderConsumption(){
  return `
    ${choiceGroup("How often do you buy new clothes?", "clothing", [
      ["Low","Rarely"],["Medium","Every few months"],["High","Frequently"]
    ])}
    ${choiceGroup("How often do you buy electronics?", "electronics", [
      ["Low","Rarely"],["Medium","Occasionally"],["High","Frequently"]
    ])}
    ${choiceGroup("How often do you make online purchases?", "online", [
      ["Low","Rarely"],["Medium","Sometimes"],["High","Often"]
    ])}`;
}

function choiceGroup(label, name, options){
  return `<div class="form-group"><label class="form-label">${label}</label><div class="option-grid">${options.map(([value,text], index)=>{
    const id = `${name}-${index}`;
    return `<div class="option"><input id="${id}" type="radio" name="${name}" value="${value}" ${String(state.answers[name])===String(value)?"checked":""}><label for="${id}">${text}</label></div>`;
  }).join("")}</div></div>`;
}

function wireInputs(){
  document.querySelectorAll("#questionBody .option").forEach(option=>{
    option.addEventListener("click", e=>{
      if(e.target.tagName.toLowerCase() !== "input"){
        const input = option.querySelector('input[type="radio"]');
        if(input){
          input.checked = true;
          input.dispatchEvent(new Event("change", {bubbles:true}));
        }
      }
    });
  });
  document.querySelectorAll("#questionBody input[type=radio]").forEach(input=>{
    input.addEventListener("change", e => {
      state.answers[e.target.name] = e.target.value;
      if(e.target.name === "electricityMode"){
        $("questionBody").innerHTML = steps[state.step].render();
        wireInputs();
      }
    });
  });
  document.querySelectorAll("[data-range]").forEach(input=>{
    const key = input.dataset.range;
    const valueId = `${key}Value`;
    input.addEventListener("input", e=>{
      const val = Number(e.target.value);
      state.answers[key]=val;
      if($(valueId)){
        const suffix = key==="transportDistance" ? " km" : key==="transportDays" ? " days" : "×";
        $(valueId).textContent = val + suffix;
      }
    });
  });
  const electricityInput = $("electricityKwhInput");
  if(electricityInput){
    electricityInput.addEventListener("input", e => state.answers.electricityKwh = Number(e.target.value));
  }
}


function calculateFootprint(a){
  const f = EMISSION_FACTORS;

  // Food: existing UI uses broad monthly proxy values.
  const foodBase = f.food[a.foodType] || f.food.mixed;
  const foodWaste = f.food[a.foodWaste] || 0;
  const foodOutside = (Number(a.foodOut) || 0) * 4.33 * f.food.eatingOut;
  const delivery = (Number(a.delivery) || 0) * 4.33 * f.food.delivery;
  const food = foodBase + foodWaste + foodOutside + delivery;

  // Transport: distance is one-way, so multiply by 2 for a return trip.
  // 4.33 converts weekly commuting into an approximate monthly value.
  const distance = Number(a.transportDistance) || 0;
  const days = Number(a.transportDays) || 0;
  const monthlyKm = distance * 2 * days * 4.33;
  let transport = monthlyKm * (f.transport[a.transportMode] || 0);

  if(a.transportExtra === "carpool"){
    transport *= 0.75;
  } else if(a.transportExtra === "public"){
    transport *= 0.85;
  }

  // Electricity: direct monthly kWh or a simple device estimate.
  let kwh = Number(a.electricityKwh) || 0;
  if(a.electricityMode === "estimate"){
    kwh = (Number(a.devices) || 0) * 8 * 30 / 1000;
  }
  const electricity = kwh * f.electricity;

  // Waste and consumption remain transparent screening proxies.
  let waste = f.waste[a.wasteLevel] || f.waste.medium;
  if(a.recycle === "yes") waste *= f.waste.recycleBonus;
  else if(a.recycle === "sometimes") waste *= 0.91;

  const clothing = f.consumption["clothing" + a.clothing] || 0;
  const electronics = f.consumption["electronics" + a.electronics] || 0;
  const online = f.consumption["online" + a.online] || 0;
  const consumption = clothing + electronics + online;

  const categories = {food, transport, electricity, waste, consumption};
  const total = Object.values(categories).reduce((sum, value) => sum + value, 0);
  return {categories, total};
}

function nextStep(){
  if(state.step < steps.length - 1){
    state.step++;
    renderStep();
  } else {
    state.result = calculateFootprint(state.answers);
    renderResults();
    showScreen("results");
  }
}

function prevStep(){
  if(state.step>0){state.step--;renderStep();}
}


const CATEGORY_META = {
  food: {name:"Food & drink", icon:"🍽️"},
  transport: {name:"Transportation", icon:"🚗"},
  electricity: {name:"Electricity", icon:"⚡"},
  waste: {name:"Waste", icon:"♻️"},
  consumption: {name:"Everyday consumption", icon:"🛍️"}
};

function categoryPercentage(value,total){return total ? (value/total*100) : 0}

function renderResults(){
  const {categories,total} = state.result;
  $("totalFootprint").textContent = Math.round(total);
  $("chartCenter").textContent = Math.round(total);

  const ranked = Object.entries(categories).sort((a,b)=>b[1]-a[1]);
  const [topKey, topAmount] = ranked[0];
  $("biggestIcon").textContent = CATEGORY_META[topKey].icon;
  $("biggestName").textContent = CATEGORY_META[topKey].name;
  $("biggestAmount").textContent = Math.round(topAmount);
  $("biggestText").textContent = `${Math.round(categoryPercentage(topAmount,total))}% of your estimated monthly footprint comes from ${CATEGORY_META[topKey].name.toLowerCase()}.`;
  $("scoreNote").textContent = "This is an estimate based on the activity information you entered and the emission factors configured for the calculator.";

  renderBars(categories,total);
  drawDonut(categories,total);
  renderRecommendations(topKey, topAmount, total);
  renderWhatIf(topKey, total);
}

function renderBars(categories,total){
  const sorted = Object.entries(categories).sort((a,b)=>b[1]-a[1]);
  $("breakdownBars").innerHTML = sorted.map(([key,value])=>`
    <div class="bar-row">
      <div class="bar-label">${CATEGORY_META[key].name}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${categoryPercentage(value,total)}%"></div></div>
      <div class="bar-number">${Math.round(value)} kg · ${Math.round(categoryPercentage(value,total))}%</div>
    </div>`).join("");
}

function drawDonut(categories,total){
  const canvas = $("donutChart"), ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const size = 320;
  canvas.width = size*ratio; canvas.height = size*ratio; ctx.scale(ratio,ratio);
  ctx.clearRect(0,0,size,size);
  const entries = Object.entries(categories);
  const colors = ["#6c9c70","#9fbe8c","#d5b16c","#93a6a0","#b8a2be"];
  let start = -Math.PI/2;
  entries.forEach(([key,value],i)=>{
    const angle = total ? (value/total)*Math.PI*2 : 0;
    ctx.beginPath();
    ctx.arc(size/2,size/2,115,start,start+angle);
    ctx.lineWidth=35;
    ctx.strokeStyle=colors[i];
    ctx.lineCap="butt";
    ctx.stroke();
    start += angle;
  });
  // center mask
  ctx.beginPath(); ctx.arc(size/2,size/2,92,0,Math.PI*2); ctx.fillStyle=getComputedStyle(document.body).getPropertyValue("--surface-solid"); ctx.fill();
}

const recommendations = {
  food: {
    title:"Start by reducing avoidable food waste.",
    tag:"FOOD & DRINK",
    main:"Food has the largest estimated share of your footprint. Focus first on waste and convenience habits rather than trying to completely change your diet overnight.",
    items:[
      ["Plan purchases","Buy closer to what you realistically use."],
      ["Use leftovers","Keep edible food from becoming unnecessary waste."],
      ["Store food properly","Better storage can extend shelf life and prevent avoidable disposal."]
    ]
  },
  transport:{
    title:"Make your commute your first lever.",
    tag:"TRANSPORTATION",
    main:"Transportation is your largest estimated category. A few repeated changes to your normal commute can add up more than a one-off “perfect” choice.",
    items:[
      ["Share two rides","Carpool or share a journey where practical."],
      ["Combine trips","Avoid separate journeys when one trip can handle several tasks."],
      ["Try public transport","Replace some individual journeys with bus or rail."]
    ]
  },
  electricity:{
    title:"Trim the electricity you use most often.",
    tag:"ELECTRICITY",
    main:"Electricity is your largest estimated category. Target the appliances and habits you use for the longest periods rather than worrying about tiny one-off loads.",
    items:[
      ["Reduce idle use","Switch off devices and appliances that are not needed."],
      ["Target long-running loads","Fans, AC and other long-use appliances deserve attention first."],
      ["Track your bill","Comparing monthly kWh makes improvement measurable."]
    ]
  },
  waste:{
    title:"Reduce the amount that becomes waste.",
    tag:"WASTE",
    main:"Your waste category stands out in the estimate. Prevention is usually more useful than trying to manage waste after it has already been created.",
    items:[
      ["Separate recyclables","Keep recoverable material out of general waste."],
      ["Avoid disposable items","Prefer reusables where practical."],
      ["Watch food waste","Unnecessary food disposal carries impacts from the resources used to produce it."]
    ]
  },
  consumption:{
    title:"Buy less, but buy more intentionally.",
    tag:"EVERYDAY CONSUMPTION",
    main:"Your everyday purchases add up. Focus on extending the life of what you already own and slowing down non-essential buying.",
    items:[
      ["Delay non-essential purchases","A short pause can reduce impulse buying."],
      ["Use what you own","Repair, reuse and keep items longer when practical."],
      ["Think about need","Choose purchases for usefulness, not just convenience."]
    ]
  }
};

function renderRecommendations(key,amount,total){
  const r = recommendations[key];
  $("recTitle").textContent = r.title;
  $("recMain").innerHTML = `<div class="rec-tag">${r.tag}</div><h3>${Math.round(amount)} kg CO₂e/month</h3><p>${r.main}</p><div class="rec-list">${r.items.map((item,i)=>`<div class="rec-item"><span>${i+1}</span><div><strong>${item[0]}</strong><p>${item[1]}</p></div></div>`).join("")}</div>`;
  $("recSmall1").textContent = r.items[0][0];
  $("recSmallText1").textContent = r.items[0][1];
  $("recSmall2").textContent = r.items[1][0];
  $("recSmallText2").textContent = r.items[1][1];
}

function renderWhatIf(topKey,total){
  const options = [
    {icon:"↘",title:"Make one 15% cut",text:"Reduce your biggest category by 15%.",factor:.85},
    {icon:"↗",title:"Reduce waste",text:"Cut your waste-related impact by 30%.",special:"waste"},
    {icon:"✦",title:"Combine two habits",text:"Reduce your two largest categories by 10%.",factor2:.9}
  ];
  $("whatIfGrid").innerHTML = options.map((o,i)=>`<div class="whatif-card ${i===0?"selected":""}" data-index="${i}"><button><div class="whatif-icon">${o.icon}</div><h3>${o.title}</h3><p>${o.text}</p><div class="whatif-saving" id="saving${i}"></div></button></div>`).join("");
  const calc = () => {
    const cards = document.querySelectorAll(".whatif-card");
    cards.forEach(c=>c.classList.remove("selected"));
    const selected = [...cards].find(c=>Number(c.dataset.index)===state.whatIfReduction);
    if(selected) selected.classList.add("selected");
    let value = total;
    if(state.whatIfReduction===0){
      value = total - state.result.categories[topKey]*.15;
    } else if(state.whatIfReduction===1){
      value = total - state.result.categories.waste*.30;
    } else {
      const sorted = Object.entries(state.result.categories).sort((a,b)=>b[1]-a[1]);
      value = total - (sorted[0][1]+sorted[1][1])*.10;
    }
    $("whatIfTotal").textContent = Math.max(0,Math.round(value));
    [...cards].forEach((c,i)=>{
      const saving = i===0 ? state.result.categories[topKey]*.15 : i===1 ? state.result.categories.waste*.30 : Object.entries(state.result.categories).sort((a,b)=>b[1]-a[1]).slice(0,2).reduce((a,[,v])=>a+v,0)*.10;
      $(`saving${i}`).textContent = `≈ ${Math.round(saving)} kg less / month`;
    });
  };
  document.querySelectorAll(".whatif-card").forEach(c=>c.addEventListener("click",()=>{state.whatIfReduction=Number(c.dataset.index);calc()}));
  calc();
}

function restart(){showScreen("home");}

$("startBtn").addEventListener("click", startCalculator);
$("howBtn").addEventListener("click", ()=>document.querySelector("#how").scrollIntoView({behavior:"smooth"}));
$("nextStepBtn").addEventListener("click", nextStep);
$("prevStepBtn").addEventListener("click", prevStep);
$("backBtn").addEventListener("click", restart);
$("restartTop").addEventListener("click", restart);
$("restartBottom").addEventListener("click", restart);
$("themeToggle").addEventListener("click",()=>document.body.classList.toggle("dark"));

window.addEventListener("resize",()=>{if(state.result) drawDonut(state.result.categories,state.result.total)});

showScreen("home");
