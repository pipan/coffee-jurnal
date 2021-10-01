<template>
  <div>
    <h1>New Cup</h1>
      <div class="form flex-grow">
        <ToggleSwitch :options="coffeeTypes" :value="coffeeType" @change="setCoffeeType($event)"></ToggleSwitch>
        <InputReference inputId="coffee-place"
          label="Coffee place"
          :options="[]"
          value=""></InputReference>
        <InputReference inputId="coffee-origin"
          label="Coffee origin"
          :options="[]"
          value=""></InputReference>
        <InputReference inputId="coffee-roster"
          label="Coffee roster"
          :options="[]"
          value=""></InputReference>
      </div>
      <div class="pt-m row row--center gap-m">
        <router-link :to="{ name: 'Home' }" class="btn btn--secondary">Cancel</router-link>
        <button type="submit" class="btn btn--primary">Save</button>
      </div>
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
          id: 1,
          name: 'Filter'
        },
        {
          id: 2,
          name: 'Espresso'
        }
      ],
      coffeeType: {}
    }
  },
  created: function () {
    this.setCoffeeType(this.coffeeTypes[0])
  },
  methods: {
    setCoffeeType: function (type) {
      this.coffeeType = type
    }
  }
}
</script>
