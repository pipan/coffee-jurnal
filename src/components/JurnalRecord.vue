<template>
    <div class="record">
        <div class="record__label">{{ label }}</div>
        <div class="record__title">{{ item.coffeePlace }}</div>
        <div class="record__subtitle">{{ subtitle }}</div>
        <div class="record__profile">
            <div class="bar bar--y bar--intensity-1 bar--quality-1"></div>
            <div class="bar bar--y bar--intensity-2 bar--quality-2"></div>
            <div class="bar bar--y bar--intensity-3 bar--quality-3"></div>
            <div class="bar bar--y bar--intensity-4 bar--quality-4"></div>
            <div class="bar bar--y bar--intensity-5 bar--quality-5"></div>
        </div>
        <div class="record__rating">
            <span class="record__rating-value">4</span>
            <span class="record__rating-maximum">&nbsp;/&nbsp;5</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'JurnalRecord',
  components: {},
  props: {
      item: [Object],
  },
  computed: {
      subtitle: function() {
          const parts = []
          if (this.item.coffeeOrigin) {
              parts.push(this.item.coffeeOrigin)
          }
          if (this.item.coffeeRoster) {
              parts.push(this.item.coffeeRoster) 
          }
          return parts.join(', ')
      },
      label: function() {
          return this.item.coffeeType == 'espresso' ? 'E' : 'F'
      }
  },
  methods: {}
}
</script>