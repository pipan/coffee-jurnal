<template>
    <div class="column gap-m">
        <div class="row row--center text-s">{{ title }}</div>
        <div>
            <div class="property-graph">
                <div v-for="(column, columnIndex) of items"
                    :key="columnIndex"
                    class="property-graph__column">
                    <div v-for="(item, index) of column"
                        :key="index"
                        class="property-graph__cell">
                        <div class="property-graph__dot" :class="item.classes"></div>    
                    </div>                    
                </div>
            </div>
            <div class="row row--evenly text-s text-secondary pt-s">
                <div>A</div>
                <div>A</div>
                <div>S</div>
                <div>B</div>
                <div>F</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PropertyGraph',
    components: {  },
    props: {
        title: {
            type: String,
            default: ''
        },
        dataset: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        items: function () {
            const result = []
            let maxColumnSum = 0
            for (const column of this.dataset) {
                const columnSum = this.sum(column)
                if (columnSum > maxColumnSum) {
                    maxColumnSum = columnSum
                }
            }
            for (const column of this.dataset) {
                result.push([])
                for (const item of column) {
                    const ratio = item / maxColumnSum
                    result[result.length - 1].push({
                        absolute: item,
                        ratio: ratio,
                        classes: this.classFromRatio(ratio)
                    })
                }
                const maximums = this.maxIndexes(column)
                if (maximums.length === 1) {
                    result[result.length - 1][maximums[0]].classes.push('property-graph__dot--active')
                }
            }
            return result
        }
    },
    methods: {
        maxIndexes: function (list) {
            let result = []
            const max = this.max(list)
            let i = 0
            for (const item of list) {
                if (item === max) {
                    result.push(i) 
                }
                i++
            }
            return result
        },
        max: function (list) {
            let result = 0
            for (const item of list) {
                if (item > result) {
                    result = item
                }
            }
            return result
        },
        sum: function (list) {
            let result = 0
            for (const item of list) {
                result += item
            }
            return result
        },
        classFromRatio: function (ratio) {
            if (ratio >= 0.5)  {
                return ['property-graph__dot--l']
            }
            if (ratio >= 0.2)  {
                return ['property-graph__dot--m']
            }
            if (ratio > 0.0)  {
                return ['property-graph__dot--s']
            }
            return []
        }
    }
}
</script>