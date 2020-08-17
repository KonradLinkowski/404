import { GameObject } from "./gameobject"

export class Tower extends GameObject {
  constructor(x, y, texture, width, height, f, scaleX = 1, scaleY = 1) {
    super(x, y, texture, width, height, scaleX, scaleY)
    this.speed = 2
    this.u0 = 0 / texture.width
    this.v0 = f / texture.height
    this.u1 = this.u0 + (width / texture.width)
    this.v1 = this.v0 + (height / texture.height)
    this.originX = -0.5
  }

  animate() {}
  
  update({ deltaTime }) {
    this.positionY += this.speed * deltaTime
  }
}
