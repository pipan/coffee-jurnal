<template>
    <div @click="select(item.id)" class="record" :class="{'record--checked': checked}" @contextmenu.prevent="setChecked(true)">
        <div class="record__label">{{ label }}</div>
        <div class="record__checkbox" @click.stop><input type="checkbox" :checked="checked" @change="setChecked($event.target.checked)" v-if="withCheckbox" /></div>
        <div class="record__title">{{ item.coffeePlace }}</div>
        <div class="record__subtitle">{{ subtitle }}</div>
        <div class="record__profile">
            <Bar v-for="(bar, index) of bars"
                :key="index"
                :intensity="bar.intensity"
                :quality="bar.quality"></Bar>
        </div>
        <div class="record__rating">
            <span class="record__rating-value">{{ ratingText }}</span>
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
        checked: {
            type: Boolean,
            default: false
        },
        withCheckbox: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        bars: function () {
            if (!this.item.propertyRatings) {
                return []
            }
            const properties = ['aroma', 'acidity', 'sweetness', 'body', 'finish']
            const result = []
            for (const key of properties) {
                if (!this.item.propertyRatings[key]) {
                    continue
                }
                result.push(this.item.propertyRatings[key])
            }
            return result
        },
        ratingText: function () {
            if (this.item.rating === -1) {
                return '-'
            }
            return this.item.rating
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
        select: function (id) {
            this.$emit('select', id)
        },
        setChecked: function (value) {
            if (value === this.checked) {
                return
            }
            this.$emit('checkChange', value)
        }
    }
}
</script>