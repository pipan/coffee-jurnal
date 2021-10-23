<template>
    <form class="column flex-grow" @submit.prevent="submit()">
        <div class="form flex-grow">
            <ToggleSwitch :options="coffeeTypes" :value="coffeeType" @change="coffeeTypeValue = $event"></ToggleSwitch>
            <InputReference inputId="coffee-place"
                label="Coffee place"
                :options="coffeePlaceOptions"
                :value="coffeePlace"
                @change="coffeePlaceValue = $event"></InputReference>
            <InputReference inputId="coffee-origin"
                label="Coffee origin"
                :options="coffeeOriginOptions"
                :value="coffeeOrigin"
                @change="coffeeOriginValue = $event"></InputReference>
            <InputReference inputId="coffee-roster"
                label="Coffee roster"
                :options="coffeeRosterOptions"
                :value="coffeeRoster"
                @change="coffeeRosterValue = $event"></InputReference>
        </div>
        <div class="pt-m row row--center gap-m">
            <router-link :to="{ name: 'Home' }" class="btn btn--secondary">CANCEL</router-link>
            <button type="submit" class="btn btn--primary">SAVE</button>
        </div>
    </form>
</template>

<script>
import ToggleSwitch from "../components/ToggleSwitch.vue"
import InputReference from "../components/InputReference.vue"

export default {
    name: 'CoffeeDetailForm',
    components: { ToggleSwitch, InputReference },
    props: {
        item: {
            type: Object,
            default: () => {return {}}
        }
    },
    data: function () {
        return {
            coffeeTypeValue: undefined,
            coffeePlaceValue: undefined,
            coffeeOriginValue: undefined,
            coffeeRosterValue: undefined
        }
    },
    computed: {
        coffeeType: function () {
            if (this.coffeeTypeValue !== undefined) {
                return this.coffeeTypeValue
            }
            return this.item.coffeeType || this.coffeeTypes[0].id
        },
        coffeePlace: function () {
            if  (this.coffeePlaceValue !== undefined) {
                return this.coffeePlaceValue
            }
            return this.item.coffeePlace || ''
        },
        coffeeOrigin: function () {
            if (this.coffeeOriginValue !== undefined) {
                return this.coffeeOriginValue
            }
            return this.item.coffeeOrigin || ''
        },
        coffeeRoster: function () {
            if (this.coffeeRosterValue !== undefined) {
                return this.coffeeRosterValue
            }
            return this.item.coffeeRoster || ''
        },
        coffeeTypes: function() {
            return this.$store.state.coffeeTypes
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
        setCoffeeType: function (type) {
            this.coffeeType = type
        },
        submit: function () {
            this.$emit('submit', {
                coffeePlace: this.coffeePlace,
                coffeeOrigin: this.coffeeOrigin,
                coffeeRoster: this.coffeeRoster,
                coffeeType: this.coffeeType
            })
        }
    }
}
</script>
