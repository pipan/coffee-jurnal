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
                <div class="row row--center py-m" v-if="hasPreviousPage">
                    <button type="button" class="btn btn--secondary" @click="previousPage()">NEWER</button>
                </div>
                <CjJournal :items="itemsPaginated"
                    :display="displayMode"
                    @select="select($event)"
                    @delete="openDeletePrompt($event)"></CjJournal>
                <div class="row row--center py-m" v-if="hasNextPage">
                    <button type="button" class="btn btn--secondary" @click="nextPage()">OLDER</button>
                </div>
            </div>
        </div>
        <div class="fab-container">
            <router-link :to="{ name: 'Create' }" class="btn-fab user-select-disable" @contextmenu.prevent="openImport()">
                <i class="iconfont iconfont-plus text-l"></i>
            </router-link>
        </div>
        <transition name="animation--modal" :duration="300">
            <CjModal v-if="toDeleteId > 0" @close="closeDeletePrompt()">
                <h2 class="text-center text-danger">Delete</h2>
                <div class="pt-l pb-m">
                    Do you really want to permanently delete this journal entry?
                </div>
                <div class="row row--right gap-m">
                    <button type="button" class="btn btn--secondary" @click="closeDeletePrompt()">NO</button>
                    <button type="button" class="btn btn--primary" @click="deleteItem(toDeleteId)">YES</button>
                </div>
            </CjModal>
        </transition>
    </div>
</template>

<script>
import CjJournal from '../components/Journal.vue'
import CjModal from '../components/Modal.vue'
import { StaticBatchJob } from '../services/StaticBatckJob'

export default {
    name: 'HomeView',
    components: { CjJournal, CjModal },
    title: function () {
        return "Coffee Journal"
    },
    data: function () {
        return {
            perPageLimit: 30,
            itemsPaginated: [],
            scrollPosition: 0,
            toDeleteId: 0
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
            this.$router.push({ name: 'Import' })
        },
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
        select: function (id) {
            this.$router.push({
                name: 'Taste',
                params: { id }
            })
        },
        deleteItem: function(id) {
            this.$store.dispatch('deleteByIds', [id])
            this.closeDeletePrompt()
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
        },
        closeDeletePrompt: function () {
            this.toDeleteId = 0
        },
        openDeletePrompt: function (item) {
            this.toDeleteId = item.id
        }
    }
}
</script>
