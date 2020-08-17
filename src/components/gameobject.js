export class GameObject {
  constructor(x, y, texture, width, height) {
    this.positionX = x
    this.positionY = y
    this.width = width
    this.height = height
    this.rotation = 0
    this.texture = texture
    this.currentFrame = 0
    this.maxFrames = this.texture.height / this.height | 0
    this.setFrame(0, 0)
    this.animate(10)
  }

  update() {
    
  }

  setFrame(x, y) {
    this.u0 = x * this.width / this.texture.width
    this.v0 = y * this.height / this.texture.height
    this.u1 = this.u0 + (this.width / this.texture.width)
    this.v1 = this.v0 + (this.height / this.texture.height)
  }

  animate() {
    this.currentFrame = (this.currentFrame + 1) % this.maxFrames
    this.setFrame(0, this.currentFrame)
  }

  draw(canvas) {
    canvas.img(
      this.texture, 
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      this.rotation,
      this.positionX,
      this.positionY,
      1, 
      1,
      this.u0,
      this.v0,
      this.u1,
      this.v1
    )
  }
}
