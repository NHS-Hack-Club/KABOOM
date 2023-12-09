// This line imports the Kaboom library.
import kaboom from "https://unpkg.com/kaboom@^3000.0.12/dist/kaboom.mjs";

// This creates the kaboom game, makes it full screen
kaboom({
  background: [135, 206, 235], // sets the color of the game
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Configurations and global variables here!

// These are the sprites for the game (ignore the errors)
loadSprite("bean", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/bean.png?v=1688618964513")
loadSprite("coin", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/coin.png?v=1688618966800")
loadSprite("spike", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/spike.png?v=1688618977354")
loadSprite("grass", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/grass.png?v=1688618971014")
loadSprite("ghosty", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/ghosty.png?v=1688618969880")
loadSprite("portal", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/portal.png?v=1688618976168")


var global = {
// How fast the player moves
SPEED: 480,

// The maximum x and y the player can move to (the boundaries)
MAXX: 200000,
MAXY: 100000,
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

















////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Add your levels here!

const levels = [
  new Level1(global),
  new Level2(global),
  new Level3(global)
]


var levelID=0;

levels[levelID].renderNewLevel();

document.addEventListener("nextLevel", () => {
  if (levelID+1 >= levels.length) {
    alert("No more levels!")
  } else {
    levels[++levelID].renderNewLevel();
  }
})