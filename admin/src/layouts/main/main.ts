import STYLES from "./main.css"
import TEMPLATE from "./main.html"

export class LitMain extends HTMLElement {
	static TAG_NAME = 'lit-main'
	static ROUTE = "/"
	static Init() {
		customElements.define(this.TAG_NAME, this)
	}
	private _root = this.attachShadow({mode: 'open'})
	constructor() {
        super()
        this._root.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`
    }
}