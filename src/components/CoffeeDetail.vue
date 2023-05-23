<template>
    <div class="column gap-s">
        <div class="row gap-m row--middle">
            <CoffeeTypeIcon class="text-5 text-secondary opacity-05" :coffeeType="coffee.coffeeType"></CoffeeTypeIcon>
            <div class="column gap-s flex-grow">
                <div class="row gap-s">
                    <i class="iconfont iconfont-star_fill" v-if="coffee.limited"></i>
                    <span>{{ coffee.coffeePlace }}</span>
                </div>
                <div class="text-secondary text-s">{{ secondLine }}</div>
            </div>
            <button type="button" class="btn btn--secondary btn--circle"  @click="$emit('edit')">
                <i class="iconfont iconfont-pencil text-l"></i>
            </button>
        </div>
        <div class="row gap-m" v-if="tags.length > 0">
            <div class="toggle text-s" v-for="tag of tags" :key="tag">{{ tag }}</div>
        </div>
    </div>
</template>

<script>
import { formatCoffeeSecondaryInfo } from '../fn/coffeeFormater'
import CoffeeTypeIcon from './CoffeeTypeIcon.vue'

export default {
    name: 'CoffeeDetail',
    components: { CoffeeTypeIcon },
    props: {
        coffee: [Object]
    },
    computed: {
        secondLine: function () {
            return formatCoffeeSecondaryInfo(this.coffee)
        },
        tags: function () {
            let result = []
            if (this.coffee.coffeeRoastIntensity) {
                result.push(this.coffee.coffeeRoastIntensity)
            }
            if (this.coffee.coffeeProcessing) {
                result.push(this.coffee.coffeeProcessing)
            }
            return result
        }
    }
}
</script>