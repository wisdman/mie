import {EventEmitter} from "./event_emitter"
import {PropertyChangeEvent} from "./change_event"

export const POINT_REMOVE_EVENT = "remove"
export const POINT_ACTIVE_EVENT = "activate"

export class Point extends EventEmitter {
	constructor(private _x:number, private _y:number) {
		super()
	}

	// private _x:number = NaN
	get x():number {
		return this._x
	}
	set x(detail:number) {
		if(this._x !== detail) {
			this._x = detail
			this.emit(new PropertyChangeEvent("x", detail))
		}
	}

	// private _y:number = NaN
	get y():number {
		return this._y
	}
	set y(detail:number) {
		if(this._y !== detail) {
			this._y = detail
			this.emit(new PropertyChangeEvent("y", detail))
		}
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
				this.emit(new CustomEvent<Point>(POINT_ACTIVE_EVENT, {detail: this}))
			}
		}
	}

	remove() {
		this.emit(new CustomEvent<Point>(POINT_REMOVE_EVENT, {detail: this}))
	}

	toJSON() {
		return [this.x, this.y]
	}
}