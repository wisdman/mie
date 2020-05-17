import {EventEmitter} from "./event_emitter"
import {PropertyChangeEvent, PROPERTY_CHANGE_EVENT} from "./change_event"
import {Path, PATH_REMOVE_EVENT, PATH_ACTIVE_EVENT, IPathData} from "./path"

export class PathList extends EventEmitter {
	constructor(paths:Array<IPathData> = []) {
		super()
		paths.forEach(pathData => this.addPath(new Path(pathData)) )
	}

	private _paths:Array<Path> = []

	get paths() {
		return this._paths
	}

	private _onPathsChange = () => {
		this.emit(new PropertyChangeEvent("points", this._paths))
	}
	private _onPathRemove = ({detail}:{detail:Path}) => {
		this.removePath(detail)
	}
	private _onPathActive = ({detail}:{detail:Path}) => {
		this._paths.forEach(path => {
			if(path !== detail) path.active = false
		})
		this.emit(new CustomEvent<Path>(PATH_ACTIVE_EVENT, {detail}))
	}

	addPath(path: Path):Path {
		this._paths.push(path)
		path.on(PROPERTY_CHANGE_EVENT, this._onPathsChange)
		path.on(PATH_REMOVE_EVENT, this._onPathRemove)
		path.on(PATH_ACTIVE_EVENT, this._onPathActive)
		this._onPathsChange()
		return path
	}

	removePath(path: Path):void {
		if(!this._paths.includes(path)) {
			throw new Error("Point does not exist")
		}
		path.off(PROPERTY_CHANGE_EVENT, this._onPathsChange)
		path.off(PATH_REMOVE_EVENT, this._onPathRemove)
		path.off(PATH_ACTIVE_EVENT, this._onPathActive)
		this._paths = this._paths.filter((val) => val !== path)
		this._onPathsChange()
	}

	toJSON() {
		return this._paths
	}
}