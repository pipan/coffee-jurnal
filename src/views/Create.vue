<template>
  <div>
    <h1>New Cup</h1>
      <form class="column flex-grow" @submit.prevent="submit()">
        <div class="form flex-grow">
          <ToggleSwitch :options="coffeeTypes" :value="coffeeType" @change="setCoffeeType($event)"></ToggleSwitch>
          <InputReference inputId="coffee-place"
            label="Coffee place"
            :options="coffeePlaceOptions"
            :value="coffeePlace"
            @change="coffeePlace = $event"></InputReference>
          <InputReference inputId="coffee-origin"
            label="Coffee origin"
            :options="coffeeOriginOptions"
            :value="coffeeOrigin"
            @change="coffeeOrigin = $event"></InputReference>
          <InputReference inputId="coffee-roster"
            label="Coffee roster"
            :options="coffeeRosterOptions"
            :value="coffeeRoster"
            @change="coffeeRoster = $event"></InputReference>
        </div>
        <div class="pt-m row row--center gap-m">
          <router-link :to="{ name: 'Home' }" class="btn btn--secondary">Cancel</router-link>
          <button type="submit" class="btn btn--primary">Save</button>
        </div>
      </form>
  </div>
</template>

<script>
import ToggleSwitch from "../components/ToggleSwitch.vue"
import InputReference from "../components/InputReference.vue"

export default {
    name: 'Create',
    components: { ToggleSwitch, InputReference },
    data: function () {
        return {
            coffeeType: {},
            coffeePlace: '',
            coffeeOrigin: '',
            coffeeRoster: ''
        }
    },
    computed: {
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
    created: function () {
        this.setCoffeeType(this.coffeeTypes[0])
    },
    methods: {
        setCoffeeType: function (type) {
            this.coffeeType = type
        },
        submit: function () {
            this.$store.dispatch('createNewCup', {
                coffeePlace: this.coffeePlace,
                coffeeOrigin: this.coffeeOrigin,
                coffeeRoster: this.coffeeRoster,
                coffeeType: this.coffeeType.id
            }).then((item) => {
                this.$router.push({
                    name: 'Taste',
                    params: {
                        id: item.id
                    }  
                })
            })
        }
    }
}
</script>
