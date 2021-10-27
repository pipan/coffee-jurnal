<template>
    <div class="view">
        <div class="view-content">
            <header>
                <h1>Journal</h1>
            </header>
            <div class="jurnal">
                <JurnalDay v-for="agenda of timeline"
                    :key="agenda.day"
                    :agenda="agenda"
                    :checked="checked"
                    @select="select($event)"
                    @checkChange="checkChange($event)"></JurnalDay>
            </div>
            <div class="fab-container">
                <router-link :to="{ name: 'Create' }" class="btn-fab" v-if="isRouteMode">NEW</router-link>
                <button type="button" class="btn-fab btn-fab--entity" v-if="isCheckMode" @click="uncheckAll()">&Cross;</button>
                <button type="button" class="btn-fab btn-fab--danger" v-if="isCheckMode" @click="deleteSelected()">DELETE</button>
            </div>
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
            title: "Coffee Journal"
        }
    },
    data: function () {
        return {
            checked: []
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
        },
        mode: function () {
            if (this.checked.length > 0) {
                return 'check'
            }
            return 'route'
        },
        isCheckMode: function() {
            return this.mode === 'check'
        },
        isRouteMode: function() {
            return this.mode === 'route'
        }
    },
    methods: {
        checkChange: function (event) {
            let newValue = [...this.checked]
            if (event.value) {
                newValue.push(event.id)
            } else {
                const index = newValue.indexOf(event.id)
                if (index < 0) {
                    return
                }
                newValue.splice(index, 1)
            }
            this.checked = newValue
        },
        uncheckAll: function () {
            this.checked = []
        },
        select: function (id) {
            if (this.isCheckMode) {
                const value = this.checked.indexOf(id) === -1
                this.checkChange({ id, value })
                return
            }
            if (this.isRouteMode) {
                this.$router.push({
                    name: 'Taste',
                    params: { id }
                })
                return
            }
        },
        deleteSelected: function() {
            this.$store.dispatch('deleteByIds', this.checked)
            this.checked = []
        }
    }
}
</script>
