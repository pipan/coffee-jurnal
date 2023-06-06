<template>
    <div class="jurnal" :class="displayClass">
        <transition-group name="animation--day-records" :duration="{enter: 400, leave: 200}">
            <JurnalDay v-for="agenda of timeline"
                :key="agenda.id"
                :agenda="agenda"
                @select="select($event)"
                @delete="$emit('delete', $event)"></JurnalDay>
        </transition-group>
    </div>
</template>

<script>
import JurnalDay from '../components/JurnalDay.vue'

export default {
    name: 'CjJournal',
    components: { JurnalDay },
    props: {
        items: {
            type: Array,
            default: () => []
        },
        display: {
            type: String,
            default: 'list'
        },
        page: {
            type: Number,
            default: 1
        }
    },
    computed: {
        timeline: function () {
            const result = []
            let previousDayIndex = ''
            let dayItems = []
            for (const item of this.items) {
                const day = [item.created_at.getFullYear(), item.created_at.getMonth() + 1, item.created_at.getDate()]
                let dayIndex = day.join('-')
                if (dayIndex != previousDayIndex && dayItems.length > 0) {
                    result.push({
                        id: `${this.page}-${previousDayIndex}`,
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
                    id: `${this.page}-${previousDayIndex}`,
                    day: previousDayIndex,
                    items: dayItems
                })
            }
            return result
        },
        displayClass: function () {
            if (this.display === 'list') {
                return 'journal--list'
            }
            return 'journal--grid'
        }
    },
    methods: {
        select: function (id) {
            this.$emit('select', id)
        }
    }
}
</script>
