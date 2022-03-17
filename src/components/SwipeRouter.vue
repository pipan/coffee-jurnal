<template>
    <div @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd()">
        <!-- <KeepAlive>
            <component :is="prevComponent.name" v-if="prevVisible" ref="prevComponentRef"></component>
        </KeepAlive> -->
        <KeepAlive>
            <component :is="activeComponentName" ref="activeComponentRef"></component>
        </KeepAlive>
        <!-- <KeepAlive>
            <component :is="nextComponent.name" v-if="nextVisible" ref="nextComponentRef"></component>
        </KeepAlive> -->
    </div>
</template>

<script>
export default {
    name: 'SwipeRouter',
    data: function () {
        return {
            touchState: {}
        }
    },
    computed: {
        parentComponent: function () {
            const index = this.$route.matched.length - 2
            return this.$route.matched[index]
        },
        prevComponent: function () {
            const prevIndex = this.activeComponentChildIndex - 1
            if (prevIndex < 0) {
                return false
            }
            return this.children[prevIndex]
        },
        activeComponent: function () {
            const index = this.$route.matched.length - 1
            return this.$route.matched[index]
        },
        nextComponent: function () {
            if (this.activeComponentChildIndex === -1) {
                return false
            }
            const nextIndex = this.activeComponentChildIndex + 1
            if (nextIndex === this.children.length) {
                return false
            }
            return this.children[nextIndex]
        },
        children: function () {
            for (let route of this.$router.options.routes) {
                if (route.name === this.parentComponent.name) {
                    return route.children;
                }
            }
            return []
        },
        activeComponentChildIndex: function () {
            let index = 0
            for (const child of this.children) {
                if (child.name === this.activeComponentName) {
                    return index
                }
                index++
            }
            return -1
        },
        activeComponentName: function () {
            return this.activeComponent.name
        },
        prevVisible: function () {
            if (!this.touchState.swipe) {
                return false
            }
            return this.touchState.diff.x > 0
        },
        nextVisible: function () {
            if (!this.touchState.swipe) {
                return false
            }
            return this.touchState.diff.x < 0
        }
    },
    created: function () {
        for (const item of this.children) {
            this.$options.components[item.name] = item.component
        }
    },
    methods: {
        touchStart: function (event) {
            this.touchState = {
                swipe: false,
                scroll: false,
                origin: {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                }
            }
        },
        touchEnd: function () {
            if (this.touchState.swipe) {
                const norm = this.touchState.diff.x / window.innerWidth
                if (norm < -0.3) {
                    this.$router.push({
                        name: this.nextComponent.name
                    })
                }
                if (norm > 0.3) {
                    this.$router.push({
                        name: this.prevComponent.name
                    })
                }
                if (this.$refs.prevComponentRef) {
                    this.$refs.prevComponentRef.manualTransitionInStop()
                }
                if (this.$refs.nextComponentRef) {
                    this.$refs.nextComponentRef.manualTransitionInStop()
                }
                this.$refs.activeComponentRef.manualTransitionOutStop()
            }
            this.touchState = {}
        },
        touchMove: function (event) {
            if (this.touchState.scroll) {
                return
            }

            const diff = {
                x: event.touches[0].clientX - this.touchState.origin.x,
                y: event.touches[0].clientY - this.touchState.origin.y,
            }
            this.touchState.diff = diff
            
            if (!this.touchState.swipe) {
                const treshold = 20
                const absX = Math.abs(diff.x)
                const absY = Math.abs(diff.y)
                const max = Math.max(absX, absY)

                if (max <= treshold) {
                    return
                }
                this.touchState.scroll = absX <= absY
                this.touchState.swipe = absX > absY
                return
            }
            
            if (diff.x > 0 && !this.prevComponent) {
                this.$refs.activeComponentRef.manualTransitionOutStop()
                return
            }
            if (diff.x < 0 && !this.nextComponent) {
                this.$refs.activeComponentRef.manualTransitionOutStop()
                return
            }
            const norm = diff.x / window.innerWidth
            this.$refs.activeComponentRef.manualTransitionOut(norm)
            if (this.$refs.prevComponentRef) {
                this.$refs.prevComponentRef.manualTransitionIn(norm)
            }
            if (this.$refs.nextComponentRef) {
                this.$refs.nextComponentRef.manualTransitionIn(norm)
            }
            
            // this.style = {
            //     transform: `translateX(${diff.x}px)`
            // }
            // this.styleStats = {
            //     transform: `translateX(calc(100% + ${diff.x}px))`
            // }
        }
    }
}
</script>
