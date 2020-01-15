function flatten(array){
	return array.reduce((acc, val) => acc.concat(val), []);  
}
	
function lineSplit(string){
	array = string.split("\n")
	for(var i = 0; i < array.length; i++){
		array[i] = array[i].split(" ")
		for(var j = 0; j < array[i].length; j++){
			while(array[i][j+1]){
				if( (array[i][j].length+array[i][j+1].length+1) - ((array[i][j].split("\\").length-1 + array[i][j+1].split("\\").length-1)*2) <= 19){
					array[i][j] = array[i][j]+" "+array[i][j+1]
					array[i].splice(j+1,1)
				}else{
					break;
				}
			}
		}
	}
	return flatten(array)
}

class Card{
	
	
	
	constructor(data){
		// console.log(data)
		this.canvas = document.createElement("canvas")
		this.canvas.width="768"
		this.canvas.height="1024"
		// this.canvas.style = "border:1px solid #000000;"
		this.canvas.className = "col-ss-3"
		this.atk = data.atk || 99
		this.hp = data.hp || 99
		this.name = data.name || "Missing Text"
		this.rarity = data.rarity || "generated"
		this.cost = data.cost || "99"
		this.description = data.description || ""
		this.img = data.img || "backgroundLight.png"
		this.refreshCanvas()
	}
	
	refreshCanvas(){
		var ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, 768,1028)
		
		var cardThis = this
		
		var monsterImage = document.createElement("img")
		monsterImage.src = "img/card/monster/" + cardThis.img
		
		monsterImage.onload = function(){
			ctx.drawImage(monsterImage,143,172,480,360)
			var img = document.createElement("img")
			img.src = "img/card/cardFrame.png"
			img.onload = function(){
				ctx.drawImage(img,0,0)
				ctx.font = "bold 46px DTM-Mono";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillStyle = "black"
				ctx.fillText(cardThis.name, 768/2, 114); //Title
				ctx.font = "60px DTM-Mono";
				ctx.fillStyle = "#0066FF"
				ctx.fillText(cardThis.cost.toString(), 570, 211); //COST
				ctx.fillStyle = "#E00000"
				ctx.fillText(cardThis.atk, 122, 931); //ATK
				ctx.fillStyle = "#00AE46"
				ctx.fillText(cardThis.hp, 647, 931); //HP
				
				ctx.fillStyle = "white"
				
				var cardText = lineSplit(cardThis.description)
				ctx.font = "48px DTM-Mono";
				
				// if(cardText.length>6){
					// throw new Error("Exceed maximum 6 line number for cards with "+cardText.length+" lines")
				// }
				
				for(var i = 0; i < cardText.length; i++){
					
					var lineText = cardText[i]
					ctx.textAlign = "left";
					var escapeSplit = lineText.split("\\")
					
					var textWidth = ctx.measureText(lineText).width - ctx.measureText("\\").width * (escapeSplit.length-1)
					for(var j = 1; j<escapeSplit.length; j++){
						textWidth -= ctx.measureText(escapeSplit[j].charAt(0)).width
					}
					var currentX = (768/2)-(textWidth/2)
					
					var escaping = false
					
					for(var j = 0; j<lineText.length; j++){
						
						var ch = lineText.charAt(j)
						var charWidth = ctx.measureText(ch).width
						
						if(ch == "\\"){
							escaping = true
							continue
						}
						
						if(escaping == true){
							
							if(ch == "r"){
								ctx.font = "48px DTM-Mono";
								ctx.fillStyle = "white"
							}else if(ch == "B"){
								ctx.fillStyle = "#00FFFF"
							}else if(ch == "Y"){
								ctx.fillStyle = "#FFFF00"
							}else if(ch == "R"){
								ctx.fillStyle = "#FF0000"
							}else if(ch == "G"){
								ctx.fillStyle = "#00FF00"
							}else if(ch == "P"){
								ctx.fillStyle = "#E800FF"
							}
							
							escaping = false
							continue
						}
						
						
						ctx.fillText(ch, currentX, 700-((cardText.length+1)/2-(i+1))*46); //line 1
						currentX += charWidth
						
					}
					
				}
				
				
				var rarity = document.createElement("img")
				rarity.src = "img/card/rarity/"+cardThis.rarity+".png"
				rarity.onload = function(){
					ctx.drawImage(rarity,(768-216)/2,940-98) //RARITY
				}
				
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	
	
}