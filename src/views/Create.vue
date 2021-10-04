<template>
  <div>
    <h1>New Cup</h1>
      <form @submit.prevent="submit()">
        <div class="form flex-grow">
          <ToggleSwitch :options="coffeeTypes" :value="coffeeType" @change="setCoffeeType($event)"></ToggleSwitch>
          <InputReference inputId="coffee-place"
            label="Coffee place"
            :options="[]"
            :value="coffeePlace"
            @change="coffeePlace = $event"></InputReference>
          <InputReference inputId="coffee-origin"
            label="Coffee origin"
            :options="[]"
            :value="coffeeOrigin"
            @change="coffeeOrigin = $event"></InputReference>
          <InputReference inputId="coffee-roster"
            label="Coffee roster"
            :options="[]"
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
      coffeeTypes: [
        {
          id: 'filter',
          name: 'Filter'
        },
        {
          id: 'espresso',
          name: 'Espresso'
        }
      ],
      coffeeType: {},
      coffeePlace: '',
      coffeeOrigin: '',
      coffeeRoster: ''
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
      })
    }
  }
}
</script>
