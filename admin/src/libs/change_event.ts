export const PROPERTY_CHANGE_EVENT = "change"

export class PropertyChangeEvent extends CustomEvent<[string, unknown]> {
	constructor(name:string, value:unknown) {
		super(PROPERTY_CHANGE_EVENT, {detail: [name, value]})
	}
}