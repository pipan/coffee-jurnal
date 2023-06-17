<template>
    <div class="column gap-s">
        <button type="button" class="profile text-l" ref="profileElement"
            :class="{'profile--active': option.checked, 'profile--visible': visible.indexOf(option.value) > -1}"
            v-for="option of options"
            :key="option.value"
            @click="toggleValue(option.value)">
            <i class="iconfont" :class="option.icon"></i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ProfileInput',
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    data: function () {
        return {
            visible: [],
            clearTimeouts: {},
            optionsTemplate: [
                {
                    value: 'floral',
                    icon: 'iconfont-flower'
                },
                {
                    value: 'nutty',
                    icon: 'iconfont-acorn'
                },
                {
                    value: 'cocoa',
                    icon: 'iconfont-cocoa'
                },
                {
                    value: 'sweet',
                    icon: 'iconfont-lolipop'
                },
                {
                    value: 'stone-fruit',
                    icon: 'iconfont-apricot'
                },
                {
                    value: 'fruity',
                    icon: 'iconfont-apple'
                },
                {
                    value: 'berry-fruit',
                    icon: 'iconfont-berry'
                },
                {
                    value: 'citrus-fruit',
                    icon: 'iconfont-citrus'
                },
                {
                    value: 'tropical-fruit',
                    icon: 'iconfont-pineapple'
                },
                {
                    value: 'fermented',
                    icon: 'iconfont-wine'
                },
                {
                    value: 'woody',
                    icon: 'iconfont-wood'
                },
                {
                    value: 'burnt',
                    icon: 'iconfont-ash'
                },
                {
                    value: 'vegetative',
                    icon: 'iconfont-leaf'
                }
            ]
        }
    },
    computed: {
        options: function () {
            let result = []
            for (const option of this.optionsTemplate) {
                result.push(Object.assign({}, option, {
                    checked: this.value.indexOf(option.value) > -1
                }))
            }
            return result
        }
    },
    methods: {
        toggleValue: function (value) {
            let newValue = [...this.value]
            const index = newValue.indexOf(value)
            if (index > -1) {
                newValue.splice(index, 1)
            } else {
                newValue.push(value)
                this.setVisible(value)
            }

            this.$emit('change', newValue)
        },
        setVisible: function (value) {
            if (this.clearTimeouts[value]) {
                clearTimeout(this.clearTimeouts[value])
            }
            this.clearTimeouts[value] = setTimeout(() => {
                this.clearVisible(value)
            }, 1000)
            if (this.visible.indexOf(value) > -1) {
                return
            }
            this.visible.push(value)
        },
        clearVisible: function (value) {
            let index = this.visible.indexOf(value)
            if (index === -1) {
                return
            }
            this.visible.splice(index, 1)
        },
        isPointInBox: function (x, y, box) {
            return x >= box.x && x <= box.x + box.width && y >= box.y && y < box.y + box.height
        },
        onTouch: function (event) {
            for (let i = 0; i < this.$refs.profileElement.length; i++) {
                const element = this.$refs.profileElement[i]
                const boundBox = element.getBoundingClientRect()
                if (this.isPointInBox(event.touches[0].clientX, event.touches[0].clientY, boundBox)) {
                    this.setVisible(this.options[i].value)
                }
            }
        }
    },
    mounted: function () {
        document.body.addEventListener('touchmove', this.onTouch)
    },
    unmounted: function () {
        document.body.removeEventListener('touchmove', this.onTouch)
    }
}
</script>

<style scoped>
.profile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    padding: 0px;
    flex-shrink: 0;
    border-radius: 100%;
    color: var(--color-border);
    opacity: 0;
    transition: opacity 1500ms ease, color 750ms ease;
    border: none;
    background-color: transparent;
}

.profile.profile--visible {
    opacity: 1;
    transition-duration: 0ms;
}

.profile.profile--active {
    opacity: 1;
    transition-duration: 750ms;
}

.profile.profile--active.profile--visible {
    opacity: 1;
    color: var(--color-primary);
}
</style>