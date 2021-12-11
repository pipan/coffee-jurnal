<template>
    <div>
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>Stats</h1>
                    <a :href="exportUrlData" download="coffeejournal_export.json" class="action btn btn--primary">EXPORT</a>
                </header>
                <div class="row gap-s pb-m scroll-x">
                    <button type="button" class="tag tag--active"
                        v-for="(filter, index) of filtersList"
                        :key="index"
                        @click="removeFilter(filter.type, filter.name)">{{ filter.name }}</button>
                </div>
                <div class="column gap-m">
                    <div class="row gap-s row--around row--wrap">
                        <IntensityComposition :dataset="dataset"></IntensityComposition>
                        <QualityComposition :dataset="dataset"></QualityComposition>
                        <RatingComposition :dataset="dataset"></RatingComposition>
                    </div>
                    <RatingTimeline :dataset="dataset"></RatingTimeline>
                    <RankList :dataset="dataset" @select="addFilter(mapToFilterType($event.type), $event.name)"></RankList>
                    <VisitList :dataset="dataset" @select="addFilter(mapToFilterType($event.type), $event.name)"></VisitList>
                    
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
        <transition name="animation--fade">
            <router-view />
        </transition>
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
            const result = []
            for (const item of this.items) {
                if (this.passesFilters(item)) {
                    result.push(item)
                }
            }
            return result
        },
        journalItems: function () {
            return this.dataset.slice(0, 30)
        },
        filters: function () {
            return {
                filterType: this.normQueryFilter(this.$route.query.filterType),
                filterPlace: this.normQueryFilter(this.$route.query.filterPlace),
                filterOrigin: this.normQueryFilter(this.$route.query.filterOrigin),
                filterRoster: this.normQueryFilter(this.$route.query.filterRoster)
            }
        },
        filtersList: function () {
            const keys = ['filterType', 'filterPlace', 'filterOrigin', 'filterRoster']
            const result = []
            for (const key of keys) {
                for (const filter of this.filters[key])
                result.push({
                    name: filter,
                    type: key
                })
            }
            return result
        },
        displayMode: function () {
            return this.$store.state.displayMode
        },
        exportUrlData: function () {
            return URL.createObjectURL(new Blob([JSON.stringify(this.dataset)], {
                type: 'text/plain'
            }))
        }
    },
    methods: {
        normQueryFilter: function (queryValue) {
            if (queryValue === undefined) {
                return []
            }
            if (typeof queryValue == 'string') {
                return [queryValue]
            }
            return queryValue
        },
        removeFilter: function (filterType, value) {
            const index = this.filters[filterType].indexOf(value)
            if (index === -1) {
                return
            }
            const cloneFilter = [...this.filters[filterType]]
            cloneFilter.splice(index, 1)
            let filterQuery = {}
            filterQuery[filterType] = cloneFilter
            const query = Object.assign({}, this.$route.query, filterQuery)
            this.$router.replace({
                name: 'Stats',
                query: query
            })
        },
        addFilter: function (filterType, value) {
            const index = this.filters[filterType].indexOf(value)
            if (index > -1) {
                return
            }
            const cloneFilter = [...this.filters[filterType]]
            cloneFilter.push(value)
            let filterQuery = {}
            filterQuery[filterType] = cloneFilter
            const query = Object.assign({}, this.$route.query, filterQuery)
            this.$router.replace({
                name: 'Stats',
                query: query
            })
        },
        passesFilters: function (item) {
            if (this.filters.filterType.length > 0 && this.filters.filterType.indexOf(item.coffeeType) === -1) {
                return false
            }
            if (this.filters.filterPlace.length > 0 && this.filters.filterPlace.indexOf(item.coffeePlace) === -1) {
                return false
            }
            if (this.filters.filterOrigin.length > 0 && this.filters.filterOrigin.indexOf(item.coffeeOrigin) === -1) {
                return false
            }
            if (this.filters.filterRoster.length > 0 && this.filters.filterRoster.indexOf(item.coffeeRoster) === -1) {
                return false
            }
            return true
        },
        mapToFilterType: function (type) {
            const map = {
                coffeeType: 'filterType',
                coffeePlace: 'filterPlace',
                coffeeOrigin: 'filterOrigin',
                coffeeRoster: 'filterRoster'
            }
            return map[type]
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
