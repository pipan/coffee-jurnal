<template>
    <InlineInput label="Profile">
        <div class="row gap-s row--wrap">
            <button type="button" class="btn btn--secondary btn--circle text-l"
                :class="{'text-primary': option.checked, 'text-secondary': !option.checked}"
                v-for="option of options"
                :key="option.value"
                @click="toggleValue(option.value)">
                <i class="iconfont" :class="option.icon"></i>
            </button>
        </div>
    </InlineInput>
</template>

<script>
import InlineInput from './InlineInput.vue'

export default {
    name: 'ProfileInput',
    components: { InlineInput },
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    data: function () {
        return {
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
            }

            this.$emit('change', newValue)
        }
    }
}
</script>