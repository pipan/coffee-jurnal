<template>
    <div class="view">
        <div class="view-content">
            <header>
                <h1>Journal</h1>
            </header>
            <div class="jurnal">
                <JurnalDay v-for="agenda of timeline"
                    :key="agenda.day"
                    :agenda="agenda"></JurnalDay>
            </div>
            <router-link :to="{ name: 'Create' }" class="btn-fab">NEW</router-link>
        </div>
    </div>
</template>

<script>
import JurnalDay from '../components/JurnalDay.vue'

export default {
    name: 'Home',
    components: { JurnalDay },
    metaInfo: function () {
        return {
            title: "Coffee Jurnal"
        }
    },
    computed: {
        items: function () {
            return this.$store.getters.chronologicalItems
        },
        timeline: function () {
            const result = []
            let previousDayIndex = ''
            let dayItems = []
            for (const item of this.items) {
                const day = [item.created_at.getFullYear(), item.created_at.getMonth() + 1, item.created_at.getDate()]
                let dayIndex = day.join('-')
                if (dayIndex != previousDayIndex && dayItems.length > 0) {
                    result.push({
                        day: previousDayIndex,
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
