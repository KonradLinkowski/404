import { GameObject } from "./gameobject"

export class Arrow extends GameObject {
  constructor(x, y, texture, width, height) {
    super(x, y, texture, width, height)
  }

  setOrientation(dir) {
    const mapping = {
      up: 0,
      left: -Math.PI / 2,
      down: Math.PI,
      right: Math.PI / 2
    }
    this.rotation = mapping[dir]
  }

  animate() {}
}
