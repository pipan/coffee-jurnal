<template>
    <div class="column flex-grow">
        <div class="view">
            <div class="column gap-m w-100">
                <div class="detail">
                    <CoffeeDetail class="p-s"
                        :coffee="coffeeValue"
                        :enableEdit="false"
                        @select="selectCard($event)"></CoffeeDetail>
                </div>
                <div class="row flex row--middle w-100">
                    <div class="column gap-m w-100">
                        <CoffeeDetailForm :item="coffeeValue" @change="innerCoffee = $event" @changeSaveBag="saveBagFlag = $event" ref="form"></CoffeeDetailForm>    
                    </div>
                </div>
                <div class="row row--center pb-m gap-m row--evenly">
                    <div class="btn-thumb" @click="back()">
                        <i class="iconfont iconfont-cross text-l"></i>
                    </div>
                    <div class="btn-thumb btn-thumb--primary" @click="submit()">
                        <i class="iconfont iconfont-icon-check text-l"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CoffeeDetailForm from "../components/CoffeeDetailForm.vue"
import CoffeeDetail from "../components/CoffeeDetail.vue"

export default {
    name: 'CoffeeUpsert',
    components: { CoffeeDetailForm, CoffeeDetail },
    props: {
        coffee: {
            type: Object,
            default: () => { return {} }
        }
    },
    data: function () {
        return {
            innerCoffee: {},
            saveBagFlag: false
        }
    },
    computed: {
        coffeeValue: function () {
            return Object.assign({}, this.coffee, this.innerCoffee)
        }
    },
    methods: {
        submit: function () {
            if (this.saveBagFlag) {
                let bag = Object.assign({}, this.coffeeValue)
                delete bag.coffeePlace
                this.$store.dispatch('createBag', bag)
            }
            this.$emit('submit', this.coffeeValue)
        },
        back: function () {
            if (window.history.length <= 1) {
                return this.$router.push({ name: 'Home' })
            }
            this.$router.go(-1)
        },
        selectCard: function (key) {
            if (!this.$refs.form) {
                return
            }
            this.$refs.form.selectCard(key)
        }
    }
}
</script>

<style scoped>
.detail {
    min-height: 150px;
    width: 100%;
}
</style>
