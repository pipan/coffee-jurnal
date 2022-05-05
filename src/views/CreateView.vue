<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>New Cup</h1>
                    <router-link :to="{ name: 'Import' }" class="action btn btn--primary">IMPORT</router-link>
                </header>
                <CoffeeBags :bags="bags"
                    @create="createBag"
                    @select="selectBag"
                    @remove="removeBags"></CoffeeBags>
                <CoffeeDetailForm @submit="submit($event)" ref="form"></CoffeeDetailForm>
            </div>
        </div>
    </div>
</template>

<script>
import CoffeeDetailForm from "../components/CoffeeDetailForm.vue"
import CoffeeBags from "../components/CoffeeBags.vue"

export default {
    name: 'CreateView',
    components: { CoffeeDetailForm, CoffeeBags },
    title: function () {
        return "New Cup | CJ"
    },
    computed: {
        bags: function () {
            return this.$store.state.bags
        }
    },
    methods: {
        submit: function (data) {
            this.$store.dispatch('createNewCup', data)
                .then((item) => {
                    this.$router.replace({
                        name: 'Taste',
                        params: {
                            id: item.id
                        }  
                    })
            })
        },
        createBag: function () {
            this.$store.dispatch('createBag', this.$refs.form.getValue())
        },
        selectBag: function (bag) {
            this.$refs.form.patch(bag)
        },
        removeBags: function (bags) {
            this.$store.dispatch('removeBags', bags)
        }
    }
}
</script>
