<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <NotFound v-if="!item"></NotFound>
                <template v-if="item">
                    <header>
                        <h1>Update Coffee Cup</h1>
                    </header>
                    <CoffeeDetailForm :item="item" @submit="submit($event)"></CoffeeDetailForm>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import CoffeeDetailForm from "../components/CoffeeDetailForm.vue"
import NotFound from './NotFound.vue'

export default {
    name: 'EditView',
    components: { CoffeeDetailForm, NotFound },
    title: function () {
        return "Update Coffee Cup | CJ"
    },
    computed: {
        item: function() {
            return this.$store.getters.item(this.$route.params.id)
        }
    },
    methods: {
        submit: function (data) {
            data.id = this.item.id
            this.$store.dispatch('updateCup', data)
                .then(() => {
                    this.$router.push({ name: 'Home' })
            })
        }
    },
}
</script>
