import { GameObject } from "./gameobject"

export class Player extends GameObject {
  constructor(x, y, texture, width, height) {
    super(x, y, texture, width, height)
    this.rotation = -90 * Math.PI / 180
  }
}
