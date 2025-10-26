// gameData 將由建置腳本注入
let searchMode='or',searchScope='all',currentTab='crops',searchQuery='';
let filters={season:'all',windmill:'all',category:'all',cookingCategory:'all',recovery:'all',continuous:'all',effect:'all',maxDays:14};
let sortState={crops:{column:null,asc:true},processed:{column:null,asc:true},cooking:{column:null,asc:true}};

function escapeHtml(text){
if(!text)return '';
return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function init(){populateFilters();renderAllTables();attachEventListeners();updateTabBadges()}

function populateFilters(){
const categories=[...new Set(gameData.processed.map(item=>item.category))].filter(c=>c).sort();
const categoryFilter=document.getElementById('categoryFilter');
categories.forEach(cat=>{const option=document.createElement('option');option.value=cat;option.textContent=cat;categoryFilter.appendChild(option)});
const cookingCategories=[...new Set(gameData.cooking.map(item=>item.category))].filter(c=>c).sort();
const cookingCategoryFilter=document.getElementById('cookingCategoryFilter');
cookingCategories.forEach(cat=>{const option=document.createElement('option');option.value=cat;option.textContent=cat;cookingCategoryFilter.appendChild(option)});
const effects=[...new Set(gameData.cooking.map(item=>{
if(!item.effect)return null;
return item.effect.replace(/LV\d+/g,'').trim();
}).filter(e=>e))].sort();
const effectFilter=document.getElementById('effectFilter');
effects.forEach(eff=>{const option=document.createElement('option');option.value=eff;option.textContent=eff;effectFilter.appendChild(option)});
}

function cleanMaterialName(material){
return material.replace(/[*×xX]\d+/g,'').replace(/\([^)]*\)/g,'').trim()
}

function matchesSearch(item,type){
if(!searchQuery)return true;
const searchTerms=searchQuery.toLowerCase().split(/[,\s]+/).filter(t=>t);
const nameMatch=searchTerms.some(term=>item.name.toLowerCase().includes(term));
let materials=[];
if(type==='processed'){
materials=item.materials.map(m=>cleanMaterialName(m).toLowerCase())
}else if(type==='cooking'){
materials=searchScope==='main'?item.materials.map(m=>cleanMaterialName(m).toLowerCase()):[...item.materials,...item.ingenuity].map(m=>cleanMaterialName(m).toLowerCase())
}else if(type==='crops'){
materials=[item.name.toLowerCase()]
}
if(searchMode==='or'){
const materialMatch=searchTerms.some(term=>materials.some(mat=>mat.includes(term)));
return nameMatch||materialMatch
}else{
const materialMatch=searchTerms.every(term=>materials.some(mat=>mat.includes(term))||item.name.toLowerCase().includes(term));
return materialMatch
}
}

function sortData(data,column,asc,type){
return data.sort((a,b)=>{
let valA,valB;
switch(column){
case'name':valA=a.name;valB=b.name;break;
case'price':valA=a.price||0;valB=b.price||0;break;
case'days':valA=a.days||0;valB=b.days||0;break;
case'harvest':valA=a.harvest||0;valB=b.harvest||0;break;
default:return 0
}
if(typeof valA==='string'){
return asc?valA.localeCompare(valB,'zh-TW'):valB.localeCompare(valA,'zh-TW')
}else{
return asc?valA-valB:valB-valA
}
})
}

function getWindmillClass(windmill){
if(windmill.includes('紅色'))return 'windmill-red';
if(windmill.includes('藍色'))return 'windmill-blue';
if(windmill.includes('黃色'))return 'windmill-yellow';
return '';
}

function getCategoryClass(category,type){
if(type==='processed'){
return 'cat-'+category;
}else if(type==='cooking'){
const normalized=category.replace(/\(.*?\)/g,'').replace(/[\s]/g,'');
return 'cook-'+normalized;
}
return '';
}

function renderCropsTable(){
const tbody=document.getElementById('cropsTable');
const noResults=document.getElementById('cropsNoResults');
let filtered=gameData.crops.filter(item=>{
if(!matchesSearch(item,'crops'))return false;
if(filters.season!=='all'&&!item.seasons.includes(filters.season))return false;
if(filters.continuous==='yes'&&!item.continuous)return false;
if(filters.continuous==='no'&&item.continuous)return false;
if(item.days>0&&item.days>filters.maxDays)return false;
return true
});
if(sortState.crops.column){filtered=sortData(filtered,sortState.crops.column,sortState.crops.asc,'crops')}
if(filtered.length===0){
tbody.innerHTML='';noResults.style.display='block'
}else{
noResults.style.display='none';
const rows=filtered.map(item=>{
const seasonBadges=item.seasons.map(s=>{
const seasonClass={'春':'spring','夏':'summer','秋':'autumn','冬':'winter'}[s];
return '<span class="season-badge season-'+seasonClass+'">'+escapeHtml(s)+'</span>'
}).join('');
const cropName='<span class="crop-name-tag" onclick="searchMaterial(\''+escapeHtml(item.name)+'\')">'+escapeHtml(item.name)+'</span>';
return '<tr><td><strong>'+cropName+'</strong></td><td>'+(seasonBadges||'-')+'</td><td>'+(item.days>0?item.days+' 天':'-')+'</td><td>'+(item.continuous?'<span class="continuous-badge">'+escapeHtml(item.continuous)+'</span>':'-')+'</td><td>'+(item.harvest>0?item.harvest:'-')+'</td><td><span class="price">'+(item.price>0?item.price.toLocaleString()+'G':'-')+'</span></td></tr>'
});
tbody.innerHTML=rows.join('')
}
document.getElementById('cropsStats').textContent='顯示 '+filtered.length+' 個項目';
updateSortHeaders('crops');
return filtered.length
}

function renderProcessedTable(){
const tbody=document.getElementById('processedTable');
const noResults=document.getElementById('processedNoResults');
let filtered=gameData.processed.filter(item=>{
if(!matchesSearch(item,'processed'))return false;
if(filters.windmill!=='all'&&item.windmill!==filters.windmill)return false;
if(filters.category!=='all'&&item.category!==filters.category)return false;
return true
});
if(sortState.processed.column){filtered=sortData(filtered,sortState.processed.column,sortState.processed.asc,'processed')}
if(filtered.length===0){
tbody.innerHTML='';noResults.style.display='block'
}else{
noResults.style.display='none';
const rows=filtered.map(item=>{
const materialTags=item.materials.map(m=>{
const cleaned=cleanMaterialName(m);
return '<span class="material-tag" onclick="searchMaterial(\''+escapeHtml(cleaned)+'\')">'+escapeHtml(m)+'</span>'
}).join('');
const catClass=getCategoryClass(item.category||'','processed');
const windClass=getWindmillClass(item.windmill||'');
return '<tr><td><strong>'+escapeHtml(item.name)+'</strong></td><td><span class="category-badge '+catClass+'">'+escapeHtml(item.category||'-')+'</span></td><td><span class="category-badge '+windClass+'">'+escapeHtml(item.windmill||'-')+'</span></td><td>'+(materialTags||'-')+'</td><td><span class="price">'+(item.price>0?item.price.toLocaleString()+'G':'-')+'</span></td></tr>'
});
tbody.innerHTML=rows.join('')
}
document.getElementById('processedStats').textContent='顯示 '+filtered.length+' 個項目';
updateSortHeaders('processed');
return filtered.length
}

function renderCookingTable(){
const tbody=document.getElementById('cookingTable');
const noResults=document.getElementById('cookingNoResults');
let filtered=gameData.cooking.filter(item=>{
if(!matchesSearch(item,'cooking'))return false;
if(filters.recovery!=='all'&&item.recovery!==filters.recovery)return false;
if(filters.cookingCategory!=='all'&&item.category!==filters.cookingCategory)return false;
if(filters.effect!=='all'){
const itemEffect=(item.effect||'').replace(/LV\d+/g,'').trim();
if(itemEffect!==filters.effect)return false;
}
return true
});
if(sortState.cooking.column){filtered=sortData(filtered,sortState.cooking.column,sortState.cooking.asc,'cooking')}
if(filtered.length===0){
tbody.innerHTML='';noResults.style.display='block'
}else{
noResults.style.display='none';
const rows=filtered.map(item=>{
const materialTags=item.materials.map(m=>{
const cleaned=cleanMaterialName(m);
return '<span class="material-tag" onclick="searchMaterial(\''+escapeHtml(cleaned)+'\')">'+escapeHtml(m)+'</span>'
}).join('');
const ingenuityTags=item.ingenuity.length>0?item.ingenuity.map(m=>{
const cleaned=cleanMaterialName(m);
return '<span class="material-tag" onclick="searchMaterial(\''+escapeHtml(cleaned)+'\')">'+escapeHtml(m)+'</span>'
}).join(''):'-';
const catClass=getCategoryClass(item.category||'','cooking');
return '<tr><td><strong>'+escapeHtml(item.name)+'</strong></td><td><span class="category-badge '+catClass+'">'+escapeHtml(item.category||'-')+'</span></td><td>'+(materialTags||'-')+'</td><td>'+ingenuityTags+'</td><td>'+escapeHtml(item.effect||'-')+'</td><td>'+escapeHtml(item.recovery||'-')+'</td><td><span class="price">'+(item.price>0?item.price.toLocaleString()+'G':'-')+'</span></td></tr>'
});
tbody.innerHTML=rows.join('')
}
document.getElementById('cookingStats').textContent='顯示 '+filtered.length+' 個項目';
updateSortHeaders('cooking');
return filtered.length
}

function updateSortHeaders(type){
const container=document.getElementById(type);
const headers=container.querySelectorAll('th.sortable');
headers.forEach(th=>{
th.classList.remove('sorted-asc','sorted-desc');
if(sortState[type].column===th.dataset.sort){
th.classList.add(sortState[type].asc?'sorted-asc':'sorted-desc')
}
})
}

function renderAllTables(){renderCropsTable();renderProcessedTable();renderCookingTable()}

function updateTabBadges(){
const counts={crops:renderCropsTable(),processed:renderProcessedTable(),cooking:renderCookingTable()};
document.querySelectorAll('.tab').forEach(tab=>{
const tabName=tab.dataset.tab;
const badge=tab.querySelector('.badge');
if(badge)badge.textContent=counts[tabName]
});
if(searchQuery){
const summary=document.getElementById('searchSummary');
summary.style.display='flex';
const badges=summary.querySelectorAll('.result-badge');
badges[0].querySelector('.count').textContent=counts.crops;
badges[1].querySelector('.count').textContent=counts.processed;
badges[2].querySelector('.count').textContent=counts.cooking
}else{
document.getElementById('searchSummary').style.display='none'
}
}

function searchMaterial(materialName){
const cleaned=materialName.split(/\s+or\s+/i).map(s=>s.trim()).filter(s=>s).join(',');
document.getElementById('globalSearch').value=cleaned;
performSearch()
}

function performSearch(){
searchQuery=document.getElementById('globalSearch').value.trim();
const scopeToggle=document.getElementById('searchScopeToggle');
if(searchQuery&&currentTab==='cooking'){
scopeToggle.style.display='flex'
}else{
scopeToggle.style.display='none'
}
updateTabBadges()
}

function switchTab(tabName){
document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
document.querySelector('.tab[data-tab="'+tabName+'"]').classList.add('active');
document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
document.getElementById(tabName).classList.add('active');
currentTab=tabName;
performSearch()
}

function attachEventListeners(){
document.getElementById('globalSearch').addEventListener('input',performSearch);
document.getElementById('clearSearch').addEventListener('click',function(){
document.getElementById('globalSearch').value='';
searchQuery='';
updateTabBadges()
});
document.querySelectorAll('.mode-btn').forEach(btn=>{
btn.addEventListener('click',function(){
document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));
this.classList.add('active');
searchMode=this.dataset.mode;
performSearch()
})
});
document.querySelectorAll('.scope-btn').forEach(btn=>{
btn.addEventListener('click',function(){
document.querySelectorAll('.scope-btn').forEach(b=>b.classList.remove('active'));
this.classList.add('active');
searchScope=this.dataset.scope;
performSearch()
})
});
document.querySelectorAll('.tab').forEach(tab=>{
tab.addEventListener('click',function(){switchTab(this.dataset.tab)})
});
document.querySelectorAll('.result-badge').forEach(badge=>{
badge.addEventListener('click',function(){switchTab(this.dataset.tab)})
});
document.getElementById('seasonFilter').addEventListener('change',function(){
filters.season=this.value;
updateTabBadges()
});
document.getElementById('continuousFilter').addEventListener('change',function(){
filters.continuous=this.value;
updateTabBadges()
});
document.getElementById('daysSlider').addEventListener('input',function(){
filters.maxDays=parseInt(this.value);
document.getElementById('daysValue').textContent='≤ '+filters.maxDays+' 天';
updateTabBadges()
});
document.getElementById('windmillFilter').addEventListener('change',function(){
filters.windmill=this.value;
updateTabBadges()
});
document.getElementById('categoryFilter').addEventListener('change',function(){
filters.category=this.value;
updateTabBadges()
});
document.getElementById('cookingCategoryFilter').addEventListener('change',function(){
filters.cookingCategory=this.value;
updateTabBadges()
});
document.getElementById('recoveryFilter').addEventListener('change',function(){
filters.recovery=this.value;
updateTabBadges()
});
document.getElementById('effectFilter').addEventListener('change',function(){
filters.effect=this.value;
updateTabBadges()
});
document.querySelectorAll('th.sortable').forEach(th=>{
th.addEventListener('click',function(){
const type=this.closest('.tab-content').id;
const column=this.dataset.sort;
if(sortState[type].column===column){
sortState[type].asc=!sortState[type].asc
}else{
sortState[type].column=column;
sortState[type].asc=true
}
updateTabBadges()
})
})
}

init()