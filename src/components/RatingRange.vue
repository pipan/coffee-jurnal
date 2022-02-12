<template>
    <InlineInput label="Rating">
        <RatingStars :active="value" @select="select($event)"></RatingStars>
    </InlineInput>
</template>

<script>
import RatingStars from './RatingStars.vue'
import InlineInput from './InlineInput.vue'

export default {
    name: 'RatingRange',
    components: { RatingStars, InlineInput },
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        select: function (value) {
            let newValue = [...this.value]
            const index = this.value.indexOf(value)
            if (index > -1) {
                newValue.splice(index, 1)
            } else {
                newValue.push(value)
            }
            this.$emit('change', newValue)
        },
    }
}
</script>