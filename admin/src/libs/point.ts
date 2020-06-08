import {EventEmitter} from "./event_emitter"
import {PropertyChangeEvent, ActiveEvent} from "./events"

export class Point extends EventEmitter {
	constructor(private _x:number, private _y:number, private _svg:SVGSVGElement | null = null) {
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

	get screenCoords():[number,number] {
		if(!this._svg) return [this.x, this.y]
		const ctm = this._svg.getScreenCTM()
		if(!ctm) return [this.x, this.y]
		const p = this._svg.createSVGPoint()
		p.x = this.x
		p.y = this.y
		const {x,y} = p.matrixTransform(ctm)
		return [x, y]
	}

	set screenCoords([x,y]:[number,number]) {
		if(!this._svg) { 
			this.x = x
			this.y = y
			return
		}
		const ctm = this._svg.getScreenCTM()
		if(!ctm) {
			this.x = x
			this.y = y
			return
		}
		const p = this._svg.createSVGPoint()
		p.x = x
		p.y = y
		const {x:newX,y:newY} = p.matrixTransform(ctm.inverse())
		this.x = newX
		this.y = newY
		return
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
				this.emit(new ActiveEvent(this))
			}
		}
	}

	toJSON() {
		return [this.x, this.y]
	}
}