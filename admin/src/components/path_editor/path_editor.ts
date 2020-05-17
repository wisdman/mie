import STYLES from "./path_editor.css"
import TEMPLATE from "./path_editor.html"
import {Path, PATH_ACTIVE_EVENT} from "../../libs/path"
import {PathList} from "../../libs/path_list"
import {PROPERTY_CHANGE_EVENT} from "../../libs/change_event"
import {LitPoint} from "../point/point"
import {STORAGE_KEY} from "../../environment"

const XMLNS = "http://www.w3.org/2000/svg"

export class LitPathEditor extends HTMLElement {
	static TAG_NAME = 'lit-path-editor'
	static Init() {
		customElements.define(this.TAG_NAME, this)
	}
    private _pathsList = new PathList()
	private _root = this.attachShadow({mode: 'open'})
    width = 500
    height = 500

	 constructor() {
        super()
        this._root.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`
        
        this._loadData().then(()=> { 
            this._pathsList.on(PROPERTY_CHANGE_EVENT, this._onPathListChange)
            this._pathsList.on(PATH_ACTIVE_EVENT, this._renderPoints)
            this._renderSVG()
        })
    }

    private _onKeyDown = (event:KeyboardEvent) => {
        switch (event.key.toUpperCase()) {
            case 'N':
                this._pathsList.addPath(new Path())
                break
            case 'D':
                break
            default: return  
        }
        event.preventDefault()

    }

    private _renderSVG = () => {
        const newSVG = document.createElementNS(XMLNS, "svg")
        newSVG.setAttributeNS(null, "viewbox", `0 0 ${this.width} ${this.height}`)
        newSVG.setAttributeNS(null, "width", String(this.width))
        newSVG.setAttributeNS(null, "height", String(this.height))
        for(const path of this._pathsList.paths) {
            const pathNode = document.createElementNS(XMLNS, "path")
            pathNode.setAttributeNS(null, "d", path.d)
            if(path.active) pathNode.classList.add("active")
            pathNode.addEventListener("pointerdown", ()=> path.active = true)
            newSVG.appendChild(pathNode)
        }

        requestAnimationFrame(()=>{
            const oldSVG = this._root.querySelector("svg")
            if(oldSVG !== null) {
                this._root.replaceChild(newSVG, oldSVG)
            }
            else {
                this._root.appendChild(newSVG)
            }
        })
    }

    private _renderPoints = ({detail}:{detail:Path}) => {
        requestAnimationFrame(() => {
            this._root.querySelectorAll(LitPoint.TAG_NAME).forEach(node => this._root.removeChild(node))
            
            for(const point of detail.points) {
                const litPointNode = new LitPoint(point)
                this._root.appendChild(litPointNode)
            }
        })
    }

    private _onPathListChange = () => {
        this._renderSVG()
        this._saveData().then()
    }

    private _saveData() {
        return new Promise(resolve => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this._pathsList))
            resolve(this._pathsList)
        })
    }

    private _loadData() {
        return new Promise(resolve => {
            const localStorageData = localStorage.getItem(STORAGE_KEY)
            this._pathsList = new PathList(localStorageData && JSON.parse(localStorageData) || [])
            resolve(this._pathsList)
        })
    }

    connectedCallback() {
        this._renderSVG()
        window.addEventListener("keydown", this._onKeyDown)
    }

    disconnectedCallback() {
        window.removeEventListener("keydown", this._onKeyDown)
    }    
}