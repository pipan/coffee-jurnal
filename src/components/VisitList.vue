<template>
    <div class="card">
        <div class="row row--middle">
            <h2 class="flex-grow py-m">Most Visited</h2>
            <StatCoffeeOrder :value="orderBy" @change="setOrderBy($event)"></StatCoffeeOrder>
        </div>
        <div class="ranks">
            <div class="rank-item" v-for="(item, index) of items"
                :key="index">
                <div class="rank-item__rank">#{{ index + 1}}</div>
                <div class="rank-item__name">{{ item.name }}</div>
                <div class="rank-item__bar">
                    <div class="bar bar--x" :style="{ width: item.ratio * 100 + '%' }"></div>
                </div>
                <div class="rank-item__value">{{ item.value }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import StatCoffeeOrder from './StatCoffeeOrder.vue'

export default {
    name: 'VisitList',
    components: { StatCoffeeOrder },
    props: {
        dataset: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        items: function () {
            const group = {}
            for (const item of this.dataset) {
                const groupIndex = item[this.orderBy]
                if (!groupIndex) {
                    continue
                }
                if (!group[groupIndex]) {
                    group[groupIndex] = 0
                }
                group[groupIndex]++
            }
            const result = []
            for (const key in group) {
                result.push({
                    name: key,
                    value: group[key],
                    ratio: group[key] / this.dataset.length
                })
            }

            result.sort((a, b) => {
                if (a.value > b.value) {
                    return -1
                } else if (a.value < b.value) {
                    return 1
                }
                return 0
            })
            return result
        },
        orderBy: function () {
            return this.$route.query.visitedOrder || 'coffeePlace'
        }
    },
    methods: {
        setOrderBy: function (value) {
            if (value === this.orderBy) {
                return
            }
            this.$router.push({
                query: Object.assign({}, this.$route.query, { visitedOrder: value })
            })
        }
    }
}
</script>