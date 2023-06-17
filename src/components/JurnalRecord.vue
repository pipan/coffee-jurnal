<template>
    <SwipeActions class="record" :class="isDeleting ? 'record--deleting' : ''">
        <template v-slot:actions>
            <div class="action__delete" @click="emitDelete()">
                <i class="iconfont iconfont-bin text-l"></i>
            </div>
        </template>
        <div class="record-body user-select-disable"
            @click="select(item.id)">
            <div class="record__detail">
                <div class="record__title">
                    <div :class="item.limited ? 'text-primary' : 'text-secondary'">
                        <i class="iconfont iconfont--l" :class="coffeeTypeIcon"></i>
                    </div>
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
    </SwipeActions>
</template>

<script>
import { formatCoffeeSecondaryInfo } from '../fn/coffeeFormater'
import CjBar from './Bar.vue'
import SwipeActions from './SwipeActions.vue'

export default {
    name: 'JurnalRecord',
    components: { CjBar, SwipeActions },
    props: {
        item: [Object]
    },
    data: function () {
        return {
            isDeleting: false
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
            return formatCoffeeSecondaryInfo(this.item)
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
            this.translateX = 0
            this.$emit('select', id)
        },
        emitDelete: function () {
            this.isDeleting = true
            this.$emit('delete', this.item)
            setTimeout(() => {
                this.$store.dispatch('deleteByIds', [this.item.id])
            })   
        }
    }
}
</script>

<style scoped>
.record-body {
    display: flex;
    background-color: var(--color-bg);
    padding: var(--unit-m);
    border-radius: calc(var(--border-radius) - 1px);
    transition: transform ease-out 140ms, background 140ms ease-out;
    height: 100%;
    box-sizing: border-box;
}

@media (hover: hover) {
    .record-body:hover {
        background-color: var(--color-active);
    }
}

.record-body:active {
    background-color: var(--color-active);
    transition-duration: 0ms;
}

.jurnal.journal--grid .record-body {
    flex-direction: column;
}

.jurnal.journal--list .record-body {
    flex-direction: row;
}

.action__delete {
    height: 100%;
    width: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-danger);
    color: var(--color-bg);
}
</style>