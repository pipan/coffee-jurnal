<template>
    <div class="row gap-s">
        <div class="column column--evenly text-secondary">
            <div>&#x2606;</div>
            <div>&#x2606;</div>
            <div>&#x2606;</div>
            <div>&#x2606;</div>
            <div>&#x2606;</div>
        </div>
        <div class="rating-timeline scroll-x hidden-y">
            <div v-for="(item, index) of items"
                :key="index"
                class="rating-timeline__item"
                :class="item.classes">
                <div class="rating-timeline__dot"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RatingTimeline',
    components: {  },
    props: {
        dataset: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        datasetWithRatings: function () {
            const result = []
            for (const item of this.dataset) {
                if (item.rating <= 0) {
                    continue
                }
                result.push(item)
            }
            return result
        },
        items: function () {
            const result = []
            for (const item of this.datasetWithRatings) {
                result.push({
                    classes: ['rating-timeline__item--' + item.rating]
                })
            }
            return result
        }
    }
}
</script>