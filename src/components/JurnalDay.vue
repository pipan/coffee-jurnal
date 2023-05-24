<template>
    <div class="jurnal__day">
        <h2 class="jurnal__day-title pb-m">{{ title }}</h2>
        <div class="jurnal__day-records">
            <JurnalRecord v-for="item of agenda.items"
                :key="item.id"
                :item="item"
                @select="select($event)"
                @delete="$emit('delete', $event)"></JurnalRecord>
        </div>
    </div>
</template>

<script>
import JurnalRecord from './JurnalRecord.vue'

export default {
    name: 'JurnalDay',
    components: { JurnalRecord },
    props: {
        agenda: [Object]
    },
    data: function () {
        return {
            millisecondsPerDay: 24 * 60 * 60 * 1000,
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    },
    computed: {
        dayDate: function() {
            return new Date(this.agenda.day)
        },
        millisecondsDiff: function () {
            const now = new Date()
            now.setHours(23)
            now.setMinutes(59)
            now.setSeconds(59)
            now.setMilliseconds(0)
            return now.getTime() - this.dayDate.getTime()
        },
        title: function() {
            if (this.isToday()) {
                return "Today"
            }
            if (this.isYesterday()) {
                return "Yesterday"
            }
            if (this.isMaxWeekAgo()) {
                const dayIndex = this.dayDate.getDay()
                return this.dayNames[dayIndex]
            }
            if (this.dayDate.getFullYear() < new Date().getFullYear()) {
                return this.dayDate.toLocaleDateString(navigator.language, { day: '2-digit', month: 'short', year: 'numeric' })
            }
            return this.dayDate.toLocaleDateString(navigator.language, { day: '2-digit', month: 'short' })
        },
    },
    methods: {
        isToday: function () {
            return this.millisecondsDiff < this.millisecondsPerDay
        },
        isYesterday: function () {
            return !this.isToday() && this.millisecondsDiff < 2 * this.millisecondsPerDay
        },
        isMaxWeekAgo: function () {
            return this.millisecondsDiff < 7 * this.millisecondsPerDay
        },
        select: function (id) {
            this.$emit('select', id)
        }
    }
}
</script>