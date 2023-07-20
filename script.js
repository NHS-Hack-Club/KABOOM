/* eslint-disable no-undef */ // Ignore this line, it just stops the editor from complaining.


/*
 ______    _______  _______  ______     _______  __   __  ___   _______ 
|    _ |  |       ||   _   ||      |   |       ||  | |  ||   | |       |
|   | ||  |    ___||  |_|  ||  _    |  |_     _||  |_|  ||   | |  _____|
|   |_||_ |   |___ |       || | |   |    |   |  |       ||   | | |_____ 
|    __  ||    ___||       || |_|   |    |   |  |       ||   | |_____  |
|   |  | ||   |___ |   _   ||       |    |   |  |   _   ||   |  _____| |
|___|  |_||_______||__| |__||______|     |___|  |__| |__||___| |_______|

Hello!!!! Welcome to Kaboom! In order to make this game work, you'll need to make a few changes. Look for my "STEP" comments below to see where you'll need to add some code!

If you want to refer to some documentation about making games this way, check out https://kaboomjs.com/. The examples (click "Playground" in the sidebar) might also be helpful.

1. Right now, it's pretty hard for Bean to jump over the spikes. Can you make Bean float a bit more?
2. Right now, the coins just sit there when Bean hits them. Bean should be able to collect them and get rich. How can you make the coins disappear?
3. This level's looking a bit small and cramped. Why don't you make it wider, to give Bean some room to breathe?
  3b. Try adding some more variety in the objects (hint: check the Assets tab to the left for a bunch of sprites I've left you!)
4. Add some text to the screen to explain the controls.
*/

// This line imports the Kaboom library.
import kaboom from "https://unpkg.com/kaboom@^3000.0.12/dist/kaboom.mjs";

// Now, let's initialize it. This line just gives you a fullscreen canvas.
kaboom({
  background: [135, 206, 235],
});

// Load in a sprite. I've included a bunch in the project (check the Assets tab to the left). To get a sprite's URL, click it in the Assets view then click "Copy URL".
loadSprite("bean", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/bean.png?v=1688618964513")
loadSprite("coin", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/coin.png?v=1688618966800")
loadSprite("spike", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/spike.png?v=1688618977354")
loadSprite("grass", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/grass.png?v=1688618971014")
loadSprite("ghosty", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/ghosty.png?v=1688618969880")



// How fast the player moves
const SPEED = 480


// Set the game's gravity.
setGravity(5000)

const levels = [
  [
	// Design the level layout with symbols
	"@  ^ $$",
	"=======",
  ],
  // TODO add more levels
]

var levelID = 0;
var level;


function renderNewLevel(id) {
  if (level !== undefined) {
    level.destroy()
  }
  level = addLevel(
  levels[0], {
	// The size of each grid tile
	tileWidth: 64,
	tileHeight: 64,
	// The on-screen position of the top left block
	pos: vec2(100, 400),
	// Define what each symbol means. Each symbol has a "game object" associated with it.
	tiles: {
		"@": () => [
			sprite("bean"), 
			area(), 
			body(),
			anchor("bot"), // This one just sets where the "base" position for rendering is.
			"player", // Including a string here adds a tag to the object that you can refer to later.
		],
		"=": () => [
			sprite("grass"),
			area(),
			body({ isStatic: true }),
			anchor("bot"),
		],
		"$": () => [
			sprite("coin"),
			area(),
			anchor("bot"),
			"coin",
		],
		"^": () => [
			sprite("spike"),
			area(),
			anchor("bot"),
			"danger",
		],
	},
})
}

renderNewLevel(levelID)

// Get the player object from tag
const player = level.get("player")[0]

// Movements
onKeyPress("space", () => {
	if (player.isGrounded()) {
		player.jump()
	}
})

onKeyDown("left", () => {
	player.move(-SPEED, 0)
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
})

// Back to the original position if hit a "danger" item
player.onCollide("danger", () => {
	player.pos = level.tile2Pos(0, 0)
})


player.onCollide("coin", (coin) => {

})
