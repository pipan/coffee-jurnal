export class BatchJob {
    constructor(items, config) {
        this.config = {
            busyLimit: 50,
            sleepTime: 50
        }
        if (config) {
            this.config = Object.assign(this.config, config)
        }
        this.batchStartIndex = 0
        this.batchSize = 1
        this.items = items
        this.enabled = true
    }

    onComplete(fn) {
        this.completeFn = fn
        return this
    }

    forEach(fn) {
        this.forEachFn = fn
        this.run()
    }

    run() {
        if (!this.enabled) {
            return
        }
        const startTime = new Date().getTime()
        new Promise((resolve) => {
            const result = this.forEachFn(this.items.slice(this.batchStartIndex, this.batchStartIndex + this.batchSize))
            if (!result || !result.then) {
                resolve()
            }
            result.then(() => {
                resolve()
            })
        }).then(() => {
            const endTime = new Date().getTime()
            const busyTime = endTime - startTime
            const multiplier = Math.min(2, this.config.busyLimit / busyTime)
            this.batchStartIndex += this.batchSize
            this.batchSize = Math.max(1, Math.floor(multiplier * this.batchSize))
            if (this.batchStartIndex >= this.items.length) {
                if (this.completeFn) {
                    this.completeFn()
                }
                return
            }
            setTimeout(() => { this.run() }, this.config.sleepTime)
        })
    }

    stop() {
        this.enabled = false
    }
}