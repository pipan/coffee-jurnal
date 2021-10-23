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
        composition: function () {
            const result = [0, 0, 0, 0, 0]
            for (const item of this.dataset) {
                const index = item.rating - 1
                result[index]++
            }
            return result
        },
        items: function () {
            const result = []
            for (const numberOfOccurances of this.composition) {
                const ratio = numberOfOccurances / this.dataset.length
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
            return this.mostFrequentValue / this.dataset.length
        },
        average: function () {
            let sum = 0
            for (const item of this.dataset) {
                sum += item.rating
            }
            return sum / this.dataset.length
        }
    }
}
</script>