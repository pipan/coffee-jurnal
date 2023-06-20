<template>
    <div class="picker user-select-disable" @touchmove="onTouch($event)" @touchstart="moving = true" @touchend="moving = false" ref="picker">
        <div class="picker__value" :class="moving ? 'picker__value--move' : ''" :style="{ 'top': topPosition + '%' }">{{ value }}</div>
    </div>
</template>

<script>
export default {
    name: 'AlphabetFilter',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            alphabet: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            topPosition: 0,
            moving: false
        }
    },
    watch: {
        value: {
            handler: function (newValue) {
                const topRatio = this.topPosition / 100
                const index = Math.round(topRatio * (this.alphabet.length - 1))
                if (this.alphabet[index] === newValue) {
                    return
                }
                
                const newValueIndex = this.getAlphabetIndex(newValue.toUpperCase())
                if (newValueIndex === -1) {
                    return
                }
                this.topPosition = newValueIndex / (this.alphabet.length - 1) * 100
            },
            immediate: true
        }
    },
    methods: {
        getAlphabetIndex: function (value) {
            for (let i = 0; i < this.alphabet.length; i++) {
                if (value === this.alphabet[i]) {
                    return i
                }
            }
            return -1
        },
        setFilter: function (value) {
            if (value === this.value) {
                return
            }
            this.$emit('change', value)
        },
        onTouch: function ($event) {
            const bound = this.$refs.picker.getBoundingClientRect()
            const topPx = $event.touches[0].clientY - bound.top
            const topRatio = Math.max(0, Math.min(1, topPx / bound.height))
            this.topPosition = topRatio * 100
            const index = Math.round(topRatio * (this.alphabet.length - 1))
            this.setFilter(this.alphabet[index])
        }
    }
}
</script>

<style scoped>
.picker {
    position: relative;
    height: 100%;
    width: 22px;
    text-align: center;
}

.picker__value {
    position: absolute;
    box-sizing: border-box;
    color: var(--color-primary);
    transform: translateY(-50%);
    right: 0;
    width: 23px;
    transition: width ease 200ms, background-color ease 200ms, color ease 200ms;
}

.picker__value.picker__value--move {
    color: var(--color-bg);
    transform: translateY(-50%);
    width: 80px;
    background-color: var(--color-primary);
    padding: 2px 4px;
    border-radius: 4px;
    text-align: left;
}
</style>