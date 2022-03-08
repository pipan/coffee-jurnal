export class StaticBatchJob {
    constructor(items, config) {
        this.config = {
            size: 10,
            sleepTime: 10
        }
        if (config) {
            this.config = Object.assign(this.config, config)
        }
        this.batchStartIndex = 0
        this.items = items
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
        new Promise((resolve) => {
            const result = this.forEachFn(this.items.slice(this.batchStartIndex, this.batchStartIndex + this.config.size))
            if (!result || !result.then) {
                resolve()
            }
            result.then(() => {
                resolve()
            })
        }).then(() => {
            this.batchStartIndex += this.config.size
            if (this.batchStartIndex >= this.items.length) {
                if (this.completeFn) {
                    this.completeFn()
                }
                return
            }
            setTimeout(() => { this.run() }, this.config.sleepTime)
        })
        
    }
}