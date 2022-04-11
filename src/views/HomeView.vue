<template>
    <div>
        <div class="view" v-screen-transform-origin="'50vw calc(50vh + {SCROLL_Y}px)'" ref="view">
            <div class="view-content">
                <header>
                    <h1>Journal</h1>
                    <div class="action action--no-padding">
                        <button type="button" class="btn btn--sircle animation-display-mode" :class="gridIconClass" @click="toggleDisplayMode()">
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
                <div class="row row--center py-m" v-if="hasPreviousPage">
                    <button type="button" class="btn btn--secondary" @click="previousPage()">NEWER</button>
                </div>
                <CjJournal :items="itemsPaginated"
                    :checked="checked"
                    :display="displayMode"
                    @select="select($event)"
                    @checkChange="checkChange($event)"></CjJournal>
                <div class="row row--center py-m" v-if="hasNextPage">
                    <button type="button" class="btn btn--secondary" @click="nextPage()">OLDER</button>
                </div>
            </div>
        </div>
        <div class="fab-container">
            <router-link :to="{ name: 'Create' }" class="btn-fab" v-if="isRouteMode">
                <i class="iconfont iconfont-plus text-l"></i>
            </router-link>
            <button type="button" class="btn-fab" v-if="isCheckMode" @click="uncheckAll()">
                <i class="iconfont iconfont-cross text-l"></i>
            </button>
            <button type="button" class="btn-fab btn-fab--danger" v-if="isCheckMode" @click="deleteSelected()">
                <i class="iconfont iconfont-bin text-l"></i>
            </button>
        </div>
    </div>
</template>

<script>
import CjJournal from '../components/Journal.vue'
import { StaticBatchJob } from '../services/StaticBatckJob'

export default {
    name: 'HomeView',
    components: { CjJournal },
    title: function () {
        return "Coffee Journal"
    },
    data: function () {
        return {
            checked: [],
            perPageLimit: 30,
            itemsPaginated: [],
            scrollPosition: 0
        }
    },
    computed: {
        items: function () {
            return this.$store.getters.chronologicalItems
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
        },
        currentPage: function () {
            return this.$route.query.page || 1
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
        setScrollPosition: function(event) {
            this.scrollPosition = event.target.scrollingElement.scrollTop
        },
        load: function () {
            const start = this.perPageLimit * (this.currentPage - 1)
            const end = start + this.perPageLimit
            this.itemsPaginated = []
            const job = new StaticBatchJob(this.items.slice(start, end), { size: 3 })
            job.forEach((batch) => {
                this.itemsPaginated = [...this.itemsPaginated, ...batch]
            })
        },
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