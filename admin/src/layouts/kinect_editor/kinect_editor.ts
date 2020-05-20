import STYLES from "./kinect_editor.css"
import TEMPLATE from "./kinect_editor.html"

export class LitKinectEditor extends HTMLElement {
	static TAG_NAME = 'lit-kinect-editor'
	static ROUTE = "/kinect_editor"
	static Init() {
		customElements.define(this.TAG_NAME, this)
	}
	private _root = this.attachShadow({mode: 'open'})
	constructor() {
        super()
        this._root.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`
    }
}