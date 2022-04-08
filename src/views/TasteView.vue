<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <NotFound v-if="!item"></NotFound>
                <div class="column flex-grow gap-m" v-if="item">
                    <header>
                        <h1>Tasting</h1>
                        <router-link :to="{ name: 'Edit', params: { id: item.id } }" class="action btn btn--primary">DETAIL</router-link>
                    </header>
                    <form class="column flex-grow" @submit.prevent="submit()">
                        <div class="form flex-grow">
                            <PropertyRatingInput label="Aroma"
                                :value="aroma"
                                @change="aromaValue = $event"></PropertyRatingInput>
                            <PropertyRatingInput label="Acidity"
                                :value="acidity"
                                @change="acidityValue = $event"></PropertyRatingInput>
                            <PropertyRatingInput label="Sweetness"
                                :value="sweetness"
                                @change="sweetnessValue = $event"></PropertyRatingInput>
                            <PropertyRatingInput label="Body"
                                :value="body"
                                @change="bodyValue = $event"></PropertyRatingInput>
                            <PropertyRatingInput label="Finish"
                                :value="finish"
                                @change="finishValue = $event"></PropertyRatingInput>
                            <ProfileInput :value="profile" @change="profileValue = $event"></ProfileInput>
                            <RatingInput :value="rating" @change="ratingValue = $event"></RatingInput>
                        </div>
                        <div class="text-secondary text-light py-m text-center">This rating is base on <a href="https://www.scribd.com/document/421556406/Prufrock-Coffee-Tasting-Guide" target="_blank">prufrock coffee tasting guide</a></div>
                        <div class="pt-m row row--center gap-m">
                            <button type="button" class="btn btn--secondary" @click="back()">CANCEL</button>
                            <button type="submit" class="btn btn--primary">SAVE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PropertyRatingInput from '../components/PropertyRatingInput.vue'
import RatingInput from '../components/RatingInput.vue'
import ProfileInput from '../components/ProfileInput.vue'
import NotFound from './NotFound.vue'

export default {
    name: 'TasteView',
    components: { PropertyRatingInput, RatingInput, NotFound, ProfileInput },
    data: function () {
        return {
            aromaValue: {},
            acidityValue: {},
            sweetnessValue: {},
            bodyValue: {},
            finishValue: {},
            ratingValue: -1,
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
        aroma: function () {
            return Object.assign({}, this.initialValue, this.item.propertyRatings.aroma, this.aromaValue)
        },
        acidity: function () {
            return Object.assign({}, this.initialValue, this.item.propertyRatings.acidity, this.acidityValue)
        },
        sweetness: function () {
            return Object.assign({}, this.initialValue, this.item.propertyRatings.sweetness, this.sweetnessValue)
        },
        body: function () {
            return Object.assign({}, this.initialValue, this.item.propertyRatings.body, this.bodyValue)
        },
        finish: function () {
            return Object.assign({}, this.initialValue, this.item.propertyRatings.finish, this.finishValue)
        },
        rating: function () {
            if (this.ratingValue > -1) {
                return this.ratingValue
            }
            return this.item.rating
        },
        profile: function () {
            if (this.profileValue !== undefined) {
                return this.profileValue
            }
            return this.item.profile || []
        }
    },
    methods: {
        submit: function () {
            this.$store.dispatch('cupTasting', {
                id: this.item.id,
                propertyRatings: {
                    aroma: this.aroma,
                    acidity: this.acidity,
                    sweetness: this.sweetness,
                    body: this.body,
                    finish: this.finish
                },
                profile: this.profile,
                rating: this.rating
            })
            this.$router.replace({
                name: 'Home'
            })
        },
        back: function () {
            if (window.history.length === 0) {
                return this.$router.push({ name: 'Home' })
            }
            this.$router.go(-1)
        }
    }
}
</script>
