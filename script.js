// This line imports the Kaboom library.
import kaboom from "https://unpkg.com/kaboom@^3000.0.12/dist/kaboom.mjs";

document.getElementById("startButton").addEventListener("click", ()=>{
  kaboom({
    background: [135, 206, 235], // sets the color of the game
    
  });
  // These are the sprites for the game (ignore the errors)
  loadSprite("bean", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/bean.png?v=1688618964513")
  loadSprite("coin", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/coin.png?v=1688618966800")
  loadSprite("spike", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/spike.png?v=1688618977354")
  loadSprite("grass", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/grass.png?v=1688618971014")
  loadSprite("ghosty", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/ghosty.png?v=1688618969880")
  loadSprite("portal", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/portal.png?v=1688618976168")
  
  // any global variables
  var global = {coins:0, lives:3}
  
  
 
  const levels = [
  new Level1(global),
  new Level2(global),
  new Level3(global),
  new Level4(global),
  new Level5(global),
  new Level6(global),
  new Level7(global)
  ]

  //Sets the starting level Index
  var levelID = Number(document.getElementById("playerLevelChoice").value);
  
  //Renders the first level with level Id
  levels[levelID].renderNewLevel();
  
  
    document.addEventListener("nextLevel", () => {
    if (levelID+1 >= levels.length) {
      alert("No more levels!")
    } else {
      levels[++levelID].renderNewLevel();
    }
  })
});








