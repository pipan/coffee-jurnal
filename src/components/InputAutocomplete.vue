<template>
    <div class="autocomplete" :class="{'autocomplete--visible': visible}" v-if="options.length > 0">
        <button type="button"
            v-for="option of options"
            :key="option"
            class="autocomplete__item"
            @mousedown="select(option)"
            @click="select(option)">{{ applyEllipsis(option) }}</button>
    </div>
</template>

<script>
import ellipsis from '../fn/ellipsis'

export default {
    name: 'InputAutocomplete',
    props: {
        options: [Array],
        visible: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        select: function (value) {
            this.$emit('select', value)
        },
        applyEllipsis: function (value) {
            return ellipsis(value, 10)
        }
    }
}
</script>