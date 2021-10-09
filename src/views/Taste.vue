<template>
    <div>
        <header>
            <h1>Tasting</h1>
            <router-link :to="{ name: 'Edit', params: { id: item.id } }" class="action">DETAIL</router-link>
        </header>
        <form class="column flex-grow" @submit.prevent="submit()">
            <div class="form flex-grow">
                <RatingInput :value="rating" @change="ratingValue = $event"></RatingInput>
                <label class="input">
                    <div class="input__label">Note</div>
                    <textarea></textarea>
                </label>
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
            </div>
            <div class="pt-m row row--center gap-m">
                <router-link :to="{ name: 'Home' }" class="btn btn--secondary">Cancel</router-link>
                <button type="submit" class="btn btn--primary">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import PropertyRatingInput from '../components/PropertyRatingInput.vue'
import RatingInput from '../components/RatingInput.vue'

export default {
    name: 'Taste',
    components: { PropertyRatingInput, RatingInput },
    data: function () {
        return {
            aromaValue: {},
            acidityValue: {},
            sweetnessValue: {},
            bodyValue: {},
            finishValue: {},
            ratingValue: -1
        }
    },
    computed: {
        item: function () {
            return this.$store.getters.item(this.$route.params.id)
        },
        aroma: function () {
            return Object.assign({}, this.item.propertyRatings.aroma, this.aromaValue)
        },
        acidity: function () {
            return Object.assign({}, this.item.propertyRatings.acidity, this.acidityValue)
        },
        sweetness: function () {
            return Object.assign({}, this.item.propertyRatings.sweetness, this.sweetnessValue)
        },
        body: function () {
            return Object.assign({}, this.item.propertyRatings.body, this.bodyValue)
        },
        finish: function () {
            return Object.assign({}, this.item.propertyRatings.finish, this.finishValue)
        },
        rating: function () {
            if (this.ratingValue > -1) {
                return this.ratingValue
            }
            return this.item.rating
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
                rating: this.rating
            })
            this.$router.push({
                name: 'Home'
            })
        }
    }
}
</script>
