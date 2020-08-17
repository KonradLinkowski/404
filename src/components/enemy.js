import { GameObject } from "./gameobject"
import { Arrow } from "./arrow"

export class Enemy extends GameObject {
  constructor(x, y, enemyTexture, arrowTexture, width, height) {
    super(x, y, enemyTexture, width, height)
    this.arrowObject = new Arrow(x - this.width * 3, y, arrowTexture, width, height)
    this.rotation = -90 * Math.PI / 180
    this.speed = 2

    this.dir = ['up', 'left', 'down', 'right'][Math.random() * 4 | 0]
    this.arrowObject.setOrientation(this.dir)
    this.inRange = false
  }

  update({ player, deltaTime }) {
    this.positionY += this.speed * deltaTime
    this.arrowObject.positionY = this.positionY
    const distance = Math.abs(player.positionY - this.positionY)
    if (distance < 250) {
      this.arrowObject.setFrame(1, 0)
      this.inRange = true
    }
  }

  draw(canvas) {
    super.draw(canvas)
    this.arrowObject.draw(canvas)
  }
}
