<template>
    <InlineInput :label="label">
        <div class="row flex-grow gap-s">
            <div tabindex="0" class="flex-grow input-simple"
                    @keydown.down="decreaseQuality()"
                    @keydown.up="increaseQuality()"
                    @keydown.left="decreaseIntensity()"
                    @keydown.right="increaseIntensity()"
                    @touchstart="updateIntesity($event)"
                    @touchmove="updateIntesity($event)"
                    @touchend="snapIntensity()"
                    @touchcancel="snapIntensity()"
                    ref="touchPane">
                <div class="py-s">
                    <div class="pos-r">
                        <div class="scale">
                            <div class="scale__tick"></div>
                            <div class="scale__tick"></div>
                            <div class="scale__tick"></div>
                            <div class="scale__tick"></div>
                            <div class="scale__tick"></div>
                        </div>
                        <div class="bar bar--x pos-r" :class="barClasses" :style="barStyle"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <button type="button" class="btn btn--secondary btn--circle"
                    @click.stop="decreaseQuality()">
                    <i class="iconfont iconfont-down"></i>
                </button>
                <button type="button" class="btn btn--secondary btn--circle"
                    @click.stop="increaseQuality()">
                    <i class="iconfont iconfont-up"></i>
                </button>
            </div>
        </div>
    </InlineInput>
</template>

<script>
import InlineInput from './InlineInput.vue'

export default {
    name: 'PropertyRatingInput',
    components: { InlineInput },
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
            },
            extraTreshold: 5,
            extraCount: 0
        }
    },
    computed: {
        intensity: function () {
            return this.value.intensity !== undefined ? this.value.intensity : 0.5
        },
        quality: function () {
            return this.value.quality !== undefined ? this.value.quality : 0.5
        },
        barQuality: function () {
            return this.qualityClasses[this.quality]
        },
        barIntensity: function () {
            if (!this.intensityClasses[this.intensity]) {
                return false
            }
            return this.intensityClasses[this.intensity]
        },
        barClasses: function () {
            const classes = [this.barQuality]
            if (this.barIntensity) {
                classes.push(this.barIntensity)
            }
            if (this.value.extra) {
                classes.push('wiggle-animation')
            }
            return classes
        },
        barStyle: function () {
            if (this.barIntensity) {
                return {}
            }
            return {
                width: this.intensity * 100 + "%"
            }
        },

    },
    methods: {
        changeQuality: function (value, extra) {
            if (value === this.quality && extra == this.value.extra) {
                return
            }
            this.$emit('change', {
                quality: value,
                intensity: this.intensity,
                extra: extra
            })
        },
        increaseQuality: function () {
            const newQuality = Math.min(1.0, this.quality + 0.25)
            this.extraCount = newQuality === this.quality ? this.extraCount + 1 : 0
            this.changeQuality(newQuality, this.extraCount >= this.extraTreshold)
        },
        decreaseQuality: function () {
            const newQuality = Math.max(0.0, this.quality - 0.25)
            this.extraCount = newQuality === this.quality ? this.extraCount + 1 : 0
            this.changeQuality(newQuality, this.extraCount >= this.extraTreshold)
        },
        changeIntensity: function (value) {
            if (value === this.intensity) {
                return
            }
            this.$emit('change', {
                quality: this.quality,
                intensity: value,
                extra: this.value.extra === true
            })
        },
        increaseIntensity: function () {
            const newIntensity = Math.min(1.0, this.intensity + 0.25)
            this.changeIntensity(newIntensity)
        },
        decreaseIntensity: function () {
            const newIntensity = Math.max(0.0, this.intensity - 0.25)
            this.changeIntensity(newIntensity)
        },
        snapIntensity: function () {
            const snapedValue = Math.round(this.intensity / 0.25) * 0.25
            this.changeIntensity(snapedValue)
        },
        updateIntesity: function (distance) {
            const position = this.$refs.touchPane.offsetWidth - (distance.touches[0].clientX - this.$refs.touchPane.offsetLeft)
            const ratio = position / this.$refs.touchPane.offsetWidth
            const ratioNormalize = 1 - Math.min(1, Math.max(0, ratio))
            this.changeIntensity(ratioNormalize)
        },
    },
    watch: {
        value: {
            handler: function (newValue) {
                this.extraCount = newValue.extra ? this.extraTreshold : 0
            },
            immediate: true
        }
    }
}
</script>