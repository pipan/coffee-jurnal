<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>Filters</h1>
                </header>
                <div class="column gap-m flex-grow">
                    <SelectToggle :options="coffeeTypeOptions"
                        :value="coffeeType"
                        @change="coffeeTypeValue = $event"></SelectToggle>
                    <SelectToggle :options="coffeeRoastIntensityOptions"
                        :value="coffeeRoastIntensity"
                        @change="coffeeRoastIntensityValue = $event"></SelectToggle>
                    <SelectList inputId="coffee-place"
                        v-if="coffeePlaceOptions.length > 0"
                        label="Coffee Place"
                        :options="coffeePlaceOptions | orderAlphabetical('asc')"
                        :value="coffeePlace"
                        @change="coffeePlaceValue = $event"></SelectList>
                    <SelectList inputId="coffee-origin"
                        v-if="coffeeOriginOptions.length > 0"
                        label="Coffee Origin"
                        :options="coffeeOriginOptions | orderAlphabetical('asc')"
                        :value="coffeeOrigin"
                        @change="coffeeOriginValue = $event"></SelectList>
                    <SelectList inputId="coffee-roster"
                        v-if="coffeeRosterOptions.length > 0"
                        label="Coffee Roaster"
                        :options="coffeeRosterOptions | orderAlphabetical('asc')"
                        :value="coffeeRoster"
                        @change="coffeeRosterValue = $event"></SelectList>
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
            coffeeTypeValue: undefined,
            coffeePlaceValue: undefined,
            coffeeOriginValue: undefined,
            coffeeRosterValue: undefined,
            coffeeRoastIntensityValue: undefined,
            preventClosing: false
        }
    },
    computed: {
        coffeeType: function () {
            if (this.coffeeTypeValue !== undefined) {
                return this.coffeeTypeValue
            }
            return this.normQueryparam(this.$route.query.filterType)
        },
        coffeePlace: function () {
            if (this.coffeePlaceValue !== undefined) {
                return this.coffeePlaceValue
            }
            return this.normQueryparam(this.$route.query.filterPlace)
        },
        coffeeOrigin: function () {
            if (this.coffeeOriginValue !== undefined) {
                return this.coffeeOriginValue
            }
            return this.normQueryparam(this.$route.query.filterOrigin)
        },
        coffeeRoster: function () {
            if (this.coffeeRosterValue !== undefined) {
                return this.coffeeRosterValue
            }
            return this.normQueryparam(this.$route.query.filterRoster)
        },
        coffeeRoastIntensity: function () {
            if (this.coffeeRoastIntensityValue !== undefined) {
                return this.coffeeRoastIntensityValue
            }
            return this.normQueryparam(this.$route.query.filterRoastIntensity)
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
        coffeeRosterOptions: function() {
            return this.$store.getters.coffeeRosterOptions
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
        outsideClick: function () {
            if (this.preventClosing) {
                this.preventClosing = false
                return
            }
            this.close()
        },
        close: function() {
            this.$router.replace({
                name: 'Stats',
                query: this.$route.query
            })
        },
        apply: function() {
            const query = Object.assign({}, this.$route.query, {
                    filterType: this.coffeeType,
                    filterPlace: this.coffeePlace,
                    filterOrigin: this.coffeeOrigin,
                    filterRoster: this.coffeeRoster,
                    filterRoastIntensity: this.coffeeRoastIntensity
                })
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