<template>
    <PropertyGraph title="Intensity" :dataset="composition"></PropertyGraph>
</template>

<script>
import PropertyGraph from './PropertyGraph.vue'

export default {
    name: 'IntensityComposition',
    components: { PropertyGraph },
    props: {
        dataset: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        composition: function () {
            const properties = ['aroma', 'acidity', 'sweetness', 'body', 'finish']
            const result = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ]
            for (const item of this.dataset) {
                for (let i = 0; i < properties.length; i++) {
                    const property = properties[i]
                    if (item.propertyRatings[property] === undefined || item.propertyRatings[property].intensity === undefined) {
                        continue
                    }
                    const ratingIndex = item.propertyRatings[property].intensity / 0.25
                    result[i][ratingIndex]++
                }
            }
            return result
        }
    }
}
</script>