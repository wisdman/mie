import STYLES from "./SVG_editor.css"
import TEMPLATE from "./SVG_editor.html"

export class LitSVGeditor extends HTMLElement {
	static TAG_NAME = 'lit-svg-editor'
	static ROUTE = "/svg_editor"
	static Init() {
		customElements.define(this.TAG_NAME, this)
	}
	private _root = this.attachShadow({mode: 'open'})
	constructor() {
        super()
        this._root.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`
    }
}