<template>
    <div class="column gap-m">
        <div class="row row--center gap-s">
            <div class="carousel__bar" v-for="(key, index) of cards" :key="key"
                :class="{'carousel__bar--active': index == activeIndex, 'carousel__bar--filled': coffeeValue[key]}" ></div>
        </div>
        <div class="carousel scroll--transparent" ref="carousel"
            :style="{'--carousel-scroll': scrollPosition + 'px'}"
            @scroll.passive="onScroll($event)">
            <CjCard>
                <div class="card__inner">
                    <h2 class="text-center">Bags</h2>
                    <div class="column column--devider px-l flex-grow">
                        <transition-group name="animation--list-delete">
                            <SwipeActions class="pos-r" v-for="(item, index) of bags" :key="item.id || index">
                                <template v-slot:actions>
                                    <div class="action__delete" @click="deleteBag(index)">
                                        <i class="iconfont iconfont-bin text-l"></i>
                                    </div>
                                </template>
                                <div class="bag__item row row--center py-s">
                                    <button type="button" class="btn btn--secondary row gap-m row--middle row--center flex"
                                        @click="setBatch(item)">
                                        <span class="ellipsis" v-if="item.coffeeRoaster">{{ item.coffeeRoaster }}</span>
                                        <span class="text-s text-secondary ellipsis" v-if="item.coffeeOrigin">{{ item.coffeeOrigin }}</span>
                                    </button>
                                </div>
                            </SwipeActions>
                        </transition-group>
                    </div>
                </div>
            </CjCard>
            <CjCard>
                <div class="card__inner">
                    <h2 class="text-center">Drink type</h2>
                    <div class="row row--middle flex">
                        <div class="row row--center flex row--devider">
                            <div class="row row--center flex px-s" v-for="item of coffeeTypes" :key="item.id">
                                <button type="button" class="btn column column--center gap-s flex"
                                    :class="coffeeValue.coffeeType == item.id ? 'btn--primary' : 'btn--secondary'"
                                    @click="setAndNext('coffeeType', item.id)">
                                    <CoffeeTypeIcon class="icon-button-l" :coffeeType="item.id"></CoffeeTypeIcon>
                                    <div>{{ item.name }}</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </CjCard>
            <CjCard>
                <div class="card__inner">
                    <h2 class="text-center">Intensity</h2>
                    <div class="column column--devider px-l">
                        <div class="row row--center py-s" v-for="item of coffeeRoastIntensities" :key="item.id">
                            <button type="button" class="btn flex-grow"
                                :class="coffeeValue.coffeeRoastIntensity == item.id ? 'btn--primary' : 'btn--secondary'"
                                @click="setAndNext('coffeeRoastIntensity', item.id)">
                                {{  item.name  }}
                            </button>
                        </div>
                    </div>
                </div>
            </CjCard>
            <CjCard>
                <div class="card__inner">
                    <h2 class="text-center">Processing</h2>
                    <div class="column column--devider px-l">
                        <div class="row row--center py-s" v-for="item of coffeeProcessings" :key="item.id">
                            <button type="button" class="btn flex-grow"
                                :class="coffeeValue.coffeeProcessing == item.id ? 'btn--primary' : 'btn--secondary'"
                                @click="setAndNext('coffeeProcessing', item.id)">
                                {{  item.name  }}
                            </button>
                        </div>
                    </div>
                </div>
            </CjCard>
            <CjCard>
                <div class="card__inner">
                    <h2 class="text-center">Place</h2>
                    <SearchableList :options="coffeePlaces"
                        :value="coffeeValue.coffeePlace"
                        :searchValue="filterValue.coffeePlace"
                        @select="setAndNext('coffeePlace', $event)"
                        @changeSearch="filters.coffeePlace = $event"></SearchableList>
                    <AlphabetFilter class="alphabet-filter" :value="filterInitials.coffeePlace" @change="filters.coffeePlace = $event"></AlphabetFilter>
                </div>
            </CjCard>
            <CjCard>
                <div class="card__inner">
                    <h2 class="text-center">Roaster</h2>
                    <SearchableList :options="coffeeRoasters"
                        :value="coffeeValue.coffeeRoaster"
                        :searchValue="filterValue.coffeeRoaster"
                        @select="setAndNext('coffeeRoaster', $event)"
                        @changeSearch="filters.coffeeRoaster = $event"></SearchableList>
                    <AlphabetFilter class="alphabet-filter" :value="filterInitials.coffeeRoaster" @change="filters.coffeeRoaster = $event"></AlphabetFilter>
                </div>
            </CjCard>
            <CjCard>
                <div class="card__inner">
                    <h2 class="text-center">Origin</h2>
                    <SearchableList :options="coffeeOrigins"
                        :value="coffeeValue.coffeeOrigin"
                        :searchValue="filterValue.coffeeOrigin"
                        @select="setAndNext('coffeeOrigin', $event)"
                        @changeSearch="filters.coffeeOrigin = $event"></SearchableList>
                    <AlphabetFilter class="alphabet-filter" :value="filterInitials.coffeeOrigin" @change="filters.coffeeOrigin = $event"></AlphabetFilter>
                </div>
            </CjCard>
            <CjCard>
                <div class="card__inner">
                    <h2 class="text-center">Region</h2>
                    <SearchableList :options="coffeeRegions"
                        :value="coffeeValue.coffeeRegion"
                        :searchValue="filterValue.coffeeRegion"
                        @select="setAndNext('coffeeRegion', $event)"
                        @changeSearch="filters.coffeeRegion = $event"></SearchableList>
                    <AlphabetFilter class="alphabet-filter" :value="filterInitials.coffeeRegion" @change="filters.coffeeRegion = $event"></AlphabetFilter>
                </div>
            </CjCard>
            <CjCard>
                <div class="card__inner">
                    <div class="column column--devider column--middle px-l flex-grow">
                        <div class="row row--middle row--center py-s">
                            <button type="button" class="btn row gap-s row--middle flex"
                                :class="coffeeValue.limited ? 'btn--primary' : 'btn--secondary'"
                                @click="setValue('limited', !coffeeValue.limited)">
                                <div class="text-left flex">limited</div>
                                <span class="iconfont text-m checkbox" :class="coffeeValue.limited ? 'iconfont-icon-check' : ''"></span>
                            </button>
                        </div>
                        <div class="row row--middle row--center py-s">
                            <button type="button" class="btn row gap-s row--middle flex"
                                :class="coffeeValue.decaf ? 'btn--primary' : 'btn--secondary'"
                                @click="setValue('decaf', !coffeeValue.decaf)">
                                <div class="text-left flex">decaf</div>
                                <span class="iconfont text-m checkbox" :class="coffeeValue.decaf ? 'iconfont-icon-check' : ''"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </CjCard>
        </div>
        <div class="row row--center gap-s">
            <button type="button" class="btn row row--middle gap-m" :class="saveToBags ? 'btn--primary' : 'btn--secondary text-secondary'" @click="toggleSaveToBags()">
                Save to bags<span class="iconfont text-m checkbox" :class="saveToBags ? 'iconfont-icon-check' : ''"></span>
            </button>
        </div>
    </div>
</template>

<script>
import CjCard from './Card.vue'
import CoffeeTypeIcon from './CoffeeTypeIcon.vue'
import SearchableList from './SearchableList.vue'
import SwipeActions from './SwipeActions.vue'
import AlphabetFilter from './AlphabetFilter.vue'

export default {
    name: 'CoffeeDetailForm',
    components: { CjCard, CoffeeTypeIcon, SearchableList, SwipeActions, AlphabetFilter },
    inheritAttrs: false,
    props: {
        item: {
            type: Object,
            default: () => {return {}}
        }
    },
    data: function () {
        return {
            cards: ['bags', 'coffeeType', 'coffeeRoastIntensity', 'coffeeProcessing', 'coffeePlace', 'coffeeRoaster', 'coffeeOrigin', 'coffeeRegion', 'limited'],
            coffee: {},
            filters: {},
            limitedValue: undefined,
            scrollPosition: 0,
            activeIndex: 0,
            saveToBags: false,
            bagPropertyWhitelist: ['coffeeType', 'coffeeRoastIntensity', 'coffeeProcessing', 'coffeeRoaster', 'coffeeOrigin', 'coffeeRegion', 'limited']
        }
    },
    computed: {
        coffeeValue: function () {
            return Object.assign({}, this.item, this.coffee)
        },
        filterValue: function () {
            return Object.assign({}, this.item, this.filters)
        },
        bags: function () {
            return this.$store.state.bags
        },
        coffeeRoastIntensities: function() {
            return this.$store.state.coffeeRoastIntensities
        },
        coffeeTypes: function() {
            return this.$store.state.coffeeTypes
        },
        coffeePlaces: function() {
            return this.$store.getters.coffeePlaceOptions
        },
        coffeeOrigins: function() {
            return this.$store.getters.coffeeOriginOptions
        },
        coffeeRoasters: function() {
            return this.$store.getters.coffeeRoasterOptions
        },
        coffeeRegions: function() {
            return this.$store.getters.coffeeRegionOptions
        },
        coffeeProcessings: function() {
            return this.$store.state.coffeeProcessings
        },
        filterInitials: function () {
            let initials = {}
            for (let key in this.filterValue) {
                if (!this.filterValue[key].substr) {
                    continue
                }
                initials[key] = this.filterValue[key].substr(0, 1).toUpperCase()
            }
            return initials
        }
    },
    methods: {
        setBatch: function (bag) {
            for (let key in bag) {
                if (this.bagPropertyWhitelist.indexOf(key) === -1) {
                    continue
                }
                this.coffee[key] = bag[key]
            }
            this.$emit('change', this.coffee)
            this.moveCarousel(4, 'smooth')
        },
        setValue: function (key, value) {
            if (this.coffee[key] === value) {
                return
            }
            this.coffee[key] = value
            this.$emit('change', this.coffee)
        },
        setAndNext: function (key, value) {
            this.setValue(key, value)
            this.next()
        },
        next: function () {
            this.moveCarousel(this.activeIndex + 1, 'smooth')
        },
        selectCard: function (key) {
            const index = this.getCardIndexByKey(key)
            if (index < 0) {
                return
            }
            this.moveCarousel(index, 'smooth')
        },
        getCardIndexByKey: function (key) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i] === key) {
                    return i
                }
            }
            return -1
        },
        moveCarousel: function (index, behavior) {
            const cardWidth = this.$refs.carousel.offsetWidth - 64
            this.$refs.carousel.scrollTo({
                top: 0,
                left: (cardWidth + 16) * (index),
                behavior: behavior
            })
        },
        toggleSaveToBags: function () {
            this.saveToBags = !this.saveToBags
            this.$emit('changeSaveBag', this.saveToBags)
        },
        deleteBag: function (index) {
            this.$store.dispatch('removeBags', [index])
        },
        onScroll: function (event) {
            if (!this.$refs.carousel) {
                return
            }
            this.scrollPosition = event.target.scrollLeft
            const cardWidth = this.$refs.carousel.offsetWidth - 64
            this.activeIndex = Math.round(this.scrollPosition / (cardWidth + 16))
        }
    },
    mounted: function () {
        this.moveCarousel(1, 'instant')
    }
}
</script>

<style scoped>
.carousel {
    display: flex;
    flex-direction: row;
    gap: var(--unit-m);
    padding: 0px var(--unit-l);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
}

.carousel__bar {
    width: var(--unit-s);
    height: var(--unit-s);
    border-radius: 100%;
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-secondary);
    transition: border ease 300ms, background-color ease 200ms;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.carousel__bar::before {
    content: '';
    width: 2px;
    height: 2px;
    background-color: transparent;
    display: block;
    transition: background-color ease 200ms;
}

.carousel__bar.carousel__bar--filled::before {
    background-color: var(--color-primary);
}

.carousel__bar--active {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
}

.card__inner {
    box-sizing: border-box;
    padding: var(--unit-m);
    display: flex;
    flex-direction: column;
    gap: var(--unit-m);
    flex-grow: 1;
}

.devider {
    width: 1px;
    background-color: var(--color-border);
}

.card__inner .icon-button-l {
    font-size: 3em;
}

.checkbox {
    border: 1px solid;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

.bag__item {
    position: relative;
    background-color: var(--color-bg-secondary);
    border-radius: 7px;
}

.alphabet-filter {
    position: absolute;
    right: calc(var(--unit-s) + 1px);
    top: var(--unit-m);
    height: calc(100% - 2 * var(--unit-m));
}
</style>