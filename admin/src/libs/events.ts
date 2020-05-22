import { EventEmitter } from "./event_emitter"

export const PROPERTY_CHANGE_EVENT = "change"
export const ACTIVE_EVENT = "active"

export class PropertyChangeEvent extends CustomEvent<[string, unknown]> {
	constructor(name:string, value:unknown) {
		super(PROPERTY_CHANGE_EVENT, {detail: [name, value]})
	}
}

export class ActiveEvent extends CustomEvent<EventEmitter> {
	constructor(detail:EventEmitter) {
		super(ACTIVE_EVENT, {detail})
	}
}