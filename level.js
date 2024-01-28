class Level {

    // DIE

  die() {
    var player = this.player
    var level = this.level
    destroy(player);
    document.dispatchEvent(new CustomEvent("die"));
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
    
    onKeyPress("space", () => {
      player.doubleJump();
    })
    
    onKeyPress("up", () => {
      player.doubleJump();
    })
    
    player.onCollide("portal", () => {
      level.destroy()

      document.dispatchEvent(new CustomEvent("nextLevel"));
    })
    
    player.onDoubleJump(() => {
      addKaboom(camPos().sub(0,50), {scale: 0.5});
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