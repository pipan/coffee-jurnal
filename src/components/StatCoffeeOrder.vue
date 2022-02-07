<template>
    <select @change="setValue($event.target.value)">
        <option v-for="option in orderOptions"
            :key="option.value"
            :value="option.value"
            :selected="option.value === orderBy">{{ option.label }}</option>
    </select>
</template>

<script>
export default {
    name: 'StatCoffeeOrder',
    props: {
        value: [String]
    },
    data: function () {
        return {
            orderOptions: [
                {
                    value: 'coffeePlace',
                    label: 'By Place'
                }, {
                    value: 'coffeeOrigin',
                    label: 'By Origin'
                }, {
                    value: 'coffeeRoaster',
                    label: 'By Roaster'
                }
            ]
        }
    },
    computed: {
        orderBy: function () {
            return this.value || this.orderOptions[0].value
        }
    },
    methods: {
        setValue: function (value) {
            if (value === this.value) {
                return
            }
            this.$emit('change', value)
        }
    }
}
</script>