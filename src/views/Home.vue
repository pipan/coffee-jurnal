<template>
  <div>
    <h1>Coffee Jurnal</h1>
    <div class="jurnal">
        <JurnalDay v-for="agenda of timeline"
            :key="agenda.day"
            :agenda="agenda"></JurnalDay>
    </div>
    <router-link :to="{ name: 'Create' }" class="btn-fab">&plus;</router-link>
  </div>
</template>

<script>
import JurnalDay from '../components/JurnalDay.vue'

export default {
  name: 'Home',
  components: { JurnalDay },
  computed: {
    items: function () {
        return this.$store.getters.items
    },
    timeline: function () {
        const result = []
        let previousDayIndex = ''
        let dayItems = []
        for (const item of this.items) {
            const day = [item.created_at.getFullYear(), item.created_at.getMonth() + 1, item.created_at.getDate()]
            const dayIndex = day.join('-')
            if (dayIndex != previousDayIndex && dayItems.length > 0) {
                result.push({
                    day: dayIndex,
                    items: dayItems
                })
                dayItems = []
            }
            dayItems.push(item)
            previousDayIndex = dayIndex
        }
        if (dayItems.length > 0) {
            result.push({
                day: previousDayIndex,
                items: dayItems
            })
        }
        return result
    }
  }
}
</script>
