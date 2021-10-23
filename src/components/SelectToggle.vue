<template>
    <div class="row gap-s">
        <button type="button" class="tag"
            :class="{'tag--active': activated[option] }"
            v-for="option of options"
            :key="option"
            @click="toggle(option)">{{ option }}</button>
    </div>
</template>

<script>
export default {
    name: 'SelectToggle',
    components: {  },
    props: {
        options: [Array],
        value: [Array],
    },
    computed: {
        activated: function () {
            let result = {}
            for (const item of this.options) {
                result[item] = this.value.indexOf(item) > -1
            }
            return result
        }
    },
    methods: {
        toggle: function (option) {
            const index = this.value.indexOf(option)
            const newValue = [...this.value]
            if (index > -1) {
                newValue.splice(index, 1)
            } else {
                newValue.push(option)
            }
            return this.$emit('change', newValue)
        }
    }
}
</script>