const STORAGE_KEY = 'pathEditor'
const DEFAULT_DATA = {
            field: [0,0,200,200],
            items: []
        }

export class EditorStorage {
    static DeepMerge(A, B) {
        if(Array.isArray(B)) {
            if(Array.isArray(A)) {
                const C = []
                for(let i = 0; i < Math.max(A.length, B.length); i++) {
                    if(B[i] === null) {
                        C[i] = null
                    }
                    else C[i] = EditorStorage.DeepMerge(A[i], B[i])
                }
                return C.filter(v => v !== null)
            }
            return B.filter(v => v !== null)
        }

        if( B!== null && typeof B === 'object') {
            if(A!== null && typeof A === 'object') {
                for(const key of Object.keys(B)) {
                    A[key] = EditorStorage.DeepMerge(A[key], B[key])
                }
                return A
            }
            return B
        }

        if(B === undefined || B === null) return A
        return B
    }

    callbacks = {}

    push(data = {}) {
        this.data = EditorStorage.DeepMerge(DEFAULT_DATA, this.data)
        this.data = EditorStorage.DeepMerge(this.data, data)

        return new Promise(resolve => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data))
            this.dispatchEvent('change', {detail: this.data})
            resolve(this.data)
        })
    }

    pull() {
        return new Promise(resolve => {
            let data
            try {
                data = EditorStorage.DeepMerge(DEFAULT_DATA, JSON.parse(localStorage.getItem(STORAGE_KEY)))
                // resolve({...DEFAULT_DATA, ...JSON.parse(data)})
            }
            catch {
                data = DEFAULT_DATA
            }
            this.data = EditorStorage.DeepMerge(DEFAULT_DATA, this.data)
            this.data = EditorStorage.DeepMerge(this.data, data)
            this.dispatchEvent('change', {detail: this.data})
            resolve(this.data)
        })
    }

    on(eventName, callback) {
        if(!this.callbacks[eventName]) {
            this.callbacks[eventName] = [callback]
            return
        }
        this.callbacks[eventName].push(callback)
    }

    off(eventName, callback) {
        if(!this.callbacks[eventName]) {
            return
        }

        this.callbacks[eventName] = this.callbacks[eventName].filter(fn => fn !== callback)
    }

    dispatchEvent(eventName, options) {
        // console.log(options)
        const event = new CustomEvent(eventName, options)
        this.callbacks[eventName].forEach(callback => callback(event))
    }

}
