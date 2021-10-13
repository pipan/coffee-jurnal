<template>
    <div>
        <NotFound v-if="!item"></NotFound>
        <div class="column flex-grow" v-if="item">
            <header>
                <h1>Update Coffee Cup</h1>
            </header>
            <CoffeeDetailForm :item="item" @submit="submit($event)"></CoffeeDetailForm>
        </div>
    </div>
</template>

<script>
import CoffeeDetailForm from "../components/CoffeeDetailForm.vue"
import NotFound from './NotFound.vue'

export default {
    name: 'Edit',
    components: { CoffeeDetailForm, NotFound },
    metaInfo: function () {
        return {
            title: "Update Coffee Cup | CJ"
        }
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
