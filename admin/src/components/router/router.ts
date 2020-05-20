import * as Layouts from "../../layouts"

export interface IState { 
	route: string,
	id: string
}

export class Router extends HTMLElement {
	static TAG_NAME = 'lit-router'
	static instance:Array<Router> = []

	static Init() {
		customElements.define(this.TAG_NAME, this)
		window.addEventListener("popstate", event => {
			const state = event.state as IState
			console.log(event)
			this.route(state)
		})

		const route = window.location.pathname
		window.history.replaceState({route, id: ""}, "", route)
	}

	static route(state:IState) {
		window.history.pushState(state, '', state.route)
		this.instance.forEach(inst => inst.render(state))
	}

	private _root = this.attachShadow({mode: 'open'})
	private _id:string = ""

	static observedAttributes = ["id"]
	constructor() {
		super()
	}

	render(state:IState) {
		if(state.id !== this._id) return
		const route = state.route.toLowerCase()
		const Layout = Object.values(Layouts).find(value => value.ROUTE.toLowerCase() === route)
		
		if (!Layout) {
			this._root.innerHTML = "404"
			return
		}
		this._root.innerHTML = `<${Layout.TAG_NAME}></${Layout.TAG_NAME}>`
	}

	connectedCallback() {
        Router.instance.push(this)
        const route = window.location.pathname
		this.render({route, id: this.getAttribute("id") || ""})
    }

    disconnectedCallback() {
        Router.instance = Router.instance.filter(value => value !== this)
    }

    attributeChangedCallback(name:string, _:any, newVal:string) {
    	switch(name) {
    		case "id": this._id = newVal
    		break
    	}
    }
}