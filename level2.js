// Made by Justin
window.Level = class {
	constructor() {
	  this.MAXX = 1000
	  this.MAXY = 1000
	  this.levelLayout=[
		"@      ",
		"$$$$$$$$$$$#",
		"============",
	  ]
	  // Set the game's gravity.
	  setGravity(1250)
	}
	die() {
		destroy(this.player);
		document.dispatchEvent(new CustomEvent("die"));
	}
	
	setControls() {
		var player = this.player
		// Movement
		onKeyDown("left", () => {
			player.move(-480, 0)
		})
		
		onKeyDown("right", () => {
			player.move(480, 0)
		})
		
		onKeyPress("space", () => {
			player.doubleJump();
		})
		
		onKeyPress("up", () => {
			player.doubleJump();
		})
		
		onKeyPress("r", () => {
			player.pos.y  = this.MAXY+1;
			player.pos.x = this.MAXX+1;
		});
		
		player.onDoubleJump(() => {
			addKaboom(camPos().sub(0,50), {scale: 0.5});
		})
		
		player.onPhysicsResolve(() => {
			// Set the viewport center to player.pos
			camPos(player.worldPos())
		})
		
		player.onUpdate(() => {
			// Set the viewport center to player.pos
			camPos(player.worldPos())
			// Prevent player from going off
			if (player.pos.y >= this.MAXY || player.pos.y <= -this.MAXY || player.pos.x >= this.MAXX || player.pos.x <=-this.MAXX) {
				this.die();
			}
		})
	}
	
	renderNewLevel() {
	  this.level = addLevel(
	  this.levelLayout, {
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
			doubleJump(10),
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
		  "#": () => [
			sprite("portal"),
			area(),
			anchor("bot"),
			"portal"
		  ]
		},
	  })
  
	  this.player = this.level.get("player")[0]
	  this.setControls()
	  this.initializeInteractions();
	}
	
	initializeInteractions() {
	  var player = this.player
	  var level = this.level
  
	  // Back to the original position if hit a "danger" item
	  player.onCollide("danger", () => {
		this.die()
	  })
  
	  player.onCollide("coin", (theCoin) => {
		destroy(theCoin)
	  })
	  player.onCollide("portal", () => {
		level.destroy()
  
		document.dispatchEvent(new CustomEvent("nextLevel"));
	  })
	}
}

/* 
This creates a new instance of the level
DO NOT MODIFY
*/
window.l = new window.Level();
window.l.renderNewLevel();