import {EventEmitter} from "./event_emitter"
import {PropertyChangeEvent, PROPERTY_CHANGE_EVENT} from "./events"
import {Point} from "./point"

export interface IPolygonData { points:Array<[number, number]> }

export class Polygon extends EventEmitter {
	private _points:Array<Point> = []
	private _onPointsChange = () => {
		this.emit(new PropertyChangeEvent("points", this._points))
	}

	constructor({
		points
	}:IPolygonData, private _svg:SVGSVGElement | null = null) {
		super()
		points.forEach(([x,y]) => this.addPoint(new Point(x, y, this._svg)))
	}

	get points() {
		return this._points
	}

	addPoint(point: Point):Point {
		this._points.push(point)
		point.on(PROPERTY_CHANGE_EVENT, this._onPointsChange)
		this._onPointsChange()
		return point 
	}

	removePoint(point: Point):void {
		if(!this._points.includes(point)) {
			throw new Error("Point does not exist")
		}
		point.off(PROPERTY_CHANGE_EVENT, this._onPointsChange)
		this._points = this._points.filter((val) => val !== point)
		this._onPointsChange()
	}

	toString() {
		return this._points.map( point => `${point.x} ${point.y}`).join(",")
	}

	toJSON() {
		return {points: this._points}
	}
}