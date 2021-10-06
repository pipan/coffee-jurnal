<template>
    <div>
        <h1>Tasting</h1>
        <form class="column flex-grow" @submit.prevent="submit()">
            <div class="form flex-grow">
                <RatingInput :value="rating" @change="rating = $event"></RatingInput>
                <PropertyRatingInput label="Aroma"
                    :value="aroma"
                    @change="aroma = $event"></PropertyRatingInput>
                <PropertyRatingInput label="Acidity"
                    :value="acidity"
                    @change="acidity = $event"></PropertyRatingInput>
                <PropertyRatingInput label="Sweetness"
                    :value="sweetness"
                    @change="sweetness = $event"></PropertyRatingInput>
                <PropertyRatingInput label="Body"
                    :value="body"
                    @change="body = $event"></PropertyRatingInput>
                <PropertyRatingInput label="Finish"
                    :value="finish"
                    @change="finish = $event"></PropertyRatingInput>
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
            aroma: {
                quality: 0.5,
                intensity: 0.5
            },
            acidity: {
                quality: 0.5,
                intensity: 0.5
            },
            sweetness: {
                quality: 0.5,
                intensity: 0.5
            },
            body: {
                quality: 0.5,
                intensity: 0.5
            },
            finish: {
                quality: 0.5,
                intensity: 0.5
            },
            rating: 1
        }
    },
    computed: {
        coffeeTypes: function() {
        return this.$store.state.coffeeTypes
        },
        coffeePlaceOptions: function() {
        return this.$store.getters.coffeePlaceOptions
        },
        coffeeOriginOptions: function() {
        return this.$store.getters.coffeeOriginOptions
        },
        coffeeRosterOptions: function() {
        return this.$store.getters.coffeeRosterOptions
        }
    },
    created: function () {
        this.setCoffeeType(this.coffeeTypes[0])
    },
    methods: {
        setCoffeeType: function (type) {
            this.coffeeType = type
        },
        submit: function () {
            this.$store.dispatch('createNewCup', {
                coffeePlace: this.coffeePlace,
                coffeeOrigin: this.coffeeOrigin,
                coffeeRoster: this.coffeeRoster,
                coffeeType: this.coffeeType.id
            })
            this.$router.push({
                name: 'Home'
            })
        }
    }
}
</script>
