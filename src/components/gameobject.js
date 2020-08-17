export class GameObject {
  constructor(x, y, texture, width, height, scaleX = 1, scaleY = 1) {
    this.positionX = x
    this.positionY = y
    this.width = width
    this.height = height
    this.scaleX = scaleX
    this.scaleY = scaleY
    this.originX = 0
    this.originY = 0
    this.rotation = 0
    this.texture = texture
    this.currentFrame = 0
    this.maxFrames = this.texture.height / this.height | 0
    this.setFrame(0, 0)
    this.animate(10)
  }

  update() {}

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
    const originX = this.width * (-this.originX - 1 / 2)
    const originY = this.height * (-this.originY - 1 / 2)
    canvas.img(
      this.texture, 
      originX,
      originY,
      this.width,
      this.height,
      this.rotation,
      this.positionX,
      this.positionY,
      this.scaleX,
      this.scaleY,
      this.u0,
      this.v0,
      this.u1,
      this.v1
    )
  }
}
