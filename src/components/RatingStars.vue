<template>
    <div class="row flex-grow row--center gap-m">
        <RatingButton v-for="rating of ratings"
            :key="rating.value"
            :value="rating.value"
            :active="rating.active"
            @select="select($event)"></RatingButton>
    </div>
</template>

<script>
import RatingButton from './RatingButton.vue'

export default {
    name: 'RatingStars',
    components: { RatingButton },
    props: {
        active: {
            type: Array,
            default: () => []
        },
        limit: {
            type: Number,
            default: 5
        }
    },
    computed: {
        ratings: function () {
            const result = []
            for (let i = 1; i <= this.limit; i++) {
                result.push({
                    value: i,
                    active: this.active.indexOf(i) > -1
                })
            }
            return result
        }
    },
    methods: {
        select: function (value) {
            this.$emit('select', value)
        },
    }
}
</script>