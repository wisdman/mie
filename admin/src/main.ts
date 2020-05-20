import * as Components from "./components"
import * as Layouts from "./layouts"

void function main() {
	Object.values(Components).forEach(component => component.Init())
	Object.values(Layouts).forEach(component => component.Init())

}()