<template>
    <div class="modal-view" @click="outsideClick()">
        <div class="modal" @click="preventClosing = true">
            <h2 class="pb-m">Filters</h2>
            <div class="column gap-s">
                <SelectToggle :options="coffeeTypeOptions"
                    :value="coffeeType"
                    @change="coffeeTypeValue = $event"></SelectToggle>
                <SelectList inputId="coffee-place"
                    label="Coffee Place"
                    :options="coffeePlaceOptions"
                    :value="coffeePlace"
                    @change="coffeePlaceValue = $event"></SelectList>
                <SelectList inputId="coffee-origin"
                    label="Coffee Origin"
                    :options="coffeeOriginOptions"
                    :value="coffeeOrigin"
                    @change="coffeeOriginValue = $event"></SelectList>
                <SelectList inputId="coffee-roster"
                    label="Coffee Roster"
                    :options="coffeeRosterOptions"
                    :value="coffeeRoster"
                    @change="coffeeRosterValue = $event"></SelectList>
            </div>
            <div class="row gap-m row--right pt-m">
                <button type="button" class="btn btn--secondary" @click="close()">CANCEL</button>
                <button type="button" class="btn btn--primary" @click="apply()">APPLY</button>
            </div>
        </div>
    </div>
</template>

<script>
import SelectList from '../components/SelectList.vue'
import SelectToggle from '../components/SelectToggle.vue'

export default {
    name: 'FilterModal',
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
        coffeeTypes: function() {
            return this.$store.state.coffeeTypes
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
                    filterRoster: this.coffeeRoster
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
