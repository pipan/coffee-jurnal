<template>
    <div @click="taste(item.id)" class="record">
        <div class="record__label">{{ label }}</div>
        <div class="record__title">{{ item.coffeePlace }}</div>
        <div class="record__subtitle">{{ subtitle }}</div>
        <div class="record__profile">
            <Bar v-for="(bar, index) of bars"
                :key="index"
                :intensity="bar.intensity"
                :quality="bar.quality"></Bar>
        </div>
        <div class="record__rating">
            <span class="record__rating-value">{{ item.rating || '-' }}</span>
            <span class="record__rating-maximum">&nbsp;/&nbsp;5</span>
        </div>
    </div>
</template>

<script>
import Bar from './Bar.vue'

export default {
    name: 'JurnalRecord',
    components: { Bar },
    props: {
        item: [Object],
    },
    computed: {
        bars: function () {
            if (!this.item.propertyRatings) {
                return []
            }
            const properties = ['aroma', 'acidity', 'sweetness', 'body', 'finish']
            const result = []
            for (const key of properties) {
                result.push(this.item.propertyRatings[key])
            }
            return result
        },
        subtitle: function() {
            const parts = []
            if (this.item.coffeeOrigin) {
                parts.push(this.item.coffeeOrigin)
            }
            if (this.item.coffeeRoster) {
                parts.push(this.item.coffeeRoster) 
            }
            return parts.join(', ')
        },
        label: function() {
            return this.item.coffeeType == 'espresso' ? 'E' : 'F'
        }
    },
    methods: {
        taste: function (id) {
            this.$router.push({
                name: 'Taste',
                params: { id }
            })
        }
    }
}
</script>