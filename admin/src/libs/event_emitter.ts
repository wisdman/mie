export interface TOptions {
	once?: boolean
}

export type TCallbackFunction = (event: CustomEvent) => void

export class EventEmitter {

	private _events: {[ name: string ]: Array<[TCallbackFunction, TOptions]>} = {}

	on(name: string, callback: TCallbackFunction, options: TOptions = {}) {
		if(!this._events[name])	{
			this._events[name] = []
		}
		this._events[name].push([callback, options])
	}

	off(name: string, callback: TCallbackFunction) {
		if(!this._events[name])	{
			throw new Error("Incorrect event name")			
		}
		this._events[name] = this._events[name].filter(([value]) => value !== callback)
	}

	emit(event: CustomEvent) {
		const name = event.type
		if(!this._events[name])	{
			return	
		}

		for(const [callback, options] of this._events[name]) {
			if(options.once === true) {
				this.off(name, callback)
			}
			callback.call(this, event)
		}
	}
}