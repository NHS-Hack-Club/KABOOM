// This line imports the Kaboom library.
import kaboom from "https://unpkg.com/kaboom@^3000.0.12/dist/kaboom.mjs";

// This creates the kaboom game, makes it full screen
kaboom({
  background: [135, 206, 235], // sets the color of the game
});

// These are the sprites for the game (ignore the errors)
loadSprite("bean", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/bean.png?v=1688618964513")
loadSprite("coin", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/coin.png?v=1688618966800")
loadSprite("spike", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/spike.png?v=1688618977354")
loadSprite("grass", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/grass.png?v=1688618971014")
loadSprite("ghosty", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/ghosty.png?v=1688618969880")



// How fast the player moves
const SPEED = 480
const MAXX = 3000
const MAXY = 3000


// Set the game's gravity.
setGravity(1250)

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// EDIT THE LEVELS HERE!!!!!!!//////////////////////////////////////////////////////
const levels = [
  [
  "@      ",
	"   ^ $$                             ^^^",
	"=======================================",
  ],
  [
  "@          ",
  "    ^^^ $$$",
  "============"
  ]
]
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var levelID = 0;
var level;
var player;


function renderNewLevel(id) {
  if (level !== undefined) {
    level.destroy()
  }
  
  level = addLevel(
  levels[id], {
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
			anchor("bot"), 
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
  
  player = level.get("player")[0]
}

renderNewLevel(levelID) // Starts up the first level

  
// Movements
var canDoubleJump = false
onKeyPress("space", () => {
	if (player.isGrounded() || canDoubleJump == true) {
    if (canDoubleJump) {
      canDoubleJump = false
      addKaboom(vec2(player.pos.x, player.pos.y))
    }
    if (player.isGrounded()) {
      canDoubleJump = true
    }
		player.jump()   
	}
})

onKeyDown("left", () => {
	player.move(-SPEED, 0)
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
})

function die() {
	player.pos = level.tile2Pos(0, -2);
  player.grounded = true;
}


// Back to the original position if hit a "danger" item
player.onCollide("danger", () => {
  die()
})


player.onCollide("coin", (theCoin) => {
  destroy(theCoin)
})

player.onCollide("portal", () => {
  level.destroy()
  renderNewLevel(++levelID)
})

player.onUpdate(() => {
	// Set the viewport center to player.pos
	camPos(player.worldPos())
  // Prevent Player from going off
  if (player.pos.y >= MAXY || player.pos.y <= -MAXY || player.pos.x >= MAXX || player.pos.x <=- MAXX) {
			die();
	}
})

player.onPhysicsResolve(() => {
	// Set the viewport center to player.pos
	camPos(player.worldPos())
})

