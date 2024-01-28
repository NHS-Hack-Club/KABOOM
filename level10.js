class Level10 extends Level {
  //Victor
  constructor(global) {
    super();
    this.global = global;
    this.MAXX = 6000;
    this.MAXY = 4000;
    this.levelLayout = [
      "                                 ",
      "@               =                ",
      "               =           O       ",
      "=================================",
     ];
    // Set the game's gravity.
    setGravity(1220);
  }

  renderNewLevel() {
    this.level = addLevel(this.levelLayout, {
      // The size of each grid tile
      tileWidth: 64,
      tileHeight: 64,
      // The on-screen position of the top left block
      pos: vec2(100, 400),
      // Define what each symbol means. Each symbol has a "game object" associated with it.
      tiles: {
        "@": () => [
          sprite("ghosty"),
          area(),
          body(),
          anchor("bot"),
          doubleJump(2),
          "player", // Including a string here adds a tag to the object that you can refer to later.
        ],
        "=": () => [
          sprite("grass"),
          area(),
          body({ isStatic: true }),
          anchor("bot"),
        ],
        $: () => [sprite("coin"), area(), anchor("bot"), "coin"],
        0: () => [sprite("portal"), area(), anchor("bot"), "danger"],
        "^": () => [sprite("spike"), area(), anchor("bot"), "danger"],
        "#": () => [sprite("portal"), area(), anchor("bot"), "portal"],
        "O": () => [sprite("enemy"),area(), anchor("bot"),"enemy"]
        
      },
    });

    this.player = this.level.get("player")[0];
    this.setControls();
    this.initializeInteractions();
  }
  setControlsEnemy () {
    var player = this.player;
    var enemy = this.enemy;
    var level = this.level;
    // Movement
    onKeyDown("left", () => {
      enemy.move(480, 0);
    })

    onKeyDown("right", () => {
      ememy.move(-480, 0);
    })
  }  
  
  initializeInteractions() {
    var player = this.player;
    var level = this.level;

    // Back to the original position if hit a "danger" item
    player.onCollide("danger", () => {
      this.die();
    });
    
    
    player.onCollide("enemy", () => {
      this.die();
    });

    player.onCollide("coin", (theCoin) => {
      destroy(theCoin);
    });
  }
}
