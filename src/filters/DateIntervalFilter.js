export class DateIntervalFilter {
    since = false
    until = false

    constructor(since, until) {
        this.since = since
        this.until = until
    }

    static fromDate(since, until) {
        if (since) {
            since = new Date(since)
            since.setHours(0, 0, 0, 0)
        }
        if (until) {
            until = new Date(until)
            until.setHours(23, 59, 59, 999)
        }
        return new DateIntervalFilter(since, until)
    }

    verify(item) {
        if (!item.created_at) {
            return false
        }
        if (this.since && item.created_at < this.since) {
            return false
        }
        if (this.until && item.created_at > this.until) {
            return false
        }
        return true
    }
}