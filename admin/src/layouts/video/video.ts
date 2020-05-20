import STYLES from "./video.css"
import TEMPLATE from "./video.html"

export class LitVideoEditor extends HTMLElement {
	static TAG_NAME = 'lit-video-editor'
	static ROUTE = "/video_editor"
	static Init() {
		customElements.define(this.TAG_NAME, this)
	}
	private _root = this.attachShadow({mode: 'open'})
	constructor() {
        super()
        this._root.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`
    }
}