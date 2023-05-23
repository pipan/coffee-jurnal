<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <NotFound v-if="!item"></NotFound>
                <div class="column flex-grow gap-m pos-r" v-if="item">
                    <CoffeeDetail class="pt-s" :coffee="item" @edit="openEdit()"></CoffeeDetail>
                    <ProfileGraph class="py-l" :propertyRatings="this.item.propertyRatings" @change="changeProperties($event)"></ProfileGraph>
                    <div class="flex-grow">
                        <div class="text-center text-l">{{ item.rating === -1 ? '-' : item.rating }}<span class="text-secondary"> / 5</span></div>
                        <RatingInput :value="item.rating" @change="changeRating($event)"></RatingInput>
                    </div>
                    <div class="text-secondary text-light py-m text-center px-l text-s">This rating is base on <a href="https://www.scribd.com/document/421556406/Prufrock-Coffee-Tasting-Guide" target="_blank">prufrock coffee tasting guide</a></div>
                    <div class="profiles">
                        <ProfileInput :value="item.profile" @change="changeProfile($event)"></ProfileInput>
                    </div>
                    <div class="row row--center">
                        <div class="btn-thumb" @click="back()">
                            <i class="iconfont iconfont-cross text-l"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RatingInput from '../components/RatingInput.vue'
import ProfileInput from '../components/ProfileInput.vue'
import NotFound from './NotFound.vue'
import CoffeeDetail from '../components/CoffeeDetail.vue'
import ProfileGraph from '../components/ProfileGraph.vue'

export default {
    name: 'TasteView',
    components: { RatingInput, NotFound, CoffeeDetail, ProfileGraph, ProfileInput },
    data: function () {
        return {
            profileValue: undefined,
            initialValue: {
                quality: 0.5,
                intensity: 0.5
            }
        }
    },
    title: function () {
        return "Tasting | CJ"
    },
    computed: {
        item: function () {
            return this.$store.getters.item(this.$route.params.id)
        },
        profile: function () {
            if (this.profileValue !== undefined) {
                return this.profileValue
            }
            return this.item.profile || []
        }
    },
    methods: {
        changeProperties: function (properties) {
            this.$store.dispatch('cupTasting', {
                id: this.item.id,
                propertyRatings: properties,
                profile: this.item.profile,
                rating: this.item.rating
            })
        },
        changeRating: function (value) {
            this.$store.dispatch('cupTasting', {
                id: this.item.id,
                propertyRatings: this.item.propertyRatings,
                profile: this.item.profile,
                rating: value
            })
        },
        changeProfile: function (value) {
            this.$store.dispatch('cupTasting', {
                id: this.item.id,
                propertyRatings: this.item.propertyRatings,
                profile: value,
                rating: this.item.rating
            })
        },
        openEdit: function () {
            this.$router.push({
                name: 'Edit',
                params: { id: this.item.id },
                query: this.$route.query 
            })
        },
        back: function () {
            if (window.history.length <= 1) {
                return this.$router.push({ name: 'Home' })
            }
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.profiles {
    position: absolute;
    right: 0px;
    top: 80px;
}
</style>
