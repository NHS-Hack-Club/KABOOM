class Level1 {
  
  constructor(global) {
    this.global = global
    this.MAXX = 1000
    this.MAXY = 1000
    this.levelLayout=[
      "@      ",
      "   ^ $$ ^  #",
      "============",
    ]
    // Set the game's gravity.
    setGravity(1250)
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
    this.initializeInteractions();
  }
  
  initializeInteractions() {
    // Jumping
    var player = this.player
    var level = this.level
    
    var canDoubleJump = false
    onKeyPress("space", () => {
      if (player.isGrounded()) {
        canDoubleJump = true
        player.jump()
      } else if (canDoubleJump) {
        canDoubleJump = false
        addKaboom(vec2(player.pos.x+100, player.pos.y+350), {scale: 0.5})
        player.jump()
      }
    })

    // Movement
    onKeyDown("left", () => {
      player.move(-this.global.SPEED, 0)
    })

    onKeyDown("right", () => {
      player.move(this.global.SPEED, 0)
    })


    // DIE
    function die() {
      player.pos = level.tile2Pos(0, -2);
      player.grounded = true;
      
      player.vel.x = 0
      player.vel.y = 0
    }


    // Back to the original position if hit a "danger" item
    player.onCollide("danger", () => {
      die()
    })

    player.onCollide("coin", (theCoin) => {
      destroy(theCoin)
    })
    
    player.onUpdate(() => {
      // Set the viewport center to player.pos
      camPos(player.worldPos())
      // Prevent Player from going off
      if (player.pos.y >= this.MAXY || player.pos.y <= -this.MAXY || player.pos.x >= this.MAXX || player.pos.x <=-this.MAXX) {
          die();
      }
    })

    player.onPhysicsResolve(() => {
      // Set the viewport center to player.pos
      camPos(player.worldPos())
    })
    
    
    // DO NOT CHANGE THIS SO THAT WE CAN ALWAYS GO TO THE NEXT LEVEL
    player.onCollide("portal", () => {
      level.destroy()
       

      document.dispatchEvent(new CustomEvent("nextLevel"));
    })
  }
}
