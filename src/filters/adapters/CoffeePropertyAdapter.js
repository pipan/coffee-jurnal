export class CoffeePropertyAdapter {
    property = ''

    constructor (property) {
        this.property = property
    }

    toList(filters) {
        let list = []
        let value = filters[this.property]
        if (!value) {
            return list
        }
        if (!Array.isArray(value)) {
            value = [value]
        }
        for (const item of value) {
            list.push({
                id: this.property + "." + item,
                type: this.property,
                value: item
            })
        }
        return list
    }

    toObject(list) {
        let object = {}
        object[this.property] = []
        for (const item of list) {
            if (item.type !== this.property) {
                continue
            }
            object[this.property].push(item.value)
        }
        return object
    }
}