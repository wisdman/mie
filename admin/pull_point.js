export class PullPoint extends HTMLElement {
    static CSS_PATH = 'pull_point.css'
    static TAG_NAME = 'pull-point'

    constructor(x = 0, y = 0) {
        super()
        this.root = this.attachShadow({mode: 'open'})

        const styles = document.createElement('link')
        styles.href = PullPoint.CSS_PATH
        styles.rel = 'stylesheet'
        this.root.appendChild(styles)

        this.x = x
        this.y = y

        this.initEvents()
    }

    onPointerDown = ({clientX, clientY}) => {
        this.delta = [ clientX - this.x, clientY - this.y ]
        this.moveStart()
        this.classList.add('active')
    }

    onPointerMove = ({clientX, clientY}) => {
        if(!this.delta) return
        const [x,y] = this.delta
        this.x = clientX - x
        this.y = clientY - y
        this.onChange()
    }

    onPointerUp = ({clientX, clientY}) => {
        this.moveStop()
        this.delta = undefined    
        this.classList.remove('active')
        this.onChange()
    }

    onChange() {
        const event = new CustomEvent('change', {detail: [this.x, this.y]})
        this.dispatchEvent(event)
    }

    get x() {
        return Number.parseInt(getComputedStyle(this).getPropertyValue('--x'));
    }

    get y() {
        return Number.parseInt(getComputedStyle(this).getPropertyValue('--y'));
    }

    set x(value) {
        this.style.setProperty('--x', value)
    }

    set y(value) {
        this.style.setProperty('--y', value)
    }

    initEvents() {
        this.addEventListener('pointerdown', this.onPointerDown)
    }

    moveStart() {
        window.addEventListener('pointermove', this.onPointerMove, {capture: true})
        window.addEventListener('pointerup', this.onPointerUp, {capture: true})
    }

    moveStop() {
        window.removeEventListener('pointermove', this.onPointerMove, {capture: true})
        window.removeEventListener('pointerup', this.onPointerUp, {capture: true})
    }
}

customElements.define(PullPoint.TAG_NAME, PullPoint)