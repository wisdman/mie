
const WIDTH = 512
const HEIGHT = 424
const MAX_DEPTH = 4500

const LOG_LENGTH = 30

class Depth {
  #canvas = document.createElement("canvas")
  #ctx = this.#canvas.getContext("2d")
  #imageData = this.#ctx.createImageData(WIDTH, HEIGHT)
  #pixelArray = this.#imageData.data
  #imageDataSize = this.#pixelArray.length

  #logData = new Array(LOG_LENGTH)

  constructor() {
    this.#canvas.width = WIDTH
    this.#canvas.height = HEIGHT
    this.#canvas.classList.add("depth-canvas")
    this.#canvas.style.setProperty("--width", WIDTH)
    this.#canvas.style.setProperty("--height", HEIGHT)
    //document.body.appendChild(this.#canvas)
    window.addEventListener("depth", this.#onDepth)
    window.addEventListener("keydown", this.#keydown)
  }

  #onDepth = ({detail: {depth}}) => {
    this.#render(depth)
    this.#log(depth)
  }

  #render = depth => {
    let depthPixelIndex = 0
    for (let i = 0; i < this.#imageDataSize; i+=4) {
      const value = depth[depthPixelIndex] ?? 0
      depthPixelIndex++

      const gray = value / MAX_DEPTH * 255
      this.#pixelArray[i] = gray
      this.#pixelArray[i+1] = gray
      this.#pixelArray[i+2] = gray
      this.#pixelArray[i+3] = 0xff
    }
    requestAnimationFrame(() => this.#ctx.putImageData(this.#imageData, 0, 0))
  }

  #log = depth => {
    this.#logData.shift()
    this.#logData.push(depth)
  }

  #save = () => {
    const a = document.createElement("a")
    const file = new Blob([JSON.stringify(this.#logData)], {type: "text/plain"})
    a.href = URL.createObjectURL(file)
    a.download = "log.json";
    a.click()
  }

  #keydown = event => {
    switch(event.key.toUpperCase()) {
      case "S":
        this.#save()
        break

      default:
        return
    }

    event.preventDefault()
    event.stopPropagation()
  }

}

void async function main() {
  new Depth()
}()