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
            <InputReference inputId="coffee-roaster"
                label="Coffee roaster"
                :options="coffeeRoasterOptions"
                :value="coffeeRoaster"
                @change="coffeeRoasterValue = $event"></InputReference>
            <ToggleSwitch :options="coffeeRoastIntensities" :value="coffeeRoastIntensity" @change="coffeeRoastIntensityValue = $event"></ToggleSwitch>
        </div>
        <div class="pt-m row row--center gap-m">
            <button type="button" class="btn btn--secondary" @click="back()">CANCEL</button>
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
            coffeeRoasterValue: undefined,
            coffeeRoastIntensityValue: undefined
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
        coffeeRoaster: function () {
            if (this.coffeeRoasterValue !== undefined) {
                return this.coffeeRoasterValue
            }
            return this.item.coffeeRoaster || ''
        },
        coffeeRoastIntensity: function () {
            if (this.coffeeRoastIntensityValue !== undefined) {
                return this.coffeeRoastIntensityValue
            }
            if (this.item.id) {
                return this.item.coffeeRoastIntensity || ''
            }
            return this.coffeeRoastIntensities[0].id
        },
        coffeeRoastIntensities: function() {
            return this.$store.state.coffeeRoastIntensities
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
        coffeeRoasterOptions: function() {
            return this.$store.getters.coffeeRoasterOptions
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
                coffeeRoaster: this.coffeeRoaster,
                coffeeType: this.coffeeType,
                coffeeRoastIntensity: this.coffeeRoastIntensity
            })
        },
        back: function () {
            if (window.history.length === 0) {
                return this.$router.push({ name: 'Home' })
            }
            this.$router.go(-1)
        }
    }
}
</script>
