<template>
    <div>
        <div class="view" v-screen-transform-origin="'50vw calc(50vh + {SCROLL_Y}px)'">
            <div class="view-content">
                <header>
                    <h1>Stats</h1>
                    <a :href="exportUrlData" download="coffeejournal_export.json" class="action btn btn--primary">EXPORT</a>
                </header>
                <MultiToggleSwitch v-if="filtersValueList.length > 0"
                    :nullable="true"
                    :options="filtersList"
                    :value="filtersValueList"
                    @change="setFilters($event)"></MultiToggleSwitch>
                <div class="column gap-m">
                    <div class="row gap-s row--around row--wrap">
                        <IntensityComposition :dataset="dataset"></IntensityComposition>
                        <QualityComposition :dataset="dataset"></QualityComposition>
                        <RatingComposition :dataset="dataset"></RatingComposition>
                    </div>
                    <RatingTimeline :dataset="dataset"></RatingTimeline>
                    <RankList :dataset="dataset" @select="addFilter($event.type, $event.name)"></RankList>
                    <VisitList :dataset="dataset" @select="addFilter($event.type, $event.name)"></VisitList>
                    
                    <Journal :items="journalItems"
                        :withCheckbox="false"
                        :display="displayMode"
                        @select="selectRecord($event)"></Journal>
                    <div class="py-s text-secondary text-center text-light" v-if="dataset.length > journalItems.length">Showing last {{ journalItems.length }} items out of {{ dataset.length }}</div>
                </div>
            </div>
        </div>
        <div class="fab-container">
            <router-link :to="{ name: 'Filter', query: $route.query }" class="btn-fab">
                <img class="icon icon--l" src="/img/assets/filter_icon.svg" />
            </router-link>
        </div>
    </div>
</template>

<script>
import RankList from '../components/RankList.vue'
import VisitList from '../components/VisitList.vue'
import RatingComposition from '../components/RatingComposition.vue'
import IntensityComposition from '../components/IntensityComposition.vue'
import QualityComposition from '../components/QualityComposition.vue'
import RatingTimeline from '../components/RatingTimeline.vue'
import Journal from '../components/Journal.vue'
import MultiToggleSwitch from '../components/MultiToggleSwitch.vue'
import { CoffeeFilter } from '../filters/CoffeeFilter.js'
import { BatchJob } from '../services/BatchJob'

export default {
    name: 'Stats',
    components: { QualityComposition, IntensityComposition, RatingComposition, RatingTimeline, RankList, VisitList, Journal, MultiToggleSwitch },
    metaInfo: function () {
        return {
            title: "Stats | CJ"
        }
    },
    data: function () {
        return {
            filterParamsAdapter: CoffeeFilter.adapter(),
            dataset: []
        }
    },
    computed: {
        items: function () {
            return this.$store.getters.chronologicalItems
        },
        hasData: function() {
            return this.dataset.length > 0
        },
        journalItems: function () {
            return this.dataset.slice(0, 30)
        },
        filter: function () {
            return CoffeeFilter.fromQuery(this.$route.query)
        },
        filtersList: function () {
            const list = this.filterParamsAdapter.toList(this.$route.query)
            for (const item of list) {
                item.name = item.value
            }
            return list
        },
        filtersValueList: function () {
            let values = []
            for (const filter of this.filtersList) {
                values.push(filter.id)
            }
            return values
        },
        displayMode: function () {
            return this.$store.state.displayMode
        },
        exportUrlData: function () {
            return URL.createObjectURL(new Blob([JSON.stringify(this.dataset)], {
                type: 'application/json'
            }))
        }
    },
    methods: {
        setFilters: function (ids) {
            let newFilterList = []
            for (const filter of this.filtersList) {
                if (ids.indexOf(filter.id) === -1) {
                    continue
                }
                newFilterList.push(filter)
            }
            this.updateFiltersQuery(newFilterList)
        },
        addFilter: function (type, value) {
            for (const item of this.filtersList) {
                if (item.type == type && item.value == value) {
                    return
                }
            }
            let newFilterList = [...this.filtersList]
            newFilterList.push({
                type: type,
                value: value
            })
            this.updateFiltersQuery(newFilterList)
        },
        updateFiltersQuery: function (newFilterList) {
            const newQuery = this.filterParamsAdapter.toObject(newFilterList)
            const query = Object.assign({}, this.$route.query, newQuery)
            this.$router.replace({
                name: 'Stats',
                query: query
            })
        },
        selectRecord: function (id) {
            this.$router.push({
                name: 'Taste',
                params: { id }
            })
        },
    },
    watch: {
        items: {
            immediate: true,
            handler: function (val) {
                this.dataset = []
                const job = new BatchJob(val, { busyLimit: 30, sleepTime: 20 })
                job.forEach((items) => {
                    const filtered = this.filter.filter(items)
                    this.dataset = [...this.dataset, ...filtered]
                })
            }
        }
    }
}
</script>
