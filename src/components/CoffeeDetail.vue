<template>
    <div class="column gap-s">
        <div class="row gap-m row--middle">
            <transition name="animation--fade">
                <CoffeeTypeIcon class="text-5 text-secondary" :coffeeType="coffee.coffeeType" v-if="coffee.coffeeType"></CoffeeTypeIcon>
            </transition>
            <div class="column gap-s flex-grow ellipsis">
                <div class="row gap-s">
                    <transition name="animation--fade">
                        <i class="iconfont iconfont-star_fill" v-if="coffee.limited"></i>
                    </transition>
                    <transition name="animation--fade">
                        <span v-if="coffee.coffeePlace">{{ coffee.coffeePlace }}</span>
                    </transition>
                </div>
                <div class="text-secondary text-s ellipsis">
                    <transition name="animation--fade">
                        <span v-if="coffee.coffeeOrigin">{{ coffee.coffeeOrigin }}</span>
                    </transition>
                    <transition name="animation--fade">
                        <span v-if="coffee.coffeeRegion">:{{ coffee.coffeeRegion }}</span>
                    </transition>
                    <transition name="animation--fade">
                        <span v-if="coffee.coffeeRoaster"><span v-if="coffee.coffeeOrigin || coffee.coffeeRegion">, </span>{{ coffee.coffeeRoaster }}</span>
                    </transition>
                </div>
            </div>
            <button type="button" class="btn btn--secondary btn--circle" v-if="enableEdit" @click="$emit('edit')">
                <i class="iconfont iconfont-pencil text-l"></i>
            </button>
        </div>
        
        <div class="row gap-m" v-if="tags.length > 0">
            <transition-group name="animation--fade" appear>
                <div class="toggle text-s" v-for="tag of tags" :key="tag">{{ tag }}</div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import CoffeeTypeIcon from './CoffeeTypeIcon.vue'

export default {
    name: 'CoffeeDetail',
    components: { CoffeeTypeIcon },
    props: {
        coffee: [Object],
        enableEdit: {
            type: Boolean,
            default: true
        }
    },
    computed: {
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