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

1. 
*/

// This line imports the Kaboom library.
import kaboom from "https://unpkg.com/kaboom@^3000.0.12/dist/kaboom.mjs";

// Now, let's initialize it. This line just gives you a fullscreen canvas.
kaboom();

// Load in a sprite. I've included a few in the project (check the Assets tab to the left). To get a sprite's URL, click it in the Assets view then click "Copy URL".
loadSprite("bean", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/bean.png?v=1688618964513")
loadSprite("coin", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/coin.png?v=1688618966800")
loadSprite("spike", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/spike.png?v=1688618977354")
loadSprite("grass", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/grass.png?v=1688618971014")
loadSprite("ghosty", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/ghosty.png?v=1688618969880")



// Add some text. The add() command adds what's called a "Game Object". It takes in a list (in [square brackets]) of "components", or properties of the object.
add([
    text("hello, world!"),
  ])


// This 
const SPEED = 480

setGravity(2400)

const level = addLevel([
	// Design the level layout with symbols
	"@  ^ $$",
	"=======",
], {
	// The size of each grid
	tileWidth: 64,
	tileHeight: 64,
	// The position of the top left block
	pos: vec2(100, 200),
	// Define what each symbol means. Each symbol has a "game object"
	tiles: {
		"@": () => [
			sprite("bean"), // It 
			area(), 
			body(),
			anchor("bot"),
			"player",
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

// Eat the coin!
player.onCollide("coin", (coin) => {
	destroy(coin)
})
