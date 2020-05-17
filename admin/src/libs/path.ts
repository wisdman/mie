import {EventEmitter} from "./event_emitter"
import {PropertyChangeEvent, PROPERTY_CHANGE_EVENT} from "./change_event"
import {Point, POINT_REMOVE_EVENT, POINT_ACTIVE_EVENT} from "./point"

export const PATH_REMOVE_EVENT = "remove"
export const PATH_ACTIVE_EVENT = "activate"
export interface IPathData { points?:Array<[number, number]> }

export class Path extends EventEmitter {
	private _points:Array<Point> = []
	private _onPointsChange = () => {
		this.emit(new PropertyChangeEvent("points", this._points))
	}
	private _onPointRemove = ({detail}:{detail:Point}) => {
		this.removePoint(detail)
	}
	private _onPointActive = ({detail}:{detail:Point}) => {
		this._points.forEach(point => {
			if(point !== detail) point.active = false
		})
	}

	static DEFAULT_PATH:Array<[number, number]> = [[10,10],[50,10],[50,50],[10,50]]

	constructor({
		points = Path.DEFAULT_PATH
	}:IPathData = {}) {
		super()
		points.forEach(([x,y]) => this.addPoint(new Point(x, y)))
	}

	get points() {
		return this._points
	}

	addPoint(point: Point):Point {
		this._points.push(point)
		point.on(PROPERTY_CHANGE_EVENT, this._onPointsChange)
		point.on(POINT_REMOVE_EVENT, this._onPointRemove)
		point.on(POINT_ACTIVE_EVENT, this._onPointActive)
		this._onPointsChange()
		return point 
	}

	removePoint(point: Point):void {
		if(!this._points.includes(point)) {
			throw new Error("Point does not exist")
		}
		point.off(PROPERTY_CHANGE_EVENT, this._onPointsChange)
		point.off(POINT_REMOVE_EVENT, this._onPointRemove)
		point.off(POINT_ACTIVE_EVENT, this._onPointActive)
		this._points = this._points.filter((val) => val !== point)
		this._onPointsChange()
	}

	remove() {
		this._points.forEach(point => {
			point.off(PROPERTY_CHANGE_EVENT, this._onPointsChange)
			point.off(POINT_REMOVE_EVENT, this._onPointRemove)
			point.off(POINT_ACTIVE_EVENT, this._onPointActive)
		})
		this.emit(new CustomEvent<Path>(PATH_REMOVE_EVENT, {detail: this}))
	}

	get d() {
		return "M" + this._points.map( point => `${point.x} ${point.y}`).join(" L ") + "Z"
	}

	private _active:boolean = false
	get active():boolean {
		return this._active
	}
	set active(detail:boolean) {
		if(this._active !== detail) {
			this._active = detail
			this.emit(new PropertyChangeEvent("active", detail))
			if(this.active) {
				this.emit(new CustomEvent<Path>(PATH_ACTIVE_EVENT, {detail: this}))
			}
		}
	}

	toJSON() {
		return {points: this._points}
	}
}