class Level {

    // DIE
  die() {
    var player = this.player
    var level = this.level
    player.pos = level.tile2Pos(0, -2);
    player.grounded = true;

    player.vel.x = 0
    player.vel.y = 0
  }
  
  setControls () {
    var player = this.player
    var level = this.level
    // Movement
    onKeyDown("left", () => {
      player.move(-480, 0)
    })

    onKeyDown("right", () => {
      player.move(480, 0)
    })
    
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
    
    player.onCollide("portal", () => {
      level.destroy()

      document.dispatchEvent(new CustomEvent("nextLevel"));
    })
    
    player.onPhysicsResolve(() => {
      // Set the viewport center to player.pos
      camPos(player.worldPos())
    })
    
    onKeyPress("r", () => this.die(player))
    
   player.onUpdate(() => {
      // Set the viewport center to player.pos
      camPos(player.worldPos())
      // Prevent Player from going off
      if (player.pos.y >= this.MAXY || player.pos.y <= -this.MAXY || player.pos.x >= this.MAXX || player.pos.x <=-this.MAXX) {
          this.die();
      }
    })
  }
}