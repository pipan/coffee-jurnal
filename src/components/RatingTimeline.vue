<template>
    <div class="row gap-s">
        <div class="column column--evenly text-secondary">
            <div v-html="'&#x2606;'"></div>
            <div v-html="'&#x2606;'"></div>
            <div v-html="'&#x2606;'"></div>
            <div v-html="'&#x2606;'"></div>
            <div v-html="'&#x2606;'"></div>
        </div>
        <div class="rating-timeline">
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
        items: function () {
            const result = []
            for (const item of this.dataset) {
                result.push({
                    classes: ['rating-timeline__item--' + item.rating]
                })
            }
            return result
        }
    }
}
</script>