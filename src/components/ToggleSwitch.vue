<template>
    <MultiToggleSwitch :nullable="nullable" :options="options" :value="[value]" @change="change($event)"></MultiToggleSwitch>
</template>

<script>
import MultiToggleSwitch from './MultiToggleSwitch.vue'

export default {
    name: 'ToggleSwitch',
    components: { MultiToggleSwitch },
    inheritAttrs: false,
    props: {
        nullable: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array
        },
        value: [String]
    },
    methods: {
        change: function (values) {
            const value = values.length > 0 ? values[values.length - 1] : ''
            this.$emit('change', value)
        }
    }
}
</script>