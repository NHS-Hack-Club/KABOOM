class Level2 {
  level = [
    "@          ",
    "    ^^^ $$$",
    "============"
  ]
  
  initializeInteractions() {
    // Jumping
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
      player.move(-SPEED, 0)
    })

    onKeyDown("right", () => {
      player.move(SPEED, 0)
    })


    // DIE
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
      console.log(++levelID)
      renderNewLevel(levelID)
      camPos(player.worldPos())
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
  }
}