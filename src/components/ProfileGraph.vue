<template>
    <div class="column gap-s">
        <div class="graph">
            <button type="button" class="btn btn--secondary axis-y-label" @click="togglePropertyType()">
                <div :class="activePropertyType === 'feeling' ? 'text-primary' : 'text-s text-secondary'">feeling</div>
                <div :class="activePropertyType === 'intensity' ? 'text-primary' : 'text-s text-secondary'">intensity</div>
            </button>
            <div class="graph-grid">
                <div class="graph-grid__line"></div>
                <div class="graph-grid__line"></div>
                <div class="graph-grid__line"></div>
                <div class="graph-grid__line"></div>
                <div class="graph-grid__line graph-grid__line--primary" v-if="moveValue > -1" :style="{ 'bottom': moveValue * 100 + '%' }"></div>
            </div>
            <div class="graph-bars row">
                <transition-group name="animation--graph-bar" appear>
                    <ProfileGraphBar class="flex" v-for="item of properties" :key="item.key"
                        :disabled="activePropertyType !== 'intensity'"
                        :value="propertyRatings[item.key] ? propertyRatings[item.key]?.intensity : undefined"
                        :quality="propertyRatings[item.key] ? propertyRatings[item.key]?.quality : undefined"
                        @change="setIntensity(item.key, $event)"
                        @move="move($event)"></ProfileGraphBar>
                </transition-group>
            </div>
            <transition name="animation--graph-point" :duration="300">
                <div class="graph-points row" v-if="activePropertyType === 'feeling'">
                    <ProfileGraphPoint class="flex" v-for="item of properties" :key="item.key"
                        :value="propertyRatings[item.key] ? propertyRatings[item.key]?.quality : undefined"
                        @change="setQuality(item.key, $event)"
                        @move="move($event)"></ProfileGraphPoint>
                </div>
            </transition>
        </div>
        <div class="axis-x-label row text-s text-secondary text-center">
            <transition-group name="animation--top-slide" appear>
                <div class="flex" v-for="item of properties" :key="item.key">{{ item.label }}</div>
            </transition-group>
        </div>
    </div>
    
</template>

<script>
import ProfileGraphBar from './ProfileGraphBar.vue'
import ProfileGraphPoint from './ProfileGraphPoint.vue'

export default {
    name: 'ProfileGraph',
    components: { ProfileGraphBar, ProfileGraphPoint },
    props: {
        propertyRatings: [Object]
    },
    data: function () {
        return {
            activePropertyType: 'intensity',
            moveValue: -1,
            properties: [
                { key: 'aroma', label: 'aro' },
                { key: 'acidity', label: 'aci' },
                { key: 'sweetness', label: 'swe' },
                { key: 'body', label: 'bod' },
                { key: 'finish', label: 'fin' }
            ]
        }
    },
    computed: {},
    methods: {
        togglePropertyType: function () {
            this.activePropertyType = this.activePropertyType === 'intensity' ? 'feeling' : 'intensity'
        },
        setIntensity: function (property, value) {
            this.set(property, 'intensity', value)
        },
        setQuality: function (property, value) {
            this.set(property, 'quality', value)
        },
        set: function (property, type, value) {
            this.move(-1)
            let override = {}
            override[type] = value
            let propertyClone = Object.assign({}, this.propertyRatings[property], override)
            let clone = Object.assign({}, this.propertyRatings)
            clone[property] = propertyClone
            this.$emit('change', clone)
        },
        move: function(value) {
            this.moveValue = value
        }
    }
}
</script>

<style scoped>
    .axis-y-label {
        position: absolute;
        left: 0px;
        top: 50%;
        transform: rotate(-90deg) translateX(-50%) translateY(-120%);
        transform-origin: 0 0;
    }

    .axis-y-label > div {
        transition: font-size ease var(--animation-duration-m), color ease var(--animation-duration-m);
    }

    .axis-x-label {
        width: calc(100% - 2 * 60px);
        margin: 0px auto;
        overflow: hidden;
    }

    .graph {
        position: relative;
        width: calc(100% - 2 * 60px);
        height: 140px;
        margin: 0px auto;
        border-bottom: solid 1px var(--color-border);
        border-left: solid 1px var(--color-border);
    }

    .graph-grid__line {
        position: absolute;
        left: 5%;
        width: 90%;
        height: 1px;
        border-bottom: dashed 1px var(--color-border);
    }

    .graph-grid__line.graph-grid__line--primary { border-color: var(--color-primary); }

    .graph-bars {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    .graph-points {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 3;
    }

    .graph-grid__line:nth-child(1) { bottom: 25% }
    .graph-grid__line:nth-child(2) { bottom: 50% }
    .graph-grid__line:nth-child(3) { bottom: 75% }
    .graph-grid__line:nth-child(4) { bottom: 100% }

</style>