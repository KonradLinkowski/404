import { GameObject } from "./gameobject"

export class Tower extends GameObject {
  constructor(x, y, texture, width, height, f) {
    super(x, y, texture, width, height)
    this.speed = 2
    this.u0 = 0 / texture.width
    this.v0 = f / texture.height
    this.u1 = this.u0 + (width / texture.width)
    this.v1 = this.v0 + (height / texture.height)
  }

  animate() {}

  update() {
    this.positionY += this.speed
  }
}
