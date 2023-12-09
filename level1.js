class Level1 extends Level{
  
  constructor(global) {
    super()
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
    this.setControls(this.player, this.level)
    this.initializeInteractions();
  }
  
  initializeInteractions() {
    // Jumping
    var player = this.player
    var level = this.level


    // Back to the original position if hit a "danger" item
    player.onCollide("danger", () => {
      this.die(player)
    })

    player.onCollide("coin", (theCoin) => {
      destroy(theCoin)
    })
    
    player.onUpdate(() => {
      // Set the viewport center to player.pos
      camPos(player.worldPos())
      // Prevent Player from going off
      if (player.pos.y >= this.MAXY || player.pos.y <= -this.MAXY || player.pos.x >= this.MAXX || player.pos.x <=-this.MAXX) {
          this.die(player);
      }
    })
  }
}
