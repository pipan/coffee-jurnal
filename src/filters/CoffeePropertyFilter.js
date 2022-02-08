export class CoffeePropertyFilter {
    property = ''
    anyWhitelist = []

    constructor(property, anyWhitelist) {
        this.property = property
        this.anyWhitelist = anyWhitelist
        if (this.anyWhitelist && !Array.isArray(this.anyWhitelist)) {
            this.anyWhitelist = [this.anyWhitelist]
        }
    }

    verify(item) {
        if (!this.anyWhitelist || this.anyWhitelist.length === 0) {
            return true
        }
        if (!item[this.property]) {
            return false
        }
        return this.anyWhitelist.indexOf(item[this.property]) > -1
    }
}