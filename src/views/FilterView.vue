<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>Filters</h1>
                </header>
                <div class="column gap-m flex-grow">
                    <InlineInput label="Date">
                        <div class="row row--wrap gap-s">
                            <input type="date"
                                :value="filters.dateSince"
                                @change="setValue('dateSince', $event.target.value)"
                                class="input-option"
                                :class="{'input-option--active': filters.dateSince}" />
                            <input type="date"
                                :value="filters.dateUntil"
                                @change="setValue('dateUntil', $event.target.value)"
                                class="input-option"
                                :class="{'input-option--active': filters.dateUntil}" />
                        </div>
                    </InlineInput>
                    <InlineInput label="Method">
                        <MultiToggleSwitch :nullable="true"
                            :options="coffeeTypeOptions"
                            :value="filters.coffeeType || []"
                            @change="setValue('coffeeType', $event)"></MultiToggleSwitch>
                    </InlineInput>
                    <InlineInput label="Intensity">
                        <MultiToggleSwitch :nullable="true"
                            :options="coffeeRoastIntensityOptions"
                            :value="filters.coffeeRoastIntensity || []"
                            @change="setValue('coffeeRoastIntensity', $event)"></MultiToggleSwitch>
                    </InlineInput>
                    <SelectList inputId="coffee-place"
                        v-if="coffeePlaceOptions.length > 0"
                        label="Place"
                        placeholder="search"
                        :options="coffeePlaceOptions"
                        :value="filters.coffeePlace"
                        @change="setValue('coffeePlace', $event)"></SelectList>
                    <SelectList inputId="coffee-origin"
                        v-if="coffeeOriginOptions.length > 0"
                        label="Origin"
                        placeholder="search"
                        :options="coffeeOriginOptions"
                        :value="filters.coffeeOrigin"
                        @change="setValue('coffeeOrigin', $event)"></SelectList>
                    <SelectList inputId="coffee-roaster"
                        v-if="coffeeRoasterOptions.length > 0"
                        label="Roaster"
                        placeholder="search"
                        :options="coffeeRoasterOptions"
                        :value="filters.coffeeRoaster"
                        @change="setValue('coffeeRoaster', $event)"></SelectList>
                    <RatingRange :value="filters.rating || []" @change="setValue('rating', $event)"></RatingRange>    
                </div>
                <div class="pt-m row row--center gap-m">
                    <button type="button" class="btn btn--secondary" @click="close()">CANCEL</button>
                    <button type="button" class="btn btn--primary" @click="apply()">APPLY</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SelectList from '../components/SelectList.vue'
import InlineInput from '../components/InlineInput.vue'
import MultiToggleSwitch from '../components/MultiToggleSwitch.vue'
import RatingRange from '../components/RatingRange.vue'
import orderAlphabetical from '../fn/orderAlphabetical'

export default {
    name: 'FilterView',
    components: { SelectList, InlineInput, MultiToggleSwitch, RatingRange },
    metaInfo: function () {
        return {
            title: "Stats Filters | CJ"
        }
    },
    data: function () {
        return {
            filterValues: {}
        }
    },
    computed: {
        queryNorm: function () {
            const normKeys = ['coffeeType', 'coffeeRoastIntensity', 'coffeePlace', 'coffeeOrigin', 'coffeeRost', 'rating']
            let norm = this.$route.query
            for (const key of normKeys) {
                if (norm[key] && !Array.isArray(norm[key])) {
                    norm[key] = [norm[key]]
                }
            }
            norm.rating = this.toIntList(norm.rating || [])
            return norm
        },
        filters: function () {
            return Object.assign({}, this.queryNorm, this.filterValues)
        },
        coffeeTypes: function() {
            return this.$store.state.coffeeTypes
        },
        coffeeRoastIntensities: function() {
            return this.$store.state.coffeeRoastIntensities
        },
        coffeeTypeOptions: function () {
            const options = []
            for (let type of this.coffeeTypes) {
                options.push(type.id)
            }
            return options
        },
        coffeePlaceOptions: function() {
            return orderAlphabetical(this.$store.getters.coffeePlaceOptions, 'asc')
        },
        coffeeOriginOptions: function() {
            return orderAlphabetical(this.$store.getters.coffeeOriginOptions, 'asc')
        },
        coffeeRoasterOptions: function() {
            return orderAlphabetical(this.$store.getters.coffeeRoasterOptions, 'asc')
        },
        coffeeRoastIntensityOptions: function() {
            const options = []
            for (let item of this.coffeeRoastIntensities) {
                options.push(item.id)
            }
            return options
        }
    },
    methods: {
        setValue: function (property, value) {
            let newObject = Object.assign({}, this.filterValues)
            newObject[property] = value
            this.filterValues = newObject
        },
        close: function() {
            this.$router.replace({
                name: 'Stats',
                query: this.$route.query
            })
        },
        apply: function() {
            const query = Object.assign({}, this.$route.query, this.filters)
            this.$router.replace({
                name: 'Stats',
                query: query
            })
        },
        toIntList: function (stringList) {
            let list = []
            for (const item of stringList) {
                list.push(parseInt(item))
            }
            return list
        }
    }
}
</script>
