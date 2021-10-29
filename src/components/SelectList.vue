<template>
    <div>
        <div class="input__label">{{ label }}</div>
        <div class="row gap-s py-s scroll-x">
            <button type="button" class="tag" :class="{'tag--active': option.active}"
                v-for="(option, index) of contextOptions"
                :key="index"
                @click="select(option.name)">{{ option.name }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectList',
    components: {  },
    props: {
        options: [Array],
        value: [Array],
        label: [String]
    },
    computed: {
        contextOptions: function () {
            const result = []
            for (const option of this.options) {
                result.push({
                    name: option,
                    active: this.value.indexOf(option) > -1
                })
            }
            return result
        }
    },
    methods: {
        select: function (option) {
            const index = this.value.indexOf(option)
            const newValue = [...this.value]
            if (index > -1) {
                newValue.splice(index, 1)
            } else {
                newValue.push(option)
            }
            return this.$emit('change', newValue)
        },
        toggleContext: function () {
            this.$refs.contextMenu.toggle()
        }
    }
}
</script>