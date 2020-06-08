import STYLES from "./polygon_editor.css"
import {Polygon} from "../../libs/polygon"
import {PROPERTY_CHANGE_EVENT} from "../../libs/events"
import {LitPoint} from "../point/point"

export class LitPolygonEditor extends HTMLElement {
	static TAG_NAME = 'lit-polygon-editor'
	static Init() {
		customElements.define(this.TAG_NAME, this)
	}
    //private _pathsList = new PathList()
	private _root = this.attachShadow({mode: 'open'})

	 constructor() {
        super()
        this._init().then(this._onInit)
    }

    private async _init() {
        const svg = await (await fetch("/mapping.svg")).text()
        this._root.innerHTML = `<style>${STYLES}</style>${svg}`
    }

    private _onInit = () => {
        const svgNode = this._root.querySelector("svg")
        const polygonList = Array.from(this._root.querySelectorAll("polygon")).map(polygonNode=>{
            const points = (polygonNode.getAttribute("points") as string)
                                        .split(",")
                                        .map(coords => coords.trim().split(/\s+/).map((v) => parseFloat(v)) as [number, number])
            const polygon = new Polygon({points}, svgNode)
            polygon.on(PROPERTY_CHANGE_EVENT, ()=>{
                console.log(polygon.toString())
            })
            return polygon
        })
        this._renderPoints(polygonList)
    } 


    private _renderPoints = (polygonList:Array<Polygon>) => {
        requestAnimationFrame(() => {
            this._root.querySelectorAll(LitPoint.TAG_NAME).forEach(node => this._root.removeChild(node))
            const {x:dx, y:dy} = (this._root.querySelector("svg") as Element).getBoundingClientRect()
            for(const polygon of polygonList) {
                for(const point of polygon.points) {
                    const litPointNode = new LitPoint(point, {dx, dy})
                    this._root.appendChild(litPointNode)
                }
            }
            
        })
    }   
}