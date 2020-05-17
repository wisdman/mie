import { EditorStorage } from './editor_storage.js'
import { PullPoint } from './pull_point.js'

const XMLNS = "http://www.w3.org/2000/svg"

class PathEditor extends HTMLElement {
  static CSS_PATH = 'editor.css'
  static TAG_NAME = 'path-editor'
  static ChunkArray(arr, size) {
    let result = []
    for(let i = 0; i < arr.length; i+=size) {
      result.push(arr.slice(i,i+size))
    }
    return result
  }

  leftTopNode = new PullPoint()
  rightBottomNode = new PullPoint()
  svg = document.createElementNS(XMLNS, "svg")

  onStorageChange = ({detail}) => {
    const [x1,y1,x2,y2] = detail.field
    this.leftTopNode.x = x1
    this.leftTopNode.y = y1
    this.rightBottomNode.x = x2
    this.rightBottomNode.y = y2
    this.style.setProperty('--x1', x1)
    this.style.setProperty('--y1', y1)
    this.style.setProperty('--x2', x2)
    this.style.setProperty('--y2', y2)
    const width = x2 - x1
    const height = y2 - y1
    this.svg.setAttributeNS(null, "viewbox", `0 0 ${width} ${height}`)
    this.svg.setAttributeNS(null, "width", width)
    this.svg.setAttributeNS(null, "height", height)

    this.refreshItems(detail.items)
  }

  constructor() {
    super()
    this.storage = new EditorStorage()
    this.storage.on('change', this.onStorageChange)
    this.storage.pull().then()
    this.root = this.attachShadow({mode: 'open'})

    const styles = document.createElement('link')
    styles.href = PathEditor.CSS_PATH
    styles.rel = 'stylesheet'
    this.root.appendChild(styles)

    this.root.appendChild(this.svg)

    this.root.appendChild(this.leftTopNode)
    this.root.appendChild(this.rightBottomNode)

    this.leftTopNode.addEventListener('change', ({detail}) => {
      this.storage.push({field: detail})
    })

    this.rightBottomNode.addEventListener('change', ({detail}) => {
      this.storage.push({field: [undefined, undefined, ...detail]})
    })

    this.keyBinding()

    //this.addEventListener("pointerdown", ()=>{ this.selectPath(null) })
  }

  newPath() {
    // const path = document.createElementNS(XMLNS, "path")
    // path.setAttributeNS(null, "d", "M 10 10 L 30 10 L 30 30 L 10 30 Z")
    // this.svg.appendChild(path)
    const arr = new Array(this.storage.data.items.length)
    this.storage.push({items: [...arr, {
      path: [10, 10, 100, 10, 100, 100, 10, 100]
    }]})
  }

  keyBinding() {
    window.addEventListener("keydown", (event) => {
      console.log(event.key)
      switch (event.key.toUpperCase()) {
        case 'N': 
          if(this.selectedPath >= 0) {
            this.newPoint()
          }
          else this.newPath()
          break
        case 'D':
          this.deletePath()
          break
        default: return  
      }
      event.preventDefault()
    })
  }

  refreshItems(items = []) {
    const paths = Array.from(this.svg.querySelectorAll("path"))
    let i = 0
    for(;i < items.length;i++) {
      const d = "M" + PathEditor.ChunkArray(items[i].path, 2).map( v => v.join(" ")).join(" L ") + "Z"   
      if(paths[i]) {
        paths[i].setAttributeNS(null, "d", d)
        continue
      }
      const path = document.createElementNS(XMLNS, "path")
      const id = i
      path.addEventListener("pointerdown", (event)=>{ 
        this.selectPath(id)
        // event.stopPropagation()
        // event.preventDefault()
      })
      path.setAttributeNS(null, "d", d)
      this.svg.appendChild(path)
    }
    for(;i < paths.length;i++) {
      paths[i].remove()
    }

    if(this.selectedPath >= 0 && this.selectedPath < items.length) {
      this.selectPath(this.selectedPath)
    }
    else {
      this.selectPath(null)
    }
  }

  buttons = []

  selectPath(id = null) {
    
    const activeNode = Array.from(this.svg.querySelectorAll("path")).filter((path, i) => path.classList.remove("active") || id === i)[0]
    activeNode && activeNode.classList.add("active")

    for(let i = 0;i < this.buttons.length; i++) {
      this.buttons[i].remove()
    }

    this.buttons = []

    if (id < 0 || id === null) {
      this.selectedPath = null
      return
    }

    this.selectedPath = id

    //const coord = PathEditor.ChunkArray(this.storage.data.items[id].path, 2)
    for(let i = 0;i < this.storage.data.items[id].path.length; i+=2) {
      const x = this.storage.data.items[id].path[i]
      const y = this.storage.data.items[id].path[i+1]
      const button = new PullPoint(x, y)
      button.addEventListener("change", ({detail}) => {
        const items = new Array(this.storage.data.items.length)
        const path = new Array(this.storage.data.items[id].path.length)
        path[i] = detail[0]
        path[i+1] = detail[1]
        items[id] = { path }
        this.storage.push({ items })
      })
      this.root.appendChild(button)
      this.buttons.push(button)
    }

  }

  deletePath() {
    if(this.selectedPath >= 0) {
      const id = this.selectedPath
      this.selectPath(null)
      const items = new Array(this.storage.data.items.length)
      items[id] = null
      console.log(items)
      this.storage.push({
        items
      })
    }
  }

  newPoint() {
    const id = this.selectedPath
    const [x1,y1,x2,y2] = this.storage.data.items[id].path.slice(-4)
    const x = (Math.max(x1, x2) - Math.min(x1, x2)) / 2 + Math.min(x1, x2)
    const y = (Math.max(y1, y2) - Math.min(y1, y2)) / 2 + Math.min(y1, y2)
    const items = new Array(this.storage.data.items.length)
    items[id] = {path: [...this.storage.data.items[id].path.slice(0,-4), x1, y1, x, y, x2, y2] }
    this.storage.push({
      items
    })
  }

}

customElements.define(PathEditor.TAG_NAME, PathEditor)