<template>
    <button type="button" :class="classes" @click="select()">
        <i class="iconfont" :class="icon"></i>
    </button>
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
                return 'iconfont-star_fill';
            }
            return 'iconfont-star_outline'
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