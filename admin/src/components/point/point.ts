import STYLES from "./point.css"
import TEMPLATE from "./point.html"
import {Point} from "../../libs/point"
import {PROPERTY_CHANGE_EVENT, PropertyChangeEvent} from "../../libs/change_event"

export class LitPoint extends HTMLElement {
	static TAG_NAME = 'lit-point'
	static Init() {
		customElements.define(this.TAG_NAME, this)
	}

	private _root = this.attachShadow({mode: 'open'})

	constructor(private _point:Point) {
        super()
        this._root.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`
        this.x = this._point.x
        this.y = this._point.y
        this._point.on(PROPERTY_CHANGE_EVENT, ({detail}: PropertyChangeEvent) => {
            const [name, value] = detail
            if (name === "active") this.active = !!value
        })
    }

    get x() {
        return Number.parseInt(getComputedStyle(this).getPropertyValue('--x'));
    }

    get y() {
        return Number.parseInt(getComputedStyle(this).getPropertyValue('--y'));
    }

    set x(value:number) {
        this.style.setProperty('--x', String(value))
    }

    set y(value:number) {
        this.style.setProperty('--y', String(value))
    }

    set active(value: boolean) {
        if (value) {
            this.classList.add("active")
            window.addEventListener("keydown", this._onKeyDown)
            return
        }

        this.classList.remove("active")
        window.removeEventListener("keydown", this._onKeyDown)
    }

    get active(): boolean {
        return this.classList.contains("active")
    }

    private _onKeyDown = (event:KeyboardEvent) => {
        if(this._movement) return
        switch (event.key.toUpperCase()) {
            case 'ARROWUP':
                this.y = this._point.y = this._point.y - 1
                break
            case 'ARROWDOWN':
                this.y = this._point.y = this._point.y + 1
                break
            case 'ARROWLEFT':
                this.x = this._point.x = this._point.x - 1
                break
            case 'ARROWRIGHT':
                this.x = this._point.x = this._point.x + 1
                break
            default: return  
        }
        event.preventDefault()
    }


    private _movement:boolean = false
    private _coords:[number,number] = [0,0]
    private _onPointerDown = (event:PointerEvent) => {
        event.preventDefault()
        event.stopPropagation()
        this._point.active = true
        const dx = event.clientX - this._point.x
        const dy = event.clientY - this._point.y
        this._coords = [dx,dy]
        window.addEventListener("pointermove", this._onPointerMove, {passive: true})
        window.addEventListener("pointerup", this._onPointerUp, {once: true, passive: true})
        window.addEventListener("pointercancel", this._onPointerUp, {once: true, passive: true})
        this._movement = true
    }

    private _onPointerMove = (event:PointerEvent) => {
        if(!this._movement) return
        const [dx,dy] = this._coords
        requestAnimationFrame(_ => {
          this.x = this._point.x = event.clientX - dx
          this.y = this._point.y = event.clientY - dy
          // this.style.setProperty('--translate-x', String(x - event.clientX + dx))
          // this.style.setProperty('--translate-y', String(y - event.clientY + dy))
        })
    }

    private _onPointerUp = () => {
        this._movement = false
        window.removeEventListener("pointermove", this._onPointerMove)
    }

    connectedCallback() {
        this.addEventListener("pointerdown", this._onPointerDown, {capture: true})
    }

    disconnectedCallback() {
        this.removeEventListener("pointerdown", this._onPointerDown, {capture: true})
        window.removeEventListener("keydown", this._onKeyDown)
    }
}