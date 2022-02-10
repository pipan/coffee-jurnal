<template>
    <div>
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>Stats</h1>
                    <a :href="exportUrlData" download="coffeejournal_export.json" class="action btn btn--primary">EXPORT</a>
                </header>
                <div class="row gap-s scroll-x" v-if="filtersList.length > 0">
                    <button type="button" class="tag tag--active"
                        v-for="(filter, index) of filtersList"
                        :key="index"
                        @click="removeFilter(index)">{{ filter.value }}</button>
                </div>
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
            <router-link :to="{ name: 'Filter', query: $route.query }" class="btn-fab">FILTERS</router-link>
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
import { CoffeeFilter } from '../filters/CoffeeFilter.js'

export default {
    name: 'Stats',
    components: { QualityComposition, IntensityComposition, RatingComposition, RatingTimeline, RankList, VisitList, Journal },
    metaInfo: function () {
        return {
            title: "Stats | CJ"
        }
    },
    computed: {
        items: function () {
            return this.$store.getters.chronologicalItems
        },
        hasData: function() {
            return this.dataset.length > 0
        },
        dataset: function () {
            return this.filter.filter(this.items)
        },
        journalItems: function () {
            return this.dataset.slice(0, 30)
        },
        filter: function () {
            return CoffeeFilter.fromQuery(this.$route.query)
        },
        filterParamsAdapter: function () {
            return CoffeeFilter.adapter()
        },
        filtersList: function () {
            return this.filterParamsAdapter.toList(this.$route.query)
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
        removeFilter: function (index) {
            let newFilterList = [...this.filtersList]
            newFilterList.splice(index, 1)
            const newQuery = this.filterParamsAdapter.toObject(newFilterList)
            const query = Object.assign({}, this.$route.query, newQuery)
            this.$router.replace({
                name: 'Stats',
                query: query
            })
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
    }
}
</script>
