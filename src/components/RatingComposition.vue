<template>
    <div class="column gap-m">
        <div class="row row--center text-s">Rating</div>
        <div class="row row--middle row--center">
            <span class="text-primary text-l text-bold">{{ average | round(1) }}</span><span class="text-secondary">&nbsp;/ 5</span>
        </div>
        <div class="row row--evenly rating-composition__graph">
            <RatingCompositionItem v-for="(item, index) of items"
                :key="index"
                :size="item.ratio * 100 + '%'"
                :active="item.absolute === mostFrequentValue"></RatingCompositionItem>
        </div>
    </div>
</template>

<script>
import RatingCompositionItem from './RatingCompositionItem.vue'

export default {
    name: 'RatingComposition',
    components: { RatingCompositionItem },
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
        composition: function () {
            const result = [0, 0, 0, 0, 0]
            for (const item of this.datasetWithRatings) {
                const index = item.rating - 1
                result[index]++
            }
            return result
        },
        ratingCount: function () {
            return this.datasetWithRatings.length
        },
        items: function () {
            const result = []
            for (const numberOfOccurances of this.composition) {
                const ratio = numberOfOccurances / this.ratingCount
                result.push({
                    absolute: numberOfOccurances,
                    ratio: ratio,
                    ratioNorm: ratio / this.mostFrequentRatio
                })
            }
            return result
        },
        mostFrequentValue: function () {
            let result = 0
            for (const numberOfOccurances of this.composition) {
                if (numberOfOccurances > result) {
                    result = numberOfOccurances
                } 
            }
            return result
        },
        mostFrequentRatio: function () {
            return this.mostFrequentValue / this.ratingCount
        },
        average: function () {
            let sum = 0
            for (const item of this.datasetWithRatings) {
                sum += item.rating
            }
            return sum / this.ratingCount
        }
    }
}
</script>