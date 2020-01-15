var cardArea = document.getElementById("cardDisplayTest")

var searchInput = document.getElementById("searchInput")
var starterCheckbox = document.getElementById("starterFilter")
var commonCheckbox = document.getElementById("commonFilter")
var rareCheckbox = document.getElementById("rareFilter")
var epicCheckbox = document.getElementById("epicFilter")
var legendaryCheckbox = document.getElementById("legendaryFilter")
var generatedCheckbox = document.getElementById("generatedFilter")

var cards = []


function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

var cardFile = loadFile("json/cards.json")
console.log(cardFile)
var cardList = JSON.parse(cardFile)

for(var i = 0;  i<cardList.length; i++){
	cards.push(new Card(cardList[i]))
}













function refreshCardList(){
	cardArea.innerHTML = ""
	
	var rarityFilters = []
	if(starterCheckbox.checked) rarityFilters.push("starter");
	if(commonCheckbox.checked) rarityFilters.push("common");
	if(rareCheckbox.checked) rarityFilters.push("rare");
	if(epicCheckbox.checked) rarityFilters.push("epic");
	if(legendaryCheckbox.checked) rarityFilters.push("legendary");
	if(generatedCheckbox.checked) rarityFilters.push("generated");
	
	for (var i = 0; i < cards.length; i++){
		// cards[i].refreshCanvas()
		var search = searchInput.value.toLowerCase().trim().replace(/\s+/g, ' ')
		if(search.value!=""){
			if(!cards[i].name.toLowerCase().includes(search) && 
			!cards[i].description.split("\n").join(" ").toLowerCase().replace(/\\./g,"").includes(search) &&
			!cards[i].rarity.toLowerCase().includes(search)
			
			) {
				continue;
			}
		}
		
		
		
		if(rarityFilters.length>0){
			if(!rarityFilters.includes(cards[i].rarity)) continue;
		}
		
		cardArea.appendChild(cards[i].canvas)
	}
}

refreshCardList()

searchInput.addEventListener("keyup",function() {refreshCardList()})
starterCheckbox.addEventListener("change",function() {refreshCardList()})
commonCheckbox.addEventListener("change",function() {refreshCardList()})
rareCheckbox.addEventListener("change",function() {refreshCardList()})
epicCheckbox.addEventListener("change",function() {refreshCardList()})
legendaryCheckbox.addEventListener("change",function() {refreshCardList()})
generatedCheckbox.addEventListener("change",function() {refreshCardList()})