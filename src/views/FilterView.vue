<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>Filters</h1>
                </header>
                <div class="column gap-m flex-grow">
                    <div class="row row--middle gap-s">
                        <div class="input__label input__label--inline">Date</div>
                        <div class="row gap-s">
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
                    </div>
                    <SelectToggle :options="coffeeTypeOptions"
                        label="Method"
                        :value="filters.coffeeType"
                        @change="setValue('coffeeType', $event)"></SelectToggle>
                    <SelectToggle :options="coffeeRoastIntensityOptions"
                        label="Intensity"
                        :value="filters.coffeeRoastIntensity"
                        @change="setValue('coffeeRoastIntensity', $event)"></SelectToggle>
                    <SelectList inputId="coffee-place"
                        v-if="coffeePlaceOptions.length > 0"
                        label="Place"
                        :options="coffeePlaceOptions | orderAlphabetical('asc')"
                        :value="filters.coffeePlace"
                        @change="setValue('coffeePlace', $event)"></SelectList>
                    <SelectList inputId="coffee-origin"
                        v-if="coffeeOriginOptions.length > 0"
                        label="Origin"
                        :options="coffeeOriginOptions | orderAlphabetical('asc')"
                        :value="filters.coffeeOrigin"
                        @change="setValue('coffeeOrigin', $event)"></SelectList>
                    <SelectList inputId="coffee-roaster"
                        v-if="coffeeRoasterOptions.length > 0"
                        label="Roaster"
                        :options="coffeeRoasterOptions | orderAlphabetical('asc')"
                        :value="filters.coffeeRoster"
                        @change="setValue('coffeeRoster', $event)"></SelectList>
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
import SelectToggle from '../components/SelectToggle.vue'

export default {
    name: 'FilterView',
    components: { SelectList, SelectToggle },
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
            const normKeys = ['coffeeType', 'coffeeRoastIntensity', 'coffeePlace', 'coffeeOrigin', 'coffeeRost']
            let norm = this.$route.query
            for (const key of normKeys) {
                if (norm[key] && !Array.isArray(norm[key])) {
                    norm[key] = [norm[key]]
                }
            }
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
            return this.$store.getters.coffeePlaceOptions
        },
        coffeeOriginOptions: function() {
            return this.$store.getters.coffeeOriginOptions
        },
        coffeeRoasterOptions: function() {
            return this.$store.getters.coffeeRoasterOptions
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
        normQueryparam: function (queryValue) {
            if (queryValue === undefined) {
                return []
            }
            if (typeof queryValue == "string") {
                return [queryValue]
            }
            return queryValue
        }
    }
}
</script>
