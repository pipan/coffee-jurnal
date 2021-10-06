<template>
    <button type="button" :class="classes" @click="select()" v-html="icon"></button>
</template>

<script>
export default {
    name: 'RatingButton',
    components: {  },
    props: {
        value: [Number],
        active: [Boolean],
    },
    computed: {
        icon: function () {
            if (this.active) {
                return '&#x2605';
            }
            return '&#x2606;'
        },
        classes: function () {
            const result = ['rating']
            if (this.active) {
                result.push('rating--active')
            }
            return result
        }
    },
    methods: {
        select: function () {
            this.$emit('select', this.value)
        },
    }
}
</script>