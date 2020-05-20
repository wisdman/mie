import STYLES from "./a.css"
import { Router } from "../router"

export class LitA extends HTMLElement {
	static TAG_NAME = 'lit-a'

	static Init() {
		customElements.define(this.TAG_NAME, this)
	}
	private _root = this.attachShadow({mode: 'open'})
	constructor() {
        super()
        this._root.innerHTML = `<style>${STYLES}</style><slot></slot>`
        this.addEventListener("click", event => {
        	event.preventDefault()
        	const route = this.getAttribute("href") || ""
            const id = this.getAttribute("for") || ""
            Router.route({route, id})
        })
    }
}