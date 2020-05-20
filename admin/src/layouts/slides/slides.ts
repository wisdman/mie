import STYLES from "./slides.css"
import TEMPLATE from "./slides.html"

export class LitSlidesEditor extends HTMLElement {
	static TAG_NAME = 'lit-slides'
	static ROUTE = "/slides"
	static Init() {
		customElements.define(this.TAG_NAME, this)
	}
	private _root = this.attachShadow({mode: 'open'})
	constructor() {
        super()
        this._root.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`
    }
}