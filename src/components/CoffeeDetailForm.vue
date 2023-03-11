<template>
    <form class="column flex-grow" @submit.prevent="submit()">
        <div class="form flex-grow">
            <InlineInput label="Method">
                <ToggleSwitch :options="coffeeTypes" :value="coffeeType" @change="coffeeTypeValue = $event"></ToggleSwitch>
            </InlineInput>
            <InlineInput label="Intensity">
                <ToggleSwitch :options="coffeeRoastIntensities" :value="coffeeRoastIntensity" @change="coffeeRoastIntensityValue = $event" :nullable="true"></ToggleSwitch>
            </InlineInput>
            <InlineInput label="Processing">
                <ToggleSwitch :options="coffeeProcessings" :value="coffeeProcessing" @change="coffeeProcessingValue = $event" :nullable="true"></ToggleSwitch>
            </InlineInput>
            
            <InputReference inputId="coffee-place"
                label="Place"
                placeholder="place"
                :options="coffeePlaceOptions"
                :value="coffeePlace"
                @change="coffeePlaceValue = $event"></InputReference>
            <InputReference inputId="coffee-origin"
                label="Origin"
                placeholder="origin"
                :options="coffeeOriginOptions"
                :value="coffeeOrigin"
                @change="coffeeOriginValue = $event"></InputReference>
            <InlineInput label="Region">
                <input class="input-simple" :class="{'input-simple--active': coffeeRegion}" type="text"
                    autocomplete="off"
                    :value="coffeeRegion"
                    placeholder="region"
                    @input="coffeeRegionValue = $event.target.value" />
            </InlineInput>
            <InputReference inputId="coffee-roaster"
                label="Roaster"
                placeholder="roaster"
                :options="coffeeRoasterOptions"
                :value="coffeeRoaster"
                @change="coffeeRoasterValue = $event"></InputReference>
            
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
import InlineInput from "../components/InlineInput.vue"

export default {
    name: 'CoffeeDetailForm',
    components: { ToggleSwitch, InputReference, InlineInput },
    inheritAttrs: false,
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
            coffeeRegionValue: undefined,
            coffeeRoasterValue: undefined,
            coffeeRoastIntensityValue: undefined,
            coffeeProcessingValue: undefined
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
        coffeeRegion: function () {
            if (this.coffeeRegionValue !== undefined) {
                return this.coffeeRegionValue
            }
            return this.item.coffeeRegion || ''
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
            return this.item.coffeeRoastIntensity || ''
        },
        coffeeProcessing: function () {
            if (this.coffeeProcessingValue !== undefined) {
                return this.coffeeProcessingValue
            }
            return this.item.coffeeProcessing || ''
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
        },
        coffeeProcessings: function() {
            return this.$store.state.coffeeProcessings
        }
    },
    methods: {
        setCoffeeType: function (type) {
            this.coffeeType = type
        },
        getValue: function() {
            return {
                coffeePlace: this.coffeePlace,
                coffeeOrigin: this.coffeeOrigin,
                coffeeRegion: this.coffeeRegion,
                coffeeRoaster: this.coffeeRoaster,
                coffeeType: this.coffeeType,
                coffeeRoastIntensity: this.coffeeRoastIntensity,
                coffeeProcessing: this.coffeeProcessing
            }
        },
        submit: function () {
            this.$emit('submit', this.getValue())
        },
        back: function () {
            if (window.history.length <= 1) {
                return this.$router.push({ name: 'Home' })
            }
            this.$router.go(-1)
        },
        patch: function (data) {
            this.coffeeTypeValue = data.coffeeType || this.coffeeTypeValue
            this.coffeeOriginValue = data.coffeeOrigin || this.coffeeOriginValue
            this.coffeeRegionValue = data.coffeeRegion || this.coffeeRegionValue
            this.coffeeRoasterValue = data.coffeeRoaster || this.coffeeRoasterValue
            this.coffeeRoastIntensityValue = data.coffeeRoastIntensity || this.coffeeRoastIntensityValue
            this.coffeeProcessingValue = data.coffeeProcessing || this.coffeeProcessingValue
        }
    }
}
</script>
