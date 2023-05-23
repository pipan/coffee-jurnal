<template>
    <div class="row">
        <RatingStars :active="selectedStars" @select="change($event)"></RatingStars>
    </div>
</template>

<script>
import RatingStars from './RatingStars.vue'

export default {
    name: 'RatingInput',
    components: { RatingStars },
    props: {
        value: [Number],
        limit: {
            type: Number,
            default: 5
        }
    },
    computed: {
        selectedStars: function () {
            let selected = []
            if (!this.value) {
                return selected
            }
            for (let i = 1; i <= this.value; i++) {
                selected.push(i)
            }
            return selected
        },
        ratings: function () {
            const result = []
            for (let i = 1; i <= this.limit; i++) {
                result.push({
                    value: i,
                    active: i <= this.value
                })
            }
            return result
        }
    },
    methods: {
        change: function (value) {
            if (value === this.value) {
                return
            }
            this.$emit('change', value)
        },
    }
}
</script>