<template>
    <div @click="select(item.id)" class="record" :class="{'record--checked': checked}" @contextmenu.prevent="setChecked(true)">
        <div class="record__checkbox" @click.stop><input type="checkbox" :checked="checked" @change="setChecked($event.target.checked)" v-if="withCheckbox" /></div>
        <div class="record__detail">
            <div class="record__title">
                <i class="iconfont iconfont--l text-secondary" :class="coffeeTypeIcon"></i>
                <div class="ellipsis">{{ item.coffeePlace }}</div>
            </div>
            <div class="record__subtitle">{{ subtitle }}</div>
        </div>
        <div class="record__tasting">
            <div class="record__profile">
                <CjBar v-for="(bar, index) of bars"
                    :key="index"
                    :intensity="bar.intensity"
                    :quality="bar.quality"></CjBar>
            </div>
            <div class="record__rating">
                <span class="record__rating-value">{{ ratingText }}</span>
                <span class="record__rating-maximum">&nbsp;/&nbsp;5</span>
            </div>
        </div>
    </div>
</template>

<script>
import CjBar from './Bar.vue'

export default {
    name: 'JurnalRecord',
    components: { CjBar },
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
            if (this.item.coffeeRoaster) {
                parts.push(this.item.coffeeRoaster) 
            }
            return parts.join(', ')
        },
        coffeeTypeIcon: function () {
            if (this.item.coffeeType == 'filter') {
                return 'iconfont-batch'
            }
            return 'iconfont-espresso'
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