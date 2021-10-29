<template>
    <div class="autocomplete" :class="{'autocomplete--visible': visible}">
        <button type="button"
            v-for="option of options"
            :key="option"
            class="autocomplete__item"
            @mousedown="select(option)"
            @click="select(option)">{{ option | ellipsis(10) }}</button>
    </div>
</template>

<script>
export default {
    name: 'InputAutocomplete',
    props: {
        options: [Array]
    },
    data: function () {
        return {
            visible: false
        }
    },
    methods: {
        select: function (value) {
            this.$emit('select', value)
        },
        open: function () {
            this.visible = true
        },
        close: function () {
            this.visible = false
        },
    }
}
</script>