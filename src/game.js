import { Player } from './components/player'
import { Tower } from './components/tower'
import { Enemy } from './components/enemy'

export class Game {
  constructor(canvas, textures) {
    this.canvas = canvas
    this.gameObjects = []
    this.enemies = []
    this.textures = textures
    this.slideSpeed = 2
    this.enemiesSpawned = 0
    this.distanceSlided = 0
    const wallSize = 32 * 3
    this.gameObjects.push(
      this.player = new Player(canvas.c.width - wallSize - 16, canvas.c.height - 3 * 32, textures.kitten, 32, 32)
    )
    for (let i = 0; i < 500; i += 1) {
      const tower = new Tower(canvas.c.width - wallSize, -i * wallSize + canvas.c.height, textures.kitten, 32, 32, i % 4 * 32, 3, 3)
      tower.speed = this.slideSpeed
      this.gameObjects.push(tower)
    }

    canvas.bkg(0.227, 0.227, 0.227)
    this.update()
    this.animate(4)
    this.mainLoop()
  }

  spawnEnemy() {
    const pos = -(Math.random() * 32)
    const enemy = new Enemy(this.canvas.c.width - 32 * 3 - 16, pos, this.textures.kitten, this.textures.arrow, 32, 32)
    enemy.speed = this.slideSpeed
    this.gameObjects.push(enemy)
    this.enemies.push(enemy)
    this.enemiesSpawned += 1
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
      gameObject.update({ player: this.player })
    })
    if (this.distanceSlided / (this.canvas.c.height / 4) > this.enemiesSpawned) {
      this.spawnEnemy()
    }
    this.distanceSlided += this.slideSpeed
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

  move(dir) {
    const nextEnemy = this.enemies[0]
    if (!nextEnemy) {
      alert('you lost')
      return
    }
    if (!nextEnemy.inRange || dir !== nextEnemy.dir) {
      alert('you lost')
      return
    }
    
    const index = this.gameObjects.indexOf(nextEnemy)
    this.gameObjects.splice(index, 1)
    this.enemies.shift()
  }
}
