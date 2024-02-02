/*
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////DO NOT MODIFY THE CODE BELOW////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
*/
function loadjscssfile(filename, filetype){
	if (filetype=="js"){ //if filename is a external JavaScript file
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", filename)
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
}
function removejscssfile(filename, filetype){
	var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
	var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
	var allsuspects=document.getElementsByTagName(targetelement)
	for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
		allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
	}
}  
/*
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// YOU CAN MODIFY CODE BELOW /////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
*/


/*
This function loads the images for the sprites
*/
function loadSprites() {
	loadSprite("bean", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/bean.png?v=1688618964513")
	loadSprite("coin", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/coin.png?v=1688618966800")
	loadSprite("spike", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/spike.png?v=1688618977354")
	loadSprite("grass", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/grass.png?v=1688618971014")
	loadSprite("ghosty", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/ghosty.png?v=1688618969880")
	loadSprite("portal", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/portal.png?v=1688618976168")
	loadSprite("ninja", "https://cdn.glitch.global/e4191fbe-6aa2-4565-b2f8-45b16c7137fd/ninja.png?v=1705703717150")
	loadSprite("enemy", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/onion.png?v=1688618975053")
	loadSprite("diya", "https://cdn.glitch.global/e4191fbe-6aa2-4565-b2f8-45b16c7137fd/diya.png?v=1706308399460")
}




/* 
Global variables
Coins: For shop
Lives: Lose each time they die  
*/
window.global = {coins:0, lives:3}

/* 
Level Management
*/
var levelID = 0
const levels = [
	"level1.js",
	"level2.js",
]

/*
Handler for starting the game
*/
document.getElementById("selection").addEventListener("submit", (e) => {
	e.preventDefault(); // prevents the page from being reloaded (VERY IMPORTANT DO NOT DELETE)
	// Checks if the levelID inputted is valid
	var playerChoice = document.getElementById("playerLevelChoice").value
	if (parseInt(playerChoice) <= levels.length || playerChoice == ""){
		if (playerChoice == "") levelID = 0
		else levelID = parseInt(playerChoice)
		
		// Creates the game
		kaboom({
			background: [135, 206, 235], // sets the color of the game
		});
		// Load the sprites
		loadSprites();
		
		//Renders the first level with level id
		console.log("Level: " + levelID)
		loadjscssfile(levels[levelID], "js");
	} else {
		alert("Not a level! (Remember that the levels are 0-indexed)")
		return;
	}
}) 

/*
Handler for going to the next level 
DO NOT CHANGE THIS CODE
*/
document.addEventListener("nextLevel", () => {
	if (levelID+1 >= levels.length) {
		alert("No more levels!")
	} else {
		delete window.Level;
		delete window.l;
		removejscssfile(levels[levelID], "js");
		loadjscssfile(levels[++levelID], "js");
		console.log("Level: " + levelID)
	}
})

/*
Handler for restarting a level
*/
document.addEventListener("die", () => {
	window.l.renderNewLevel();
})







