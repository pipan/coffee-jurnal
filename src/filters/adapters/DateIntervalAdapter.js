export class DateIntervalAdapter {
    propertySince = ''
    propertyUntil = ''
    id = ''

    constructor (propertySince, propertyUntil) {
        this.propertySince = propertySince
        this.propertyUntil = propertyUntil
        this.id = this.propertySince + "-" + this.propertyUntil
    }

    toList(filters) {
        if (!filters[this.propertySince] && !filters[this.propertyUntil]) {
            return []
        }

        let dateSince = '???'
        let dateUntil = '???'
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        if (filters[this.propertySince]) {
            dateSince = new Date(filters[this.propertySince]).toLocaleDateString(undefined, options)
        }
        if (filters[this.propertyUntil]) {
            dateUntil = new Date(filters[this.propertyUntil]).toLocaleDateString(undefined, options)
        }

        return [{
            id: this.id,
            type: 'dateInterval',
            value: dateSince + " - " + dateUntil,
            since: filters[this.propertySince],
            until: filters[this.propertyUntil]
        }]
    }

    toObject(list) {
        let object = {}
        object[this.propertySince] = null
        object[this.propertyUntil] = null
        for (const item of list) {
            if (item.id != this.id) {
                continue
            }
            object[this.propertySince] = item.since
            object[this.propertyUntil] = item.until
            return object
        }
        return object
    }
}