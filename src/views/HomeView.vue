<template>
    <div>
        <div class="view" v-screen-transform-origin="'50vw calc(50vh + {SCROLL_Y}px)'" ref="view">
            <div class="view-content">
                <header>
                    <h1>Journal</h1>
                    <div class="action action--no-padding">
                        <button type="button" class="btn btn--circle animation-display-mode" :class="gridIconClass" @click="toggleDisplayMode()">
                            <svg class="icon icon--m" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <rect fill="#fff" x="0" y="0" width="30%" height="30%" class="svg-1" />
                                    <rect fill="#fff" x="0" y="0" width="30%" height="30%" class="svg-2" />
                                    <rect fill="#fff" x="0" y="0" width="30%" height="30%" class="svg-3" />
                                    <rect fill="#fff" x="0" y="0" width="30%" height="30%" class="svg-4" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </header>
                <CjJournal :items="itemsPaginated"
                    :display="displayMode"
                    :page="currentPage"
                    @select="select($event)"></CjJournal>
                <div class="row row--center gap-l py-m" v-if="hasNextPage || hasPreviousPage">
                    <button type="button" class="btn btn--secondary" v-if="hasPreviousPage" @click="previousPage()">NEWER</button>
                    <button type="button" class="btn btn--secondary" v-if="hasNextPage" @click="nextPage()">OLDER</button>
                </div>
            </div>
        </div>
        <div class="fab-container">
            <router-link :to="{ name: 'Create', query: $route.query }" class="btn-fab user-select-disable" @contextmenu.prevent="openImport()">
                <i class="iconfont iconfont-plus text-l"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import CjJournal from '../components/Journal.vue'

export default {
    name: 'HomeView',
    components: { CjJournal },
    title: function () {
        return "Coffee Journal"
    },
    data: function () {
        return {
            perPageLimit: 30,
            itemsPaginated: [],
            scrollPosition: 0
        }
    },
    computed: {
        items: function () {
            return this.$store.getters.chronologicalItems
        },
        currentPage: function () {
            return parseInt(this.$route.query.page || "1")
        },
        hasNextPage: function () {
            return this.items.length > this.perPageLimit * this.currentPage
        },
        hasPreviousPage: function () {
            return this.currentPage > 1
        },
        displayMode: function () {
            return this.$store.state.displayMode || 'grid'
        },
        isDisplayModeList: function () {
            return this.displayMode == 'list'
        },
        isDisplayModeGrid: function () {
            return this.displayMode == 'grid'
        },
        gridIconClass: function () {
            return this.isDisplayModeList ? 'animation-display-mode--grid' : 'animation-display-mode--list'
        }
    },
    watch: {
        currentPage: function () {
            this.load()
        },
        items: {
            immediate: true,
            handler: function () {
                this.load()
            }
        }
    },
    activated: function () {
        window.scrollTo(0, this.scrollPosition)
        window.addEventListener('scroll', this.setScrollPosition)
    },
    deactivated: function () {
        window.removeEventListener('scroll', this.setScrollPosition)
        this.$refs.view.scrollTo(0, this.scrollPosition)
    },
    methods: {
        openImport: function () {
            this.$router.push({ name: 'Import', query: this.$route.query })
        },
        setScrollPosition: function(event) {
            this.scrollPosition = event.target.scrollingElement.scrollTop
        },
        load: function () {
            const start = this.perPageLimit * (this.currentPage - 1)
            const end = start + this.perPageLimit
            this.itemsPaginated = this.items.slice(start, end)
        },
        select: function (id) {
            this.$router.push({
                name: 'Taste',
                params: { id },
                query: this.$route.query
            })
        },
        goToPage: function (page) {
            this.$router.push({
                name: 'Home',
                query: {
                    page: page
                }
            })
        },
        nextPage: function () {
            this.goToPage(this.currentPage + 1)
        },
        previousPage: function () {
            this.goToPage(this.currentPage - 1)
        },
        setDisplayMode: function (value) {
            this.$store.commit('setDisplayMode', value)
        },
        toggleDisplayMode: function () {
            this.setDisplayMode(this.isDisplayModeList ? 'grid' : 'list')
        }
    }
}
</script>
