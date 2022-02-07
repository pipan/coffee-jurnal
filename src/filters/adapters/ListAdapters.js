export class ListAdapters {
    adapters = []

    constructor (adapters) {
        this.adapters = adapters
    }

    toList(filters) {
        let list = []
        for (const adapter of this.adapters) {
            const adapterList = adapter.toList(filters)
            list.push(...adapterList)
        }
        return list
    }

    toObject(list) {
        let object = {}
        for (const adapter of this.adapters) {
            const adapterObject = adapter.toObject(list)
            object = Object.assign(object, adapterObject)
        }
        return object
    }
}