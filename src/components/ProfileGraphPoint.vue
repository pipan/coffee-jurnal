<template>
    <div class="row row--center row--bottom" ref="touchPane"
        @touchstart="update($event)"
        @touchmove="update($event)"
        @touchend="snap()"
        @touchcancel="snap()">
        <div class="point point--y" :class="cssClasses" :style="{'height': heightStyle}"></div>
    </div>
</template>

<script>
export default {
    name: 'ProfileGraphPoint',
    props: {
        value: [Number]
    },
    data: function () {
        return {
            internalValue: 0,
            updating: false
        }
    },
    computed: {
        heightStyle: function () {
            return `${this.internalValue * 100}%`
        },
        cssClasses: function () {
            const snapedValue = this.getSnapValue(this.internalValue)
            let qualityIndex = snapedValue / 0.25 + 1
            let qualityClass = `point--quality-${qualityIndex}`
            let classes = {
                'point--transition': !this.updating,
            }
            classes[qualityClass] = true
            return classes
        }      
    },
    methods: {
        change: function (newValue) {
            this.internalValue = newValue
            if (newValue === this.value) {
                return
            }
            this.$emit('change', newValue)
        },
        snap: function () {
            const snapedValue = this.getSnapValue(this.internalValue)
            this.updating = false
            this.change(snapedValue)
        },
        getSnapValue: function (value) {
            return Math.round(value / 0.25) * 0.25
        },
        update: function (event) {
            if (this.disabled) {
                return
            }
            this.updating = true
            const boundBox = this.$refs.touchPane.getBoundingClientRect()
            const position = boundBox.height - (event.touches[0].clientY - boundBox.top)
            const ratio = position / boundBox.height
            const ratioNormalize = Math.min(1, Math.max(0, ratio))
            this.internalValue = ratioNormalize
            this.$emit('move', this.internalValue)
        },
    },
    mounted: function () {
        this.internalValue = this.value
    }
}
</script>