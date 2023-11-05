<template>
    <div class="column gap-s">
        <div class="row gap-m row--middle">
            <transition name="animation--fade">
                <CoffeeTypeIcon class="text-5 text-secondary" v-if="coffee.coffeeType"
                    :coffeeType="coffee.coffeeType"
                    @click="select('coffeeType')"></CoffeeTypeIcon>
            </transition>
            <div class="column gap-s flex-grow ellipsis">
                <div class="row gap-s">
                    <transition name="animation--fade">
                        <i class="iconfont iconfont-star_fill" v-if="coffee.limited" @click="select('limited')"></i>
                    </transition>
                    <transition name="animation--fade">
                        <span v-if="coffee.coffeePlace" @click="select('coffeePlace')">{{ coffee.coffeePlace }}</span>
                    </transition>
                </div>
                <div class="text-secondary text-s ellipsis">
                    <transition name="animation--fade">
                        <span v-if="coffee.coffeeOrigin" @click="select('coffeeOrigin')">{{ coffee.coffeeOrigin }}</span>
                    </transition>
                    <transition name="animation--fade">
                        <span v-if="coffee.coffeeRegion" @click="select('coffeeRegion')">:{{ coffee.coffeeRegion }}</span>
                    </transition>
                    <transition name="animation--fade">
                        <span v-if="coffee.coffeeRoaster" @click="select('coffeeRoaster')"><span v-if="coffee.coffeeOrigin || coffee.coffeeRegion">, </span>{{ coffee.coffeeRoaster }}</span>
                    </transition>
                </div>
            </div>
            <button type="button" class="btn btn--secondary btn--circle" v-if="enableEdit" @click="$emit('edit')">
                <i class="iconfont iconfont-pencil text-l"></i>
            </button>
        </div>
        
        <div class="row gap-s" v-if="tags.length > 0">
            <transition-group name="animation--fade" appear>
                <div class="tag" v-for="tag of tags" :key="tag.key" @click="select(tag.key)">{{ tag.text }}</div>
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
                result.push({ key: 'coffeeRoastIntensity', text: this.coffee.coffeeRoastIntensity })
            }
            if (this.coffee.coffeeProcessing) {
                result.push({ key: 'coffeeProcessing', text: this.coffee.coffeeProcessing })
            }
            if (this.coffee.decaf) {
                result.push({ key: 'decaf', text: 'decaf' })
            }
            return result
        }
    },
    methods: {
        select: function (key) {
            this.$emit('select', key)
        }
    }
}
</script>