export class ListFilter {
    filters = []

    constructor(filters) {
        this.filters = filters
    }

    filter(items) {
        let result = []
        for (const item of items) {
            if (!this.verify(item)) {
                continue
            }
            result.push(item)
        }
        return result
    }

    verify(item) {
        for (const filter of this.filters) {
            if (filter.verify(item)) {
                continue
            }
            return false
        }
        return true
    }
}