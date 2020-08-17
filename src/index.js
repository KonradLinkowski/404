import { TS, TCTex } from './libs/ts'
import kittenstex from './assets/kittens.png'
import arrowtex from './assets/arrow.png'
import { Game } from './game'

const $c = document.getElementById('game-canvas')
const canvas = TS($c)

let game = null

const textures = {
  kitten: kittenstex,
  arrow: arrowtex
}

const move = dir => {
  console.log(dir)
  game.move(dir)
}

let touchStart = null

$c.addEventListener('touchstart', event => {
  touchStart = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
  }
})

$c.addEventListener('touchend', event => {
  const diff = {
    x: event.changedTouches[0].clientX - touchStart.x,
    y: event.changedTouches[0].clientY - touchStart.y
  }
  touchStart = null
  const ratio = Math.abs(diff.x) / Math.abs(diff.y)
  const absRatio = Math.abs(ratio)
  const lenght = Math.hypot(diff.x, diff.y)
  if (lenght < 50 || (absRatio > 0.9 && absRatio < 1.1)) {
    return
  }
  if (absRatio > 1) {
    if (diff.x < 0) {
      move('left')
    } else {
      move('right')
    }
  } else {
    if (diff.y < 0) {
      move('up')
    } else {
      move('down')
    }
  }
})

window.addEventListener('keydown', event => {
  const mapping = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    KeyW: 'up',
    KeyS: 'down',
    KeyA: 'left',
    KeyD: 'right',
  }

  const dir = mapping[event.code]
  move(dir)
})

const loadImage = src => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.src = src
  })
}

const createTexture = async ([name, src]) => {
  const image = await loadImage(src)
  return [
    name,
    TCTex(canvas.g, image, image.width, image.height)
  ]
}

Promise.all(Object.entries(textures).map(createTexture))
.then(textures => Object.fromEntries(textures))
.then(textures => {
  game = new Game(canvas, textures)
})
.catch(error => {
  console.error(error)
})
