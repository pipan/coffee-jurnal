<template>
    <div class="input">
        <div class="row row--middle gap-m">
            <div tabindex="0" class="flex-grow"
                @keydown.down="decreaseQuality()"
                @keydown.up="increaseQuality()"
                @keydown.left="decreaseIntensity()"
                @keydown.right="increaseIntensity()"
                @touchstart="updateIntesity($event)"
                @touchmove="updateIntesity($event)"
                @touchend="snapIntensity()"
                @touchcancel="snapIntensity()"
                ref="touchPane">
                <div class="input__label">{{ label }}</div>
                <div class="pt-s">
                    <div class="bar bar--x" :class="barClasses" :style="barStyle"></div>
                </div>
            </div>
            <div class="pos-r row">
                <div class="column">
                    <button type="button"
                        class="input__button input__button--split"
                        @click.stop="increaseQuality()">&#x25B2;</button>
                    <button type="button"
                        class="input__button input__button--split"
                        @click.stop="decreaseQuality()">&#x25BC;</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PropertyRatingInput',
    components: {  },
    props: {
        value: [Object],
        label: [String],
    },
    data: function() {
        return {
            qualityClasses: {
                '0': 'bar--quality-1',
                '0.25': 'bar--quality-2',
                '0.5': 'bar--quality-3',
                '0.75': 'bar--quality-4',
                '1': 'bar--quality-5'
            },
            intensityClasses: {
                '0': 'bar--intensity-1',
                '0.25': 'bar--intensity-2',
                '0.5': 'bar--intensity-3',
                '0.75': 'bar--intensity-4',
                '1': 'bar--intensity-5'
            }
        }
    },
    computed: {
        barQuality: function () {
            return this.qualityClasses[this.value.quality]
        },
        barIntensity: function () {
            if (!this.intensityClasses[this.value.intensity]) {
                return false
            }
            return this.intensityClasses[this.value.intensity]
        },
        barClasses: function () {
            const classes = [this.barQuality]
            if (this.barIntensity) {
                classes.push(this.barIntensity)
            }
            return classes
        },
        barStyle: function () {
            if (this.barIntensity) {
                return {}
            }
            return {
                width: this.value.intensity * 100 + "%"
            }
        },

    },
    methods: {
        changeQuality: function (value) {
            if (value === this.value.quality) {
                return
            }
            this.$emit('change', {
                quality: value,
                intensity: this.value.intensity
            })
        },
        increaseQuality: function () {
            const newQuality = Math.min(1.0, this.value.quality + 0.25)
            this.changeQuality(newQuality)
        },
        decreaseQuality: function () {
            const newQuality = Math.max(0.0, this.value.quality - 0.25)
            this.changeQuality(newQuality)
        },
        changeIntensity: function (value) {
            if (value === this.value.intensity) {
                return
            }
            this.$emit('change', {
                quality: this.value.quality,
                intensity: value
            })
        },
        increaseIntensity: function () {
            const newIntensity = Math.min(1.0, this.value.intensity + 0.25)
            this.changeIntensity(newIntensity)
        },
        decreaseIntensity: function () {
            const newIntensity = Math.max(0.0, this.value.intensity - 0.25)
            this.changeIntensity(newIntensity)
        },
        snapIntensity: function () {
            this.value.intensity = Math.round(this.value.intensity / 0.25) * 0.25
        },
        updateIntesity: function (distance) {
            const position = this.$refs.touchPane.offsetWidth - (distance.touches[0].clientX - this.$refs.touchPane.offsetLeft)
            const ratio = position / this.$refs.touchPane.offsetWidth
            const ratioNormalize = 1 - Math.min(1, Math.max(0, ratio))
            this.changeIntensity(ratioNormalize)
        },
    }
}
</script>