import { Player } from './components/player'
import { Tower } from './components/tower'

export class Game {
  constructor(canvas, textures) {
    this.canvas = canvas
    this.gameObjects = []
    this.gameObjects.push(
      new Player(canvas.c.width / 4 * 3 - 32, canvas.c.height / 4 * 3, textures.kitten, 32, 32)
    )
    for (let i = 0; i < 500; i += 1) {
      const tower = new Tower(canvas.c.width / 4 * 3, -i * 32 + canvas.c.height, textures.kitten, 32, 32, i % 4 * 32)
      this.gameObjects.push(tower)
    }
    canvas.bkg(0.227, 0.227, 0.227)
    this.update()
    this.animate(5)
    this.mainLoop()
  }

  animate(fps) {
    setInterval(() => {
      this.gameObjects.forEach(gameObject => {
        gameObject.animate()
      })
    }, 1000 / fps)
  }

  update() {
    this.gameObjects.forEach(gameObject => {
      gameObject.update()
    })
  }

  draw() {
    this.canvas.cls()
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(this.canvas)
    })
    this.canvas.flush()
  }

  mainLoop() {
    requestAnimationFrame(this.mainLoop.bind(this))
    this.update()
    this.draw()
  }
}
