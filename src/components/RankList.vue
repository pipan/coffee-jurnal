<template>
    <div class="card">
        <div class="row row--middle">
            <h2 class="flex-grow py-m">Best Rated</h2>
            <StatCoffeeOrder :value="orderBy" @change="setOrderBy($event)"></StatCoffeeOrder>
        </div>
        <div class="ranks">
            <div class="rank-item" v-for="(item, index) of items"
                :key="index">
                <div class="rank-item__rank">#{{ index + 1}}</div>
                <div class="rank-item__name">{{ item.name }}</div>
                <div class="rank-item__value">{{ item.value | round(1) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import StatCoffeeOrder from './StatCoffeeOrder.vue'

export default {
    name: 'RankList',
    components: { StatCoffeeOrder },
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
            const group = {}
            for (const item of this.datasetWithRatings) {
                const groupIndex = item[this.orderBy]
                if (!groupIndex) {
                    continue
                }
                if (!group[groupIndex]) {
                    group[groupIndex] = []
                }
                group[groupIndex].push(item.rating)
            }
            const result = []
            for (const key in group) {
                let ratingSum = 0
                for (const item of group[key]) {
                    ratingSum += item
                }
                result.push({
                    name: key,
                    value: ratingSum / group[key].length
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
            return this.$route.query.ratedOrder || 'coffeePlace'
        }
    },
    methods: {
        setOrderBy: function (value) {
            if (value === this.orderBy) {
                return
            }
            this.$router.push({
                query: Object.assign({}, this.$route.query, { ratedOrder: value })
            })
        }
    }
}
</script>