<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="view-content">
                <header>
                    <h1>New Cup</h1>
                    <router-link :to="{ name: 'Import' }" class="action btn btn--primary">IMPORT</router-link>
                </header>
                <CoffeeDetailForm @submit="submit($event)"></CoffeeDetailForm>
            </div>
        </div>
    </div>
</template>

<script>
import CoffeeDetailForm from "../components/CoffeeDetailForm.vue"

export default {
    name: 'CreateView',
    components: { CoffeeDetailForm },
    metaInfo: function () {
        return {
            title: "New Cup | CJ"
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
        }
    }
}
</script>
